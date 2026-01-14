import { ModelRenderer, parseMDL, parseMDX, generateMDL, generateMDX } from 'war3-model';
import type { Model } from 'war3-model';
import { mat4, vec3, quat } from 'gl-matrix';
import { loadTextureIntoRenderer, resolveTextureAbs, type FileIndex } from './textureLoader';


function fallbackMipmaps(): any[] {
  const data = new Uint8ClampedArray([0, 0, 0, 0]);
  // @ts-ignore
  return [typeof ImageData !== 'undefined' ? new ImageData(data, 1, 1) : { width: 1, height: 1, data, colorSpace: 'srgb' }];
}

function isMDXBytes(bytes: Uint8Array): boolean {
  return bytes.length >= 4 &&
    bytes[0] === 0x4d &&
    bytes[1] === 0x44 &&
    bytes[2] === 0x4c &&
    bytes[3] === 0x58;
}

function normalizeExportRel(p: string): string {
  const s = (p || '').trim().replace(/^mpq:auto:/i, '').replace(/\\/g, '/');
  return s.replace(/^\/+/, '');
}

function baseName(p: string): string {
  const n = (p || '').replace(/\\/g, '/');
  const parts = n.split('/');
  return parts[parts.length - 1] || n;
}

type FolderData = {
  root: string;
  files: { abs: string; rel: string; ext: string; base: string }[];
  models: string[];
};

export type ViewerSettings = {
  tileSize: number;
  limit: number;
  page: number;
  filter: string;
  animate: boolean;
  rotate: boolean;
  particles: boolean;
  ribbons: boolean;
};

type GPUShared = {
  device: GPUDevice;
  format: GPUTextureFormat;
  hasGPUBC: boolean;
};

const pMatrix: mat4 = mat4.create();
const mvMatrix: mat4 = mat4.create();
const cameraTarget: vec3 = vec3.create();
const cameraUp: vec3 = vec3.fromValues(0, 0, 1);
const cameraPos: vec3 = vec3.create();
const cameraPosTemp: vec3 = vec3.create();

const cameraPosProjected: vec3 = vec3.create();
const verticalQuat: quat = quat.create();
const fromCameraBaseVec: vec3 = vec3.fromValues(1, 0, 0);
function calcCameraQuat(camPos: vec3, camTarget: vec3): quat {
  vec3.set(cameraPosProjected, camPos[0], camPos[1], 0);
  vec3.subtract(cameraPosTemp, camPos, camTarget);
  vec3.normalize(cameraPosProjected, cameraPosProjected);
  vec3.normalize(cameraPosTemp, cameraPosTemp);

  const camQuat = quat.create();
  quat.rotationTo(camQuat, fromCameraBaseVec, cameraPosProjected);
  quat.rotationTo(verticalQuat, cameraPosProjected, cameraPosTemp);
  quat.mul(camQuat, verticalQuat, camQuat);
  return camQuat;
}

async function initWebGPU(): Promise<GPUShared> {
  if (!navigator.gpu) {
    throw new Error('WebGPU not available. Update Electron/Chrome or enable WebGPU.');
  }
  const adapter = await navigator.gpu.requestAdapter({ powerPreference: 'high-performance' });
  if (!adapter) throw new Error('Failed to request WebGPU adapter');
  const hasGPUBC = adapter.features.has('texture-compression-bc');
  const device = await adapter.requestDevice({
    requiredFeatures: (hasGPUBC ? ['texture-compression-bc'] : []) as GPUFeatureName[],
  });
  const format = navigator.gpu.getPreferredCanvasFormat();
  return { device, format, hasGPUBC };
}

class ModelTile {
  public readonly el: HTMLDivElement;
  public readonly canvas: HTMLCanvasElement;
  public readonly labelEl: HTMLSpanElement;
  public readonly badgeEl: HTMLSpanElement;
  public visible = false;
  public loaded = false;
  public loading = false;

  private renderer: ModelRenderer | null = null;
  private model: Model | null = null;
  private lastTime = 0;
  private theta = 0;
  private cameraDistance = 600;
  private center = vec3.create();

  constructor(
    public readonly modelAbs: string,
    private readonly idx: FileIndex,
    private readonly gpu: GPUShared,
    private readonly readFile: (p: string) => Promise<Uint8Array>,
    private readonly getSettings: () => ViewerSettings,
  ) {
    this.el = document.createElement('div');
    this.el.className = 'tile';

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'canvas';
    this.el.appendChild(this.canvas);

    const hint = document.createElement('div');
    hint.className = 'hint';
    hint.textContent = 'Loading...';
    this.el.appendChild(hint);

    const footer = document.createElement('div');
    footer.className = 'meta';
    this.labelEl = document.createElement('span');
    this.labelEl.className = 'name';
    this.labelEl.textContent = modelAbs.split(/[\\/]/).pop() || modelAbs;
    this.badgeEl = document.createElement('span');
    this.badgeEl.className = 'badge';
    this.badgeEl.textContent = '…';
    footer.appendChild(this.labelEl);
    footer.appendChild(this.badgeEl);
    this.el.appendChild(footer);
  }

  setSize(cssPx: number) {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.style.width = `${cssPx}px`;
    this.canvas.style.height = `${cssPx}px`;
    this.canvas.width = Math.max(1, Math.floor(cssPx * dpr));
    this.canvas.height = Math.max(1, Math.floor(cssPx * dpr));
  }

  async load(): Promise<void> {
    if (this.loaded || this.loading) return;
    this.loading = true;
    try {
      const bytes = await this.readFile(this.modelAbs);
      const lower = this.modelAbs.toLowerCase();
      let model: Model;
      const array = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
      if (lower.endsWith('.mdx') || isMDXBytes(bytes)) {
        model = parseMDX(array);
      } else {
        const text = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
        model = parseMDL(text);
      }
      this.model = model;
      this.badgeEl.textContent = model.Version >= 1100 ? 'HD' : 'SD';

      this.computeCamera(model);

      const ctx = this.canvas.getContext('webgpu') as unknown as GPUCanvasContext | null;
      if (!ctx) throw new Error('Failed to create WebGPU context');
      ctx.configure({
        device: this.gpu.device,
        format: this.gpu.format,
        alphaMode: 'premultiplied',
      });

      const renderer = new ModelRenderer(model);
      renderer.setEffectsEnabled({ particles: true, ribbons: true });
      renderer.setTeamColor(vec3.fromValues(1, 0, 0));
      if (model.Sequences?.length) {
        renderer.setSequence(0);
      }

      await renderer.initGPUDevice(this.canvas, this.gpu.device, ctx);

      // Force black background (best-effort).
      try {
        const r: any = renderer as any;
        if (r?.gpuRenderPassDescriptor?.colorAttachments?.[0]) {
          r.gpuRenderPassDescriptor.colorAttachments[0].clearValue = [0, 0, 0, 1];
        }
      } catch {}

      // Load textures (best-effort, missing textures will use internal empty texture).
      await this.loadTextures(model, renderer);

      // Mark loaded & remove hint.
      const hint = this.el.querySelector('.hint');
      if (hint) hint.remove();
      this.renderer = renderer;
      this.loaded = true;
    } catch (e: any) {
      const hint = this.el.querySelector('.hint') as HTMLElement | null;
      if (hint) {
        hint.textContent = `Error: ${e?.message || e}`;
      }
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  private computeCamera(model: Model) {
    const info = model.Info;
    if (info?.MinimumExtent && info?.MaximumExtent) {
      const min = info.MinimumExtent;
      const max = info.MaximumExtent;
      vec3.set(this.center, (min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2);
      const radius = info.BoundsRadius || Math.max(10, vec3.distance(vec3.fromValues(min[0], min[1], min[2]), vec3.fromValues(max[0], max[1], max[2])) / 2);
      this.cameraDistance = Math.max(120, radius * 2.6);
    } else {
      vec3.set(this.center, 0, 0, 0);
      this.cameraDistance = 600;
    }
  }

  private async loadTextures(model: Model, renderer: ModelRenderer) {
    const support = { hasGPUBC: this.gpu.hasGPUBC };
    const promises: Promise<void>[] = [];

    for (const tex of model.Textures || []) {
      if (!tex?.Image) continue;
      const abs = resolveTextureAbs(tex.Image, this.modelAbs, this.idx);
      if (!abs) {
        console.warn('[tex-missing]', tex.Image, 'model', this.modelAbs);
        try { renderer.setTextureImageData(tex.Image, fallbackMipmaps()); } catch {}
        continue;
      }
      promises.push((async () => {
        try {
          const data = await this.readFile(abs);
          await loadTextureIntoRenderer(renderer, tex.Image, abs, data, support);
        } catch (err) {
          console.warn('[tex-read-fail]', tex.Image, 'abs', abs, err);
          // Avoid cascading failures: bind a 1x1 transparent texture as fallback.
          try { renderer.setTextureImageData(tex.Image, fallbackMipmaps()); } catch {}
        }
      })());
    }

    await Promise.all(promises);
  }

  tick(now: number) {
    if (!this.visible || !this.loaded || !this.renderer || !this.model) return;

    const s = this.getSettings();
    this.renderer.setEffectsEnabled({ particles: true, ribbons: true });


    // Throttle thumbnails to ~15 FPS to keep batch views responsive.
    if (this.lastTime && now - this.lastTime < 66) return;
    const dt = this.lastTime ? (now - this.lastTime) : 16;
    this.lastTime = now;

    if (s.rotate) {
      this.theta += dt * 0.0007;
    }

    const aspect = this.canvas.width / this.canvas.height;
    mat4.perspective(pMatrix, Math.PI / 4, aspect, 0.1, 50000);

    const dist = this.cameraDistance;
    const z = this.center[2];
    vec3.set(
      cameraPos,
      this.center[0] + Math.cos(this.theta) * dist,
      this.center[1] + Math.sin(this.theta) * dist,
      z + dist * 0.35
    );
    vec3.copy(cameraTarget, this.center);

    mat4.lookAt(mvMatrix, cameraPos, cameraTarget, cameraUp);

    const camQuat = calcCameraQuat(cameraPos, cameraTarget);
    this.renderer.setCamera(cameraPos, camQuat);

    // Simple fixed light
    const lightPos = vec3.fromValues(cameraPos[0] + dist * 0.5, cameraPos[1] - dist * 0.3, cameraPos[2] + dist * 0.8);
    this.renderer.setLightPosition(lightPos);
    this.renderer.setLightColor(vec3.fromValues(1.0, 1.0, 1.0));

    if (s.animate && this.model.Sequences?.length) {
      this.renderer.update(dt);
    }

    this.renderer.render(mvMatrix, pMatrix, {
      wireframe: false,
      env: false,
      useEnvironmentMap: false,
      levelOfDetail: 0
    });
  }
}

// --- Single model overlay viewer (desktop only) ---
class SingleModelViewer {
  private overlay: HTMLDivElement;
  private canvas: HTMLCanvasElement;
  private titleEl: HTMLDivElement;
  private selAnim: HTMLSelectElement;
  private selTeam: HTMLSelectElement;
  private rngSpeed: HTMLInputElement;
  private rngBg: HTMLInputElement;
  private txtSpeed: HTMLSpanElement;
  private txtBg: HTMLSpanElement;
  private inpOutDir: HTMLInputElement;
  private btnPickOut: HTMLButtonElement;
  private inpExportName: HTMLInputElement;
  private btnRename: HTMLButtonElement;
  private chkRenameTextures: HTMLInputElement;
  private btnBack: HTMLButtonElement;
  private btnExport: HTMLButtonElement;
  private btnShot: HTMLButtonElement;

  private outDir: string | null = null;

  private renderer: ModelRenderer | null = null;
  private model: Model | null = null;
  private modelAbs: string | null = null;
  private idx: FileIndex | null = null;
  private gpu: GPUShared | null = null;
  private raf = 0;
  private lastTime = 0;

  // camera
  private center = vec3.create();
  private theta = 0;
  private phi = 0.45;
  private distance = 600;
  private dragging = false;
  private lastX = 0;
  private lastY = 0;

  // team palette (War3-style)
  private readonly teamColors: vec3[] = [
    vec3.fromValues(1, 0, 0),           // 0 red
    vec3.fromValues(0, 0, 1),           // 1 blue
    vec3.fromValues(0, 1, 1),           // 2 teal
    vec3.fromValues(0.5, 0, 0.5),       // 3 purple
    vec3.fromValues(1, 1, 0),           // 4 yellow
    vec3.fromValues(1, 0.5, 0),         // 5 orange
    vec3.fromValues(0, 0.6, 0),         // 6 green
    vec3.fromValues(1, 0.6, 0.8),       // 7 pink
    vec3.fromValues(0.65, 0.65, 0.65),  // 8 gray
    vec3.fromValues(0.3, 0.7, 1.0),     // 9 light blue
    vec3.fromValues(0.0, 0.35, 0.0),    // 10 dark green
    vec3.fromValues(0.4, 0.2, 0.0),     // 11 brown
  ];

  constructor(
    private readonly readFile: (p: string) => Promise<Uint8Array>,
  ) {
    // build DOM
    this.overlay = document.createElement('div');
    this.overlay.className = 'single-overlay';
    this.overlay.innerHTML = `
      <div class="single-shell">
        <div class="single-left">
          <div class="single-canvas-wrap">
            <canvas class="single-canvas" width="960" height="720"></canvas>
            <div class="single-hint">拖动：旋转  |  滚轮：缩放  |  ESC：关闭</div>
          </div>
        </div>
        <div class="single-right">
          <div class="single-top">
            <div class="single-title"></div>
            <button class="btn btn-ghost" id="singleBack">关闭(Esc)</button>
          </div>

          <div class="single-group">
            <div class="single-group-title">控制台</div>

            <div class="single-field">
              <label>模型动作</label>
              <select class="field-select" id="singleAnim"></select>
            </div>

            <div class="single-field">
              <label>队伍颜色</label>
              <select class="field-select" id="singleTeam"></select>
            </div>

            <div class="single-field">
              <div class="single-label-row">
                <label>播放速度</label>
                <span class="single-val" id="singleSpeedVal">1.00x</span>
              </div>
              <input id="singleSpeed" type="range" min="0" max="2" step="0.01" value="1" />
            </div>

            <div class="single-field">
              <div class="single-label-row">
                <label>背景透明度</label>
                <span class="single-val" id="singleBgVal">1.00</span>
              </div>
              <input id="singleBg" type="range" min="0" max="1" step="0.01" value="1" />
            </div>
          </div>

          <div class="single-group">
            <div class="single-group-title">操作</div>

            <div class="single-field">
              <label>导出目录</label>
              <div class="single-row">
                <input class="field-input" id="singleOutDir" placeholder="未选择" readonly />
                <button class="btn" id="singlePickOut">选择...</button>
              </div>
            </div>

            <div class="single-field">
              <label>导出文件名</label>
              <div class="single-row">
                <input class="field-input" id="singleExportName" placeholder="model" />
                <button class="btn" id="singleRename">重命名</button>
              </div>
              <label class="single-check"><input id="singleRenameTextures" type="checkbox" /> 重命名贴图 (tex0/tex1...)</label>
            </div>

            <button class="btn" id="singleExport">导出模型与贴图</button>
            <button class="btn btn-ghost" id="singleShot">导出当前截图（PNG）</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(this.overlay);

    this.canvas = this.overlay.querySelector('canvas.single-canvas') as HTMLCanvasElement;
    this.titleEl = this.overlay.querySelector('.single-title') as HTMLDivElement;
    this.selAnim = this.overlay.querySelector('#singleAnim') as HTMLSelectElement;
    this.selTeam = this.overlay.querySelector('#singleTeam') as HTMLSelectElement;
    this.rngSpeed = this.overlay.querySelector('#singleSpeed') as HTMLInputElement;
    this.rngBg = this.overlay.querySelector('#singleBg') as HTMLInputElement;
    this.txtSpeed = this.overlay.querySelector('#singleSpeedVal') as HTMLSpanElement;
    this.txtBg = this.overlay.querySelector('#singleBgVal') as HTMLSpanElement;
    this.inpOutDir = this.overlay.querySelector('#singleOutDir') as HTMLInputElement;
    this.btnPickOut = this.overlay.querySelector('#singlePickOut') as HTMLButtonElement;
    this.inpExportName = this.overlay.querySelector('#singleExportName') as HTMLInputElement;
    this.btnRename = this.overlay.querySelector('#singleRename') as HTMLButtonElement;
    this.chkRenameTextures = this.overlay.querySelector('#singleRenameTextures') as HTMLInputElement;
    this.btnBack = this.overlay.querySelector('#singleBack') as HTMLButtonElement;
    this.btnExport = this.overlay.querySelector('#singleExport') as HTMLButtonElement;
    this.btnShot = this.overlay.querySelector('#singleShot') as HTMLButtonElement;

    // events
    this.btnBack.addEventListener('click', () => this.close());
    window.addEventListener('keydown', (e) => {
      if (this.overlay.style.display !== 'none' && e.key === 'Escape') this.close();
    });

    // mouse orbit
    this.canvas.addEventListener('pointerdown', (e) => {
      this.dragging = true;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    });
    this.canvas.addEventListener('pointermove', (e) => {
      if (!this.dragging) return;
      const dx = e.clientX - this.lastX;
      const dy = e.clientY - this.lastY;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      this.theta += dx * 0.01;
      this.phi = Math.max(-1.2, Math.min(1.2, this.phi + dy * 0.01));
    });
    this.canvas.addEventListener('pointerup', () => { this.dragging = false; });
    this.canvas.addEventListener('pointercancel', () => { this.dragging = false; });
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const k = Math.exp(e.deltaY * 0.001);
      this.distance = Math.max(10, Math.min(50000, this.distance * k));
    }, { passive: false });

    this.selAnim.addEventListener('change', () => {
      if (!this.renderer) return;
      const idx = parseInt(this.selAnim.value, 10) || 0;
      this.renderer.setSequence(idx);
      this.renderer.setFrame(this.renderer.getFrame());
    });

    this.selTeam.addEventListener('change', () => {
      if (!this.renderer) return;
      const idx = Math.max(0, Math.min(11, parseInt(this.selTeam.value, 10) || 0));
      this.renderer.setTeamColor(this.teamColors[idx]);
    });

    const updateSpeedLabel = () => {
      const v = parseFloat(this.rngSpeed.value);
      this.txtSpeed.textContent = `${v.toFixed(2)}x`;
    };
    updateSpeedLabel();
    this.rngSpeed.addEventListener('input', updateSpeedLabel);

    this.rngBg.addEventListener('input', () => {
      const a = parseFloat(this.rngBg.value);
      this.txtBg.textContent = a.toFixed(2);
      // best-effort: tweak internal clearValue alpha
      const r: any = this.renderer as any;
      try {
        if (r?.gpuRenderPassDescriptor?.colorAttachments?.[0]) {
          r.gpuRenderPassDescriptor.colorAttachments[0].clearValue = [0, 0, 0, a];
        }
      } catch {}
    });

    this.btnPickOut.addEventListener('click', async () => {
      if (!window.war3Desktop) return;
      const out = await window.war3Desktop.selectExportFolder();
      if (!out) return;
      this.outDir = out;
      this.inpOutDir.value = out;
    });

    this.btnRename.addEventListener('click', () => {
      this.inpExportName.value = (this.inpExportName.value || '').trim();
    });

    this.btnExport.addEventListener('click', async () => {
      if (!window.war3Desktop || !this.model || !this.idx || !this.modelAbs) return;
      const out = this.outDir || await window.war3Desktop.selectExportFolder();
      if (!out) return;
      this.outDir = out;
      this.inpOutDir.value = out;

      const exportName = (this.inpExportName.value || '').trim() || (this.modelAbs.split(/[\\/]/).pop() || 'model').replace(/\.[^.]+$/, '');
      const renameTextures = Boolean(this.chkRenameTextures.checked);

      const bytes = await this.readFile(this.modelAbs);
      const isMDX = this.modelAbs.toLowerCase().endsWith('.mdx') || isMDXBytes(bytes);

      const modelCopy: any = { ...this.model, Textures: (this.model.Textures || []).map(t => ({ ...t })) };
      const textureExports: { abs: string; rel: string; texIndex: number }[] = [];

      for (let i = 0; i < (this.model.Textures || []).length; i++) {
        const tex = this.model.Textures[i];
        if (!tex?.Image) continue;
        const abs = resolveTextureAbs(tex.Image, this.modelAbs, this.idx);
        if (!abs) continue;

        let rel: string;
        if (renameTextures) {
          const srcBase = baseName(abs);
          const dot = srcBase.lastIndexOf('.');
          const ext = dot >= 0 ? srcBase.slice(dot) : '.blp';
          rel = `tex/tex${i}${ext}`;
          modelCopy.Textures[i].Image = rel;
        } else {
          rel = normalizeExportRel(tex.Image);
          if (!rel) rel = baseName(tex.Image);
        }
        textureExports.push({ abs, rel, texIndex: i });
      }

      if (!renameTextures) {
        for (let i = 0; i < (modelCopy.Textures || []).length; i++) {
          const img = modelCopy.Textures[i]?.Image;
          if (typeof img === 'string') {
            modelCopy.Textures[i].Image = normalizeExportRel(img);
          }
        }
      }

      const modelExt = isMDX ? '.mdx' : '.mdl';
      const modelRel = `${exportName}${modelExt}`;
      if (isMDX) {
        const outBuf = generateMDX(modelCopy as Model);
        await window.war3Desktop.writeFile(`${out}/${modelRel}`, new Uint8Array(outBuf));
      } else {
        const outText = generateMDL(modelCopy as Model);
        await window.war3Desktop.writeFile(`${out}/${modelRel}`, new TextEncoder().encode(outText));
      }

      for (const te of textureExports) {
        try {
          const data = await this.readFile(te.abs);
          await window.war3Desktop.writeFile(`${out}/${te.rel}`, data);
        } catch {
        }
      }
    });

    this.btnShot.addEventListener('click', async () => {
      if (!window.war3Desktop) return;
      const out = await window.war3Desktop.selectExportFolder();
      if (!out) return;
      const blob = await new Promise<Blob | null>((resolve) => this.canvas.toBlob(resolve));
      if (!blob) return;
      const buf = new Uint8Array(await blob.arrayBuffer());
      const name = (this.modelAbs?.split(/[\\/]/).pop() || 'shot').replace(/\.(mdx|mdl)$/i, '');
      const file = `${out.replace(/\\/g, '/')}/${name}.png`;
      await window.war3Desktop.writeFile(file, buf);
    });

    this.overlay.style.display = 'none';
    this.populateTeamOptions();
  }

  private populateTeamOptions() {
    this.selTeam.innerHTML = '';
    for (let i = 0; i < this.teamColors.length; i++) {
      const opt = document.createElement('option');
      opt.value = String(i);
      opt.textContent = String(i);
      this.selTeam.appendChild(opt);
    }
    this.selTeam.value = '0';
  }

  private computeCamera(model: Model) {
    const info = model.Info;
    if (info?.MinimumExtent && info?.MaximumExtent) {
      const min = info.MinimumExtent;
      const max = info.MaximumExtent;
      vec3.set(this.center, (min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2);
      const radius = info.BoundsRadius || Math.max(10, vec3.distance(vec3.fromValues(min[0], min[1], min[2]), vec3.fromValues(max[0], max[1], max[2])) / 2);
      this.distance = Math.max(120, radius * 2.6);
    } else {
      vec3.set(this.center, 0, 0, 0);
      this.distance = 600;
    }
    this.theta = 0;
    this.phi = 0.45;
  }

  async open(modelAbs: string, idx: FileIndex, gpu: GPUShared) {
    this.close();
    this.modelAbs = modelAbs;
    this.idx = idx;
    this.gpu = gpu;
    this.overlay.style.display = 'block';
    this.titleEl.textContent = modelAbs;
    this.outDir = null;
    this.inpOutDir.value = '';

    try {
      const bytes = await this.readFile(modelAbs);
      const lower = modelAbs.toLowerCase();
      let model: Model;
      const array = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
      if (lower.endsWith('.mdx') || isMDXBytes(bytes)) {
        model = parseMDX(array);
      } else {
        const text = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
        model = parseMDL(text);
      }
      this.model = model;
      this.computeCamera(model);

      const base = modelAbs.split(/[\\/]/).pop() || modelAbs;
      this.inpExportName.value = base.replace(/\.[^.]+$/, '');

      // anim list
      this.selAnim.innerHTML = '';
      const seqs = model.Sequences || [];
      for (let i = 0; i < seqs.length; i++) {
        const opt = document.createElement('option');
        opt.value = String(i);
        opt.textContent = `[${i}] ${seqs[i].Name || 'Sequence'}`;
        this.selAnim.appendChild(opt);
      }
      if (!seqs.length) {
        const opt = document.createElement('option');
        opt.value = '0';
        opt.textContent = '(no sequences)';
        this.selAnim.appendChild(opt);
      }
      this.selAnim.value = '0';

      const dpr = window.devicePixelRatio || 1;
      // Fit canvas to viewport
      const maxW = Math.max(320, window.innerWidth - 360 - 48);
      const maxH = Math.max(240, window.innerHeight - 48);
      const size = Math.floor(Math.min(maxW, maxH));
      this.canvas.style.width = `${size}px`;
      this.canvas.style.height = `${size}px`;
      this.canvas.width = Math.max(1, Math.floor(size * dpr));
      this.canvas.height = Math.max(1, Math.floor(size * dpr));

      const ctx = this.canvas.getContext('webgpu') as unknown as GPUCanvasContext | null;
      if (!ctx) throw new Error('Failed to create WebGPU context');
      ctx.configure({ device: gpu.device, format: gpu.format, alphaMode: 'premultiplied' });

      const renderer = new ModelRenderer(model);
      renderer.setEffectsEnabled({ particles: true, ribbons: true });
      renderer.setTeamColor(this.teamColors[0]);
      if (seqs.length) renderer.setSequence(0);
      await renderer.initGPUDevice(this.canvas, gpu.device, ctx);

      // Force black background (best-effort).
      try {
        const r: any = renderer as any;
        if (r?.gpuRenderPassDescriptor?.colorAttachments?.[0]) {
          r.gpuRenderPassDescriptor.colorAttachments[0].clearValue = [0, 0, 0, 1];
        }
      } catch {}
      await this.loadTextures(model, renderer, idx);
      this.renderer = renderer;

      // apply initial bg alpha
      this.rngBg.dispatchEvent(new Event('input'));

      this.lastTime = 0;
      this.raf = requestAnimationFrame((t) => this.tick(t));
    } catch (e) {
      console.error(e);
      this.titleEl.textContent = `加载失败: ${(e as any)?.message || e}`;
    }
  }

  private async loadTextures(model: Model, renderer: ModelRenderer, idx: FileIndex) {
    const support = { hasGPUBC: (this.gpu?.hasGPUBC ?? false) };
    const promises: Promise<void>[] = [];
    for (const tex of model.Textures || []) {
      if (!tex?.Image) continue;
      const abs = resolveTextureAbs(tex.Image, this.modelAbs!, idx);
        if (!abs) {
          console.warn('[tex-missing]', tex.Image, 'model', this.modelAbs);
          continue;
        }
      promises.push((async () => {
        try {
          const data = await this.readFile(abs);
          await loadTextureIntoRenderer(renderer, tex.Image, abs, data, support);
        } catch (err) {
          console.warn('[tex-read-fail]', tex.Image, 'abs', abs, err);
          // Avoid cascading failures: bind a 1x1 transparent texture as fallback.
          try { renderer.setTextureImageData(tex.Image, fallbackMipmaps()); } catch {}
        }
      })());
    }
    await Promise.all(promises);
  }

  private tick = (now: number) => {
    if (!this.renderer || !this.model) return;
    const dtMs = this.lastTime ? (now - this.lastTime) : 16;
    this.lastTime = now;
    const speed = parseFloat(this.rngSpeed.value);
    const dt = dtMs * speed;

    const aspect = this.canvas.width / this.canvas.height;
    mat4.perspective(pMatrix, Math.PI / 4, aspect, 0.1, 50000);

    // spherical camera
    const cx = this.center[0], cy = this.center[1], cz = this.center[2];
    const r = this.distance;
    const cosPhi = Math.cos(this.phi);
    vec3.set(
      cameraPos,
      cx + Math.cos(this.theta) * cosPhi * r,
      cy + Math.sin(this.theta) * cosPhi * r,
      cz + Math.sin(this.phi) * r
    );
    vec3.copy(cameraTarget, this.center);

    mat4.lookAt(mvMatrix, cameraPos, cameraTarget, cameraUp);
    const camQuat = calcCameraQuat(cameraPos, cameraTarget);
    this.renderer.setCamera(cameraPos, camQuat);

    const lightPos = vec3.fromValues(cameraPos[0] + r * 0.5, cameraPos[1] - r * 0.3, cameraPos[2] + r * 0.8);
    this.renderer.setLightPosition(lightPos);
    this.renderer.setLightColor(vec3.fromValues(1, 1, 1));

    if (this.model.Sequences?.length) {
      this.renderer.update(dt);
    }

    this.renderer.render(mvMatrix, pMatrix, {
      wireframe: false,
      env: false,
      useEnvironmentMap: false,
      levelOfDetail: 0
    });

    this.raf = requestAnimationFrame(this.tick);
  };

  close() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.lastTime = 0;
    if (this.renderer) {
      try { this.renderer.destroy(); } catch {}
    }
    this.renderer = null;
    this.model = null;
    this.modelAbs = null;
    this.idx = null;
    this.gpu = null;
    this.overlay.style.display = 'none';
  }
}

export class BatchViewer {
  private folder: FolderData | null = null;
  private idx: FileIndex | null = null;
  private gpu: GPUShared | null = null;

  private tiles: ModelTile[] = [];
  private tileMap = new Map<HTMLDivElement, ModelTile>();
  private observer: IntersectionObserver;
  private loadingQueue: ModelTile[] = [];
  private loadingCount = 0;
  private singleViewer: SingleModelViewer;

  private lastFiltered: string[] = [];
  private lastPageList: string[] = [];
  private lastPages = 1;
  private lastPage = 0;
  private lastPageSize = 1;

  constructor(
    private readonly grid: HTMLElement,
    private readonly statusEl: HTMLElement,
    private readonly readFile: (p: string) => Promise<Uint8Array>,
    private readonly getSettings: () => ViewerSettings,
  ) {
    this.singleViewer = new SingleModelViewer(this.readFile);

    // Single click a tile to open the single-model viewer.
    this.grid.addEventListener('click', (ev) => {
      const target = ev.target as HTMLElement | null;
      const tileEl = target?.closest?.('.tile') as HTMLDivElement | null;
      if (!tileEl) return;

      const tile = this.tileMap.get(tileEl);
      if (!tile) return;

      if (!this.idx || !this.gpu) return;
      this.singleViewer.open(tile.modelAbs, this.idx, this.gpu);
    });

    this.observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const tile = this.tileMap.get(e.target as HTMLDivElement);
        if (!tile) continue;
        tile.visible = e.isIntersecting;
        if (tile.visible) {
          this.enqueueLoad(tile);
        }
      }
    }, { root: null, threshold: 0.05 });

    requestAnimationFrame(this.loop);
  }

  private loop = (now: number) => {
    for (const tile of this.tiles) {
      tile.tick(now);
    }
    requestAnimationFrame(this.loop);
  };

  async setFolder(folder: FolderData) {
    this.folder = folder;

    if (!this.gpu) {
      this.status('初始化 WebGPU...');
      this.gpu = await initWebGPU();
    }

    this.idx = this.buildIndex(folder);
    this.renderTiles();
  }

  refresh() {
    if (!this.folder || !this.idx || !this.gpu) return;
    this.renderTiles();
  }

  public getRenderInfo(): { total: number; filtered: number; page: number; pages: number; pageSize: number } | null {
    if (!this.folder) return null;
    return {
      total: this.folder.models.length,
      filtered: this.lastFiltered.length,
      page: this.lastPage,
      pages: this.lastPages,
      pageSize: this.lastPageSize,
    };
  }

  public getCurrentPageModelRels(): string[] {
    return this.lastPageList.slice();
  }

  public getFilteredModelRels(): string[] {
    return this.lastFiltered.slice();
  }

  public resolveModelAbs(rel: string): string | null {
    if (!this.idx) return null;
    return this.idx.byRelLower.get(rel.replace(/\\/g, '/').toLowerCase()) || null;
  }

  public async exportModels(outRoot: string, modelRels: string[]): Promise<boolean> {
    try {
      if (!outRoot || !window.war3Desktop) return false;
      if (!this.idx || !this.folder) return false;

      const uniq = Array.from(new Set(modelRels));
      for (const rel of uniq) {
        const modelAbs = this.resolveModelAbs(rel);
        if (!modelAbs) continue;

        // Write model bytes as-is to out/<rel>
        const modelBytes = await this.readFile(modelAbs);
        const dstModel = `${outRoot.replace(/\\/g, '/')}/${rel.replace(/\\/g, '/')}`;
        await window.war3Desktop.writeFile(dstModel, modelBytes);

        // Parse model to enumerate referenced textures.
        const lower = modelAbs.toLowerCase();
        let model: Model;
        const array = modelBytes.buffer.slice(modelBytes.byteOffset, modelBytes.byteOffset + modelBytes.byteLength);
        if (lower.endsWith('.mdx') || isMDXBytes(modelBytes)) {
          model = parseMDX(array);
        } else {
          const text = new TextDecoder('utf-8', { fatal: false }).decode(modelBytes);
          model = parseMDL(text);
        }

        for (const tex of model.Textures || []) {
          if (!tex?.Image) continue;
          const abs = resolveTextureAbs(tex.Image, modelAbs, this.idx);
          if (!abs) continue;

          const texBytes = await this.readFile(abs);
          const relTex = normalizeExportRel(tex.Image) || baseName(tex.Image);
          const dstTex = `${outRoot.replace(/\\/g, '/')}/${relTex}`;
          await window.war3Desktop.writeFile(dstTex, texBytes);
        }
      }
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  private buildIndex(folder: FolderData): FileIndex {
    const byRelLower = new Map<string, string>();
    const byBaseLower = new Map<string, string>();
    for (const f of folder.files) {
      byRelLower.set(f.rel.replace(/\\/g, '/').toLowerCase(), f.abs);
      byBaseLower.set(f.base.toLowerCase(), f.abs);
    }
    return { root: folder.root, byRelLower, byBaseLower };
  }

  private status(text: string) {
    this.statusEl.textContent = text;
  }

  private renderTiles() {
    const s = this.getSettings();
    const folder = this.folder!;
    const idx = this.idx!;
    const gpu = this.gpu!;

    const filter = (s.filter || '').trim().toLowerCase();
    const allModels = folder.models.slice().sort();
    const filtered = filter
      ? allModels.filter(p => p.toLowerCase().includes(filter))
      : allModels;
    const pageSize = Math.max(1, s.limit);
    const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const page = Math.max(0, Math.min(pages - 1, s.page | 0));
    const start = page * pageSize;
    const end = start + pageSize;
    const list = filtered.slice(start, end);

    this.lastFiltered = filtered;
    this.lastPageList = list;
    this.lastPages = pages;
    this.lastPage = page;
    this.lastPageSize = pageSize;

    this.grid.style.setProperty('--tile', `${s.tileSize}px`);

    // Clean old
    this.grid.innerHTML = '';
    this.tiles = [];
    this.tileMap.clear();
    this.loadingQueue = [];
    this.loadingCount = 0;

    for (const modelRel of list) {
      // 从 idx 中获取绝对路径
      const modelAbs = idx.byRelLower.get(modelRel.toLowerCase());
      if (!modelAbs) continue;
      const tile = new ModelTile(modelAbs, idx, gpu, this.readFile, this.getSettings);
      tile.setSize(s.tileSize);
      this.tiles.push(tile);
      this.tileMap.set(tile.el, tile);
      this.grid.appendChild(tile.el);
      this.observer.observe(tile.el);
    }

    this.status(`模型: ${filtered.length}  | 页: ${page + 1}/${pages}  | 显示: ${list.length}`);
  }

  private enqueueLoad(tile: ModelTile) {
    if (tile.loaded || tile.loading) return;
    this.loadingQueue.push(tile);
    this.pumpQueue();
  }

  private pumpQueue() {
    while (this.loadingCount < 3 && this.loadingQueue.length) {
      const tile = this.loadingQueue.shift()!;
      if (tile.loaded || tile.loading) continue;
      this.loadingCount++;
      tile.load().finally(() => {
        this.loadingCount--;
        this.pumpQueue();
      });
    }
  }
}