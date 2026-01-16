import { ModelRenderer, parseMDL, parseMDX, generateMDL, generateMDX } from 'war3-model';
import type { Model } from 'war3-model';
import { mat4, vec3, quat } from 'gl-matrix';
import { loadTextureIntoRenderer, resolveTextureAbs, type FileIndex } from './textureLoader';


function fallbackMipmaps(): any[] {
  const data = new Uint8ClampedArray([0, 0, 0, 0]);
  // @ts-ignore
  return [typeof ImageData !== 'undefined' ? new ImageData(data, 1, 1) : { width: 1, height: 1, data, colorSpace: 'srgb' }];
}

const MODEL_CACHE_MAX_ITEMS = 300;
const modelCache = new Map<string, Model>();

function getCachedModel(modelAbs: string): Model | null {
  const v = modelCache.get(modelAbs) || null;
  if (!v) return null;
  modelCache.delete(modelAbs);
  modelCache.set(modelAbs, v);
  return v;
}

function setCachedModel(modelAbs: string, model: Model): void {
  modelCache.delete(modelAbs);
  modelCache.set(modelAbs, model);
  while (modelCache.size > MODEL_CACHE_MAX_ITEMS) {
    const oldestKey = modelCache.keys().next().value as string;
    modelCache.delete(oldestKey);
  }
}

function findSequenceIndexByName(model: Model | null, animName: string): number {
  if (!model?.Sequences?.length) return 0;
  const name = (animName || '').toLowerCase().trim();
  if (!name) return 0;
  const map: Record<string, (n: string) => boolean> = {
    stand: (n) => n.includes('stand') || n.includes('idle'),
    walk: (n) => n.includes('walk'),
    attack: (n) => n.includes('attack'),
    death: (n) => n.includes('death'),
    birth: (n) => n.includes('birth'),
  };
  const matcher = map[name];
  if (matcher) {
    const idx = model.Sequences.findIndex(seq => matcher((seq?.Name || '').toLowerCase()));
    if (idx >= 0) return idx;
  }
  return 0;
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

function displayModelName(p: string): string {
  const s = (p || '')
    .trim()
    .replace(/^mpq:auto:/i, '')
    .replace(/^mpq:/i, '')
    // Map MPQ source prefix (e.g. "1:foo.mdx")
    .replace(/^\d+:/, '')
    .replace(/\\/g, '/');
  return s.split('/').pop() || s || p;
}

function isHiddenModelRel(rel: string): boolean {
  return (rel || '').trim().toLowerCase().endsWith('.mdl');
}

function isVirtualMpqPath(abs: string): boolean {
  const p = String(abs || '');
  return p.startsWith('mpq:') || p.startsWith('mpq:auto:') || p.includes('mpq:');
}

function confirmDeleteFiles(absPaths: string[]): boolean {
  const uniq = Array.from(new Set((absPaths || []).filter(Boolean)));
  if (!uniq.length) return false;
  const lines = uniq.slice().sort();
  return window.confirm(`将删除以下文件：\n\n${lines.join('\n')}\n\n确定删除？`);
}

const WAR3_NATIVE_PREFIXES = [
  'textures/', 'replaceabletextures/', 'abilities/', 'buildings/',
  'doodads/', 'ui/', 'units/', 'environment/', 'splats/',
];

function isWar3NativePath(p: string): boolean {
  const lower = (p || '').replace(/\\/g, '/').toLowerCase();
  return WAR3_NATIVE_PREFIXES.some(prefix => lower.startsWith(prefix));
}

function normalizeRelForCopy(rel: string): string {
  return String(rel || '')
    .trim()
    .replace(/^\d+:/, '')
    .replace(/\\/g, '/')
    .replace(/^\/+/, '');
}

async function copyText(text: string): Promise<boolean> {
  try {
    const t = String(text ?? '');
    // Prefer modern API
    // @ts-ignore
    if (navigator?.clipboard?.writeText) {
      // @ts-ignore
      await navigator.clipboard.writeText(t);
      return true;
    }
  } catch {}

  try {
    const ta = document.createElement('textarea');
    ta.value = String(text ?? '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    ta.style.top = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

function uniqueName(base: string, used: Set<string>): string {
  const raw = (base || '').trim() || 'tex';
  const dot = raw.lastIndexOf('.');
  const stem = dot >= 0 ? raw.slice(0, dot) : raw;
  const ext = dot >= 0 ? raw.slice(dot) : '';
  let out = `${stem}${ext}`;
  let n = 1;
  while (used.has(out.toLowerCase())) {
    out = `${stem}_${n}${ext}`;
    n++;
  }
  used.add(out.toLowerCase());
  return out;
}

function relDir(rel: string): string {
  const n = (rel || '').replace(/\\/g, '/');
  const i = n.lastIndexOf('/');
  if (i <= 0) return '';
  return n.slice(0, i);
}

function baseName(p: string): string {
  const n = (p || '').replace(/\\/g, '/');
  const parts = n.split('/');
  return parts[parts.length - 1] || n;
}

function dirNameAbs(p: string): string {
  const n = (p || '').replace(/\\/g, '/');
  const parts = n.split('/');
  parts.pop();
  return parts.join('/');
}

function joinAbs(dir: string, rel: string): string {
  const d = (dir || '').replace(/\\/g, '/').replace(/\/+$/, '');
  const r = (rel || '').replace(/\\/g, '/').replace(/^\/+/, '');
  if (!d) return r;
  if (!r) return d;
  return `${d}/${r}`;
}

function ensureModelHasSequence(model: any): void {
  if (!model) return;
  if (!Array.isArray(model.Sequences)) {
    model.Sequences = [];
  }
  if (model.Sequences.length === 0) {
    model.Sequences.push({
      Name: 'Default',
      Interval: new Uint32Array([0, 1]),
      NonLooping: false,
      MinimumExtent: new Float32Array([0, 0, 0]),
      MaximumExtent: new Float32Array([0, 0, 0]),
      BoundsRadius: 0,
      MoveSpeed: 0,
      Rarity: 0,
    });
    return;
  }

  const s0 = model.Sequences[0];
  if (!s0) {
    model.Sequences[0] = {
      Name: 'Default',
      Interval: new Uint32Array([0, 1]),
      NonLooping: false,
      MinimumExtent: new Float32Array([0, 0, 0]),
      MaximumExtent: new Float32Array([0, 0, 0]),
      BoundsRadius: 0,
      MoveSpeed: 0,
      Rarity: 0,
    };
    return;
  }

  const interval = s0.Interval;
  if (interval instanceof Uint32Array) {
    if (interval.length < 2) {
      s0.Interval = new Uint32Array([interval[0] ?? 0, (interval[0] ?? 0) + 1]);
    }
  } else if (Array.isArray(interval)) {
    const a0 = (interval[0] ?? 0) | 0;
    const a1 = (interval[1] ?? (a0 + 1)) | 0;
    s0.Interval = new Uint32Array([a0, a1]);
  } else {
    s0.Interval = new Uint32Array([0, 1]);
  }

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
  animName: string;
  loop: boolean;
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
  const adapter = await navigator.gpu.requestAdapter();
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
  public readonly warnEl: HTMLDivElement;
  public visible = false;
  public loaded = false;
  public loading = false;

  private renderer: ModelRenderer | null = null;
  private model: Model | null = null;
  public modelRel: string | null = null;
  private hasMissingTexture = false;
  private theta = 0;
  private cameraDistance = 600;
  private center = vec3.create();

  public destroy(): void {
    if (this.renderer) {
      try { this.renderer.destroy(); } catch {}
    }
    this.renderer = null;
    this.model = null;
    this.loaded = false;
    this.loading = false;
  }

  constructor(
    public readonly modelAbs: string,
    modelRel: string,
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

    this.warnEl = document.createElement('div');
    this.warnEl.className = 'tile-warn';
    this.warnEl.style.display = 'none';
    this.warnEl.textContent = '缺失贴图';
    this.el.appendChild(this.warnEl);

    const hint = document.createElement('div');
    hint.className = 'hint';
    hint.textContent = 'Loading...';
    this.el.appendChild(hint);

    const footer = document.createElement('div');
    footer.className = 'meta';
    this.labelEl = document.createElement('span');
    this.labelEl.className = 'name';
    this.labelEl.textContent = displayModelName(modelAbs);
    this.badgeEl = document.createElement('span');
    this.badgeEl.className = 'badge';
    this.badgeEl.textContent = '…';
    footer.appendChild(this.labelEl);
    footer.appendChild(this.badgeEl);
    this.el.appendChild(footer);

    this.modelRel = modelRel;
  }

  setRel(modelRel: string) {
    this.modelRel = modelRel;
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
      this.hasMissingTexture = false;
      this.warnEl.style.display = 'none';
      let model = getCachedModel(this.modelAbs);
      if (!model) {
        const bytes = await this.readFile(this.modelAbs);
        const lower = this.modelAbs.toLowerCase();
        const array = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
        if (lower.endsWith('.mdx') || isMDXBytes(bytes)) {
          model = parseMDX(array);
        } else {
          const text = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
          model = parseMDL(text);
        }
        setCachedModel(this.modelAbs, model);
      }
      ensureModelHasSequence(model);
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
        const seqIdx = findSequenceIndexByName(model, this.getSettings().animName);
        renderer.setSequence(seqIdx);
        const seq = model.Sequences[seqIdx];
        if (seq?.Interval?.length) renderer.setFrame(seq.Interval[0]);
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

      if (this.hasMissingTexture) {
        this.warnEl.style.display = '';
      }

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
    // 遍历所有 geosets 计算实际包围盒（比 Info 中的包围盒更准确）
    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
    let hasGeosetBounds = false;

    if (model.Geosets && model.Geosets.length > 0) {
      for (const geo of model.Geosets) {
        if (geo.MinimumExtent) {
          minX = Math.min(minX, geo.MinimumExtent[0]);
          minY = Math.min(minY, geo.MinimumExtent[1]);
          minZ = Math.min(minZ, geo.MinimumExtent[2]);
          hasGeosetBounds = true;
        }
        if (geo.MaximumExtent) {
          maxX = Math.max(maxX, geo.MaximumExtent[0]);
          maxY = Math.max(maxY, geo.MaximumExtent[1]);
          maxZ = Math.max(maxZ, geo.MaximumExtent[2]);
          hasGeosetBounds = true;
        }
      }
    }

    // 如果 geosets 没有包围盒，使用 Info 中的包围盒
    if (!hasGeosetBounds) {
      const info = model.Info;
      if (info?.MinimumExtent && info?.MaximumExtent) {
        minX = info.MinimumExtent[0]; minY = info.MinimumExtent[1]; minZ = info.MinimumExtent[2];
        maxX = info.MaximumExtent[0]; maxY = info.MaximumExtent[1]; maxZ = info.MaximumExtent[2];
        hasGeosetBounds = true;
      }
    }

    if (hasGeosetBounds && isFinite(minX) && isFinite(maxX)) {
      const sizeX = maxX - minX;
      const sizeY = maxY - minY;
      const sizeZ = maxZ - minZ;

      // 计算中心点：XY 取几何中心，Z 取几何中心（50%）
      const cx = (minX + maxX) / 2;
      const cy = (minY + maxY) / 2;
      const cz = (minZ + maxZ) / 2;
      vec3.set(this.center, cx, cy, cz);

      // 使用最大尺寸计算相机距离，让模型填满视口
      const maxSize = Math.max(sizeX, sizeY, sizeZ);
      const fov = Math.PI / 4;
      // 系数 1.0 让模型几乎填满视口
      this.cameraDistance = Math.max(50, (maxSize / 2) / Math.tan(fov / 2) * 1.0);
    } else {
      vec3.set(this.center, 0, 0, 0);
      this.cameraDistance = 300;
    }
  }

  private async loadTextures(model: Model, renderer: ModelRenderer) {
    const support = { hasGPUBC: this.gpu.hasGPUBC };
    const promises: Promise<void>[] = [];

    const modelDir = dirNameAbs(this.modelAbs);

    for (const tex of model.Textures || []) {
      if (!tex?.Image) continue;
      const abs = resolveTextureAbs(tex.Image, this.modelAbs, this.idx);
      if (!abs) {
        console.warn('[tex-missing]', tex.Image, 'model', this.modelAbs);
        this.hasMissingTexture = true;
        try { renderer.setTextureImageData(tex.Image, fallbackMipmaps()); } catch {}
        continue;
      }
      promises.push((async () => {
        try {
          const img = (tex.Image || '').trim();
          const imgNorm = img.replace(/\\/g, '/');
          const isAbs = /^[a-zA-Z]:[\\/]/.test(img) || imgNorm.startsWith('/');
          const isNative = isWar3NativePath(imgNorm);

          if (abs.startsWith('mpq:auto:')) {
            if (!isNative && !isAbs) {
              const candidates: string[] = [];
              candidates.push(joinAbs(modelDir, imgNorm));
              const bn = baseName(imgNorm);
              if (bn && bn !== imgNorm) candidates.push(joinAbs(modelDir, bn));
              for (const cand of candidates) {
                try {
                  const data = await this.readFile(cand);
                  await loadTextureIntoRenderer(renderer, tex.Image, cand, data, support);
                  return;
                } catch {}
              }
            }
          }

          const data = await this.readFile(abs);
          await loadTextureIntoRenderer(renderer, tex.Image, abs, data, support);
        } catch (err) {
          console.warn('[tex-read-fail]', tex.Image, 'abs', abs, err);
          this.hasMissingTexture = true;
          try { renderer.setTextureImageData(tex.Image, fallbackMipmaps()); } catch {}
        }
      })());
    }

    await Promise.all(promises);
  }

  tick(_now: number, dt: number) {
    if (!this.visible || !this.loaded || !this.renderer || !this.model) return;

    const s = this.getSettings();
    this.renderer.setEffectsEnabled({ particles: true, ribbons: true });

    if (s.rotate) {
      this.theta += dt * 0.0007;
    }

    const aspect = this.canvas.width / this.canvas.height;
    mat4.perspective(pMatrix, Math.PI / 4, aspect, 0.1, 50000);

    const dist = this.cameraDistance;
    // 使用较小的俯仰角（约 15 度），让相机更水平地看向模型中心
    const elevationAngle = 0.15;
    vec3.set(
      cameraPos,
      this.center[0] + Math.cos(this.theta) * dist * Math.cos(elevationAngle),
      this.center[1] + Math.sin(this.theta) * dist * Math.cos(elevationAngle),
      this.center[2] + dist * Math.sin(elevationAngle)
    );
    vec3.copy(cameraTarget, this.center);

    mat4.lookAt(mvMatrix, cameraPos, cameraTarget, cameraUp);

    const camQuat = calcCameraQuat(cameraPos, cameraTarget);
    this.renderer.setCamera(cameraPos, camQuat);

    // Simple fixed light
    const lightPos = vec3.fromValues(cameraPos[0] + dist * 0.5, cameraPos[1] - dist * 0.3, cameraPos[2] + dist * 0.8);
    this.renderer.setLightPosition(lightPos);
    this.renderer.setLightColor(vec3.fromValues(1.0, 1.0, 1.0));

    try {
      if (s.animate && this.model.Sequences?.length) {
        if (!s.loop) {
          const seqIndex = (this.renderer as any).getSequence?.() ?? 0;
          const seq = this.model.Sequences[seqIndex];
          const end = seq?.Interval?.[1];
          const frame = (this.renderer as any).getFrame?.() ?? 0;
          if (!(typeof end === 'number' && frame >= end)) {
            this.renderer.update(dt);
          }
        } else {
          this.renderer.update(dt);
        }
      }

      this.renderer.render(mvMatrix, pMatrix, {
        wireframe: false,
        env: false,
        useEnvironmentMap: false,
        levelOfDetail: 0
      });
    } catch (e) {
      console.error(e);
      // Stop repeated crashes for this tile.
      try { this.renderer.destroy(); } catch {}
      this.renderer = null;
      this.loaded = false;
      const hint = document.createElement('div');
      hint.className = 'hint';
      hint.textContent = `Error: ${String((e as any)?.message || e)}`;
      this.el.appendChild(hint);
    }
  }

  applyAnimation(animName: string) {
    if (!this.model || !this.renderer) return;
    const seqIdx = findSequenceIndexByName(this.model, animName);
    this.renderer.setSequence(seqIdx);
    const seq = this.model.Sequences?.[seqIdx];
    if (seq?.Interval?.length) {
      this.renderer.setFrame(seq.Interval[0]);
    }
  }
}

// --- Single model overlay viewer (desktop only) ---
class SingleModelViewer {
  private overlay: HTMLDivElement;
  private canvas: HTMLCanvasElement;
  private warnEl: HTMLDivElement;
  private titleEl: HTMLDivElement;
  private selAnim: HTMLSelectElement;
  private rngSpeed: HTMLInputElement;
  private rngBg: HTMLInputElement;
  private txtSpeed: HTMLSpanElement;
  private txtBg: HTMLSpanElement;
  private inpOutDir: HTMLInputElement;
  private btnPickOut: HTMLButtonElement;
  private inpExportName: HTMLInputElement;
  private exportHintEl: HTMLDivElement;
  private btnBack: HTMLButtonElement;
  private btnExport: HTMLButtonElement;
  private btnShot: HTMLButtonElement;
  private btnDelModel: HTMLButtonElement;
  private btnDelModelTex: HTMLButtonElement;
  private inpRenameName: HTMLInputElement;
  private btnRenameModel: HTMLButtonElement;

  private outDir: string | null = null;

  private renderer: ModelRenderer | null = null;
  private model: Model | null = null;
  private modelAbs: string | null = null;
  private idx: FileIndex | null = null;
  private gpu: GPUShared | null = null;
  private raf = 0;
  private lastTime = 0;

  private hasMissingTexture = false;

  // camera
  private center = vec3.create();
  private theta = 0;
  private phi = 0.45;
  private distance = 600;
  private panX = 0;
  private panY = 0;
  private panZ = 0;
  private dragging = false;
  private dragButton = 0;
  private lastX = 0;
  private lastY = 0;

  // default values for reset
  private defaultTheta = 0;
  private defaultPhi = 0.45;
  private defaultDistance = 600;
  private defaultPanX = 0;
  private defaultPanY = 0;
  private defaultPanZ = 0;

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
    private readonly getExportDir: () => string | null,
    private readonly setExportDir: (dir: string | null) => void,
    private readonly onDeleted?: (modelAbs: string) => void,
  ) {
    // build DOM
    this.overlay = document.createElement('div');
    this.overlay.className = 'single-overlay';
    this.overlay.innerHTML = `
      <div class="single-shell">
        <div class="single-left">
          <div class="single-canvas-wrap">
            <canvas class="single-canvas" width="960" height="720"></canvas>
            <div class="single-warn" style="display:none">缺失贴图</div>
            <div class="single-hint">左键：旋转  |  右键：平移  |  滚轮：缩放  |  双击：重置  |  ESC：关闭</div>
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
              <input class="field-input" id="singleExportName" placeholder="model" />
              <div class="single-export-hint" id="singleExportHint" style="font-size:11px;color:#888;line-height:1.4;"></div>
            </div>

            <button class="btn" id="singleExport">导出模型与贴图</button>
            <button class="btn btn-ghost" id="singleShot">导出当前截图（PNG）</button>

            <div class="single-field" style="margin-top:10px;">
              <label>重命名模型</label>
              <div class="single-row">
                <input class="field-input" id="singleRenameName" placeholder="新文件名" />
                <button class="btn" id="singleRenameBtn">重命名</button>
              </div>
            </div>

            <button class="btn btn-danger" id="singleDelModel">删除模型（仅模型）</button>
            <button class="btn btn-danger" id="singleDelModelTex">删除模型（以及贴图）</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(this.overlay);

    this.canvas = this.overlay.querySelector('canvas.single-canvas') as HTMLCanvasElement;
    this.warnEl = this.overlay.querySelector('.single-warn') as HTMLDivElement;
    this.titleEl = this.overlay.querySelector('.single-title') as HTMLDivElement;
    this.selAnim = this.overlay.querySelector('#singleAnim') as HTMLSelectElement;
    this.rngSpeed = this.overlay.querySelector('#singleSpeed') as HTMLInputElement;
    this.rngBg = this.overlay.querySelector('#singleBg') as HTMLInputElement;
    this.txtSpeed = this.overlay.querySelector('#singleSpeedVal') as HTMLSpanElement;
    this.txtBg = this.overlay.querySelector('#singleBgVal') as HTMLSpanElement;
    this.inpOutDir = this.overlay.querySelector('#singleOutDir') as HTMLInputElement;
    this.btnPickOut = this.overlay.querySelector('#singlePickOut') as HTMLButtonElement;
    this.inpExportName = this.overlay.querySelector('#singleExportName') as HTMLInputElement;
    this.exportHintEl = this.overlay.querySelector('#singleExportHint') as HTMLDivElement;
    this.btnBack = this.overlay.querySelector('#singleBack') as HTMLButtonElement;
    this.btnExport = this.overlay.querySelector('#singleExport') as HTMLButtonElement;
    this.btnShot = this.overlay.querySelector('#singleShot') as HTMLButtonElement;
    this.btnDelModel = this.overlay.querySelector('#singleDelModel') as HTMLButtonElement;
    this.btnDelModelTex = this.overlay.querySelector('#singleDelModelTex') as HTMLButtonElement;
    this.inpRenameName = this.overlay.querySelector('#singleRenameName') as HTMLInputElement;
    this.btnRenameModel = this.overlay.querySelector('#singleRenameBtn') as HTMLButtonElement;

    // events
    this.btnBack.addEventListener('click', () => this.close());
    window.addEventListener('keydown', (e) => {
      if (this.overlay.style.display !== 'none' && e.key === 'Escape') this.close();
    });

    // mouse orbit & pan
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    this.canvas.addEventListener('pointerdown', (e) => {
      if (document.activeElement && ['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON'].includes(document.activeElement.tagName)) {
        return;
      }
      this.dragging = true;
      this.dragButton = e.button;
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
      if (this.dragButton === 0) {
        // Left button: yaw (left/right) and pitch (up/down)
        this.theta -= dx * 0.01;
        this.phi = Math.max(-1.5, Math.min(1.5, this.phi + dy * 0.01));
      } else if (this.dragButton === 2) {
        // Right button: pan Y (left/right) and pan Z (up/down, vertical screen movement)
        const panScale = this.distance * 0.002;
        this.panY -= dx * panScale;
        this.panZ += dy * panScale;
      }
    });
    this.canvas.addEventListener('pointerup', () => { this.dragging = false; });
    this.canvas.addEventListener('pointercancel', () => { this.dragging = false; });
    this.canvas.addEventListener('lostpointercapture', () => { this.dragging = false; });
    window.addEventListener('blur', () => { this.dragging = false; });
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const k = Math.exp(e.deltaY * 0.001);
      this.distance = Math.max(10, Math.min(50000, this.distance * k));
    }, { passive: false });
    // Double-click to reset camera
    this.canvas.addEventListener('dblclick', () => {
      this.theta = this.defaultTheta;
      this.phi = this.defaultPhi;
      this.distance = this.defaultDistance;
      this.panX = this.defaultPanX;
      this.panY = this.defaultPanY;
      this.panZ = this.defaultPanZ;
    });

    this.selAnim.addEventListener('change', () => {
      if (!this.renderer) return;
      const idx = parseInt(this.selAnim.value, 10) || 0;
      this.renderer.setSequence(idx);
      this.renderer.setFrame(this.renderer.getFrame());
    });

    this.selAnim.addEventListener('wheel', (e) => {
      if (!this.renderer) return;
      const count = this.selAnim.options.length;
      if (count <= 1) return;
      e.preventDefault();

      const cur = Math.max(0, Math.min(count - 1, parseInt(this.selAnim.value, 10) || 0));
      const dir = e.deltaY > 0 ? 1 : -1;
      let next = (cur + dir) % count;
      if (next < 0) next += count;
      this.selAnim.value = String(next);
      this.renderer.setSequence(next);
      this.renderer.setFrame(this.renderer.getFrame());
    }, { passive: false });


    const updateSpeedLabel = () => {
      const v = parseFloat(this.rngSpeed.value);
      this.txtSpeed.textContent = `${v.toFixed(2)}x`;
    };
    updateSpeedLabel();
    this.rngSpeed.addEventListener('input', updateSpeedLabel);

    this.rngBg.addEventListener('input', () => {
      const v = parseFloat(this.rngBg.value);
      this.txtBg.textContent = v.toFixed(2);
      // v=1 => black, v=0 => white
      const c = Math.max(0, Math.min(1, 1 - v));
      const r: any = this.renderer as any;
      try {
        if (r?.gpuRenderPassDescriptor?.colorAttachments?.[0]) {
          r.gpuRenderPassDescriptor.colorAttachments[0].clearValue = [c, c, c, 1];
        }
      } catch {}
    });

    this.btnPickOut.addEventListener('click', async () => {
      if (!window.war3Desktop) return;
      const out = await window.war3Desktop.selectExportFolder();
      if (!out) return;
      this.outDir = out;
      this.inpOutDir.value = out;
      try { this.setExportDir(out); } catch {}
    });

    this.inpExportName.addEventListener('input', () => this.updateExportHint());

    this.btnExport.addEventListener('click', async () => {
      if (!window.war3Desktop || !this.model || !this.idx || !this.modelAbs) return;
      let out = this.outDir || this.getExportDir();
      if (!out) out = await window.war3Desktop.selectExportFolder();
      if (!out) return;
      this.outDir = out;
      this.inpOutDir.value = out;
      try { this.setExportDir(out); } catch {}

      const exportName = (this.inpExportName.value || '').trim() || (this.modelAbs.split(/[\\/]/).pop() || 'model').replace(/\.[^.]+$/, '');
      const hasChinese = /[\u4e00-\u9fa5]/.test(exportName);

      const bytes = await this.readFile(this.modelAbs);
      const isMDX = this.modelAbs.toLowerCase().endsWith('.mdx') || isMDXBytes(bytes);

      const modelCopy: any = { ...this.model, Textures: (this.model.Textures || []).map(t => ({ ...t })) };
      const textureExports: { abs: string; name: string; texIndex: number }[] = [];
      const usedNames = new Set<string>();

      for (let i = 0; i < (this.model.Textures || []).length; i++) {
        const tex = this.model.Textures[i];
        if (!tex?.Image) continue;

        if (isWar3NativePath(tex.Image)) {
          continue;
        }
        const abs = resolveTextureAbs(tex.Image, this.modelAbs, this.idx);
        if (!abs) continue;

        let name: string;
        if (hasChinese) {
          const base = baseName(normalizeExportRel(tex.Image) || tex.Image);
          name = uniqueName(base || baseName(abs), usedNames);
        } else {
          const srcBase = baseName(abs);
          const dot = srcBase.lastIndexOf('.');
          const ext = dot >= 0 ? srcBase.slice(dot) : '.blp';
          name = uniqueName(`${exportName}_tex${i}${ext}`, usedNames);
          modelCopy.Textures[i].Image = name;
        }
        textureExports.push({ abs, name, texIndex: i });
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
          await window.war3Desktop.writeFile(`${out}/${te.name}`, data);
        } catch {
        }
      }

      alert('导出成功。');
    });

    this.btnShot.addEventListener('click', async () => {
      if (!window.war3Desktop) return;
      let out = this.outDir || this.getExportDir();
      if (!out) out = await window.war3Desktop.selectExportFolder();
      if (!out) return;
      this.outDir = out;
      this.inpOutDir.value = out;
      try { this.setExportDir(out); } catch {}
      const blob = await new Promise<Blob | null>((resolve) => this.canvas.toBlob(resolve));
      if (!blob) return;
      const buf = new Uint8Array(await blob.arrayBuffer());
      const name = (this.modelAbs?.split(/[\\/]/).pop() || 'shot').replace(/\.(mdx|mdl)$/i, '');
      const file = `${out.replace(/\\/g, '/')}/${name}.png`;
      await window.war3Desktop.writeFile(file, buf);
      alert('导出成功。');
    });

    this.btnDelModel.addEventListener('click', async () => {
      await this.deleteCurrent(false);
    });
    this.btnDelModelTex.addEventListener('click', async () => {
      await this.deleteCurrent(true);
    });

    this.btnRenameModel.addEventListener('click', async () => {
      await this.renameCurrent();
    });

    this.overlay.style.display = 'none';
  }

  private async renameCurrent() {
    if (!window.war3Desktop || !this.modelAbs) return;
    if (isVirtualMpqPath(this.modelAbs)) {
      alert('MPQ 内资源无法重命名。');
      return;
    }

    const newName = (this.inpRenameName.value || '').trim();
    if (!newName) {
      alert('请输入新的文件名。');
      return;
    }

    const dir = dirNameAbs(this.modelAbs);
    const oldExt = this.modelAbs.toLowerCase().endsWith('.mdl') ? '.mdl' : '.mdx';
    const newAbs = `${dir}/${newName}${oldExt}`;

    if (newAbs.replace(/\\/g, '/').toLowerCase() === this.modelAbs.replace(/\\/g, '/').toLowerCase()) {
      return;
    }

    const ok = await window.war3Desktop.renameFile(this.modelAbs, newAbs);
    if (!ok) {
      alert('重命名失败（可能文件已存在或权限不足）。');
      return;
    }

    const oldAbs = this.modelAbs;
    this.modelAbs = newAbs;
    this.titleEl.textContent = displayModelName(newAbs);
    this.inpExportName.value = newName;
    this.inpRenameName.value = newName;
    this.updateExportHint();

    try {
      window.dispatchEvent(new CustomEvent('war3:modelRenamed', { detail: { oldAbs, newAbs } }));
    } catch {}
  }

  private async deleteCurrent(withTextures: boolean) {
    if (!window.war3Desktop || !this.idx || !this.modelAbs) return;
    if (isVirtualMpqPath(this.modelAbs)) {
      alert('MPQ 内资源无法删除（只能删除本地文件）。');
      return;
    }

    const toDelete: string[] = [this.modelAbs];
    if (withTextures && this.model) {
      const modelDir = dirNameAbs(this.modelAbs);
      for (const tex of this.model.Textures || []) {
        if (!tex?.Image) continue;
        if (isWar3NativePath(tex.Image)) continue;
        const abs = resolveTextureAbs(tex.Image, this.modelAbs, this.idx);
        if (!abs) continue;
        if (isVirtualMpqPath(abs)) continue;
        if (dirNameAbs(abs) === modelDir) {
          toDelete.push(abs);
        }
      }
    }

    if (!confirmDeleteFiles(toDelete)) return;
    const ok = await window.war3Desktop.deleteFiles(toDelete);
    if (!ok) {
      alert('删除失败（可能是 MPQ 资源或权限不足）。');
      return;
    }
    try { this.onDeleted?.(this.modelAbs); } catch {}
    this.close();
  }

  public setExternalExportDir(dir: string | null) {
    this.outDir = dir;
    try {
      if (this.overlay.style.display !== 'none') {
        this.inpOutDir.value = dir || '';
      }
    } catch {
    }
  }

  private updateExportHint() {
    if (!this.exportHintEl || !this.model) return;
    const exportName = (this.inpExportName.value || '').trim() || 'model';
    const hasChinese = /[\u4e00-\u9fa5]/.test(exportName);
    const isMDX = this.modelAbs?.toLowerCase().endsWith('.mdx');
    const ext = isMDX ? '.mdx' : '.mdl';

    const texCount = (this.model.Textures || []).filter(t => t?.Image && !isWar3NativePath(t.Image)).length;
    let texHint = '';
    if (texCount > 0) {
      if (hasChinese) {
        texHint = `（贴图保持原名，共 ${texCount} 张）`;
      } else {
        const names = [];
        for (let i = 0; i < Math.min(texCount, 3); i++) {
          names.push(`${exportName}_tex${i}.blp`);
        }
        if (texCount > 3) names.push('...');
        texHint = `+ ${names.join(' + ')}`;
      }
    }

    this.exportHintEl.innerHTML = `将导出：<b>${exportName}${ext}</b> ${texHint}<br><span style="color:#666;">（保持原扩展名，内部 path 也改成纯文件名）</span>`;
  }

  private computeCamera(model: Model) {
    // 遍历所有 geosets 计算实际包围盒
    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
    let hasGeosetBounds = false;

    if (model.Geosets && model.Geosets.length > 0) {
      for (const geo of model.Geosets) {
        if (geo.MinimumExtent) {
          minX = Math.min(minX, geo.MinimumExtent[0]);
          minY = Math.min(minY, geo.MinimumExtent[1]);
          minZ = Math.min(minZ, geo.MinimumExtent[2]);
          hasGeosetBounds = true;
        }
        if (geo.MaximumExtent) {
          maxX = Math.max(maxX, geo.MaximumExtent[0]);
          maxY = Math.max(maxY, geo.MaximumExtent[1]);
          maxZ = Math.max(maxZ, geo.MaximumExtent[2]);
          hasGeosetBounds = true;
        }
      }
    }

    if (!hasGeosetBounds) {
      const info = model.Info;
      if (info?.MinimumExtent && info?.MaximumExtent) {
        minX = info.MinimumExtent[0]; minY = info.MinimumExtent[1]; minZ = info.MinimumExtent[2];
        maxX = info.MaximumExtent[0]; maxY = info.MaximumExtent[1]; maxZ = info.MaximumExtent[2];
        hasGeosetBounds = true;
      }
    }

    if (hasGeosetBounds && isFinite(minX) && isFinite(maxX)) {
      const sizeX = maxX - minX;
      const sizeY = maxY - minY;
      const sizeZ = maxZ - minZ;
      const cx = (minX + maxX) / 2;
      const cy = (minY + maxY) / 2;
      const cz = (minZ + maxZ) / 2;
      vec3.set(this.center, cx, cy, cz);

      const maxSize = Math.max(sizeX, sizeY, sizeZ);
      const fov = Math.PI / 4;
      this.distance = Math.max(50, (maxSize / 2) / Math.tan(fov / 2) * 1.0);
    } else {
      vec3.set(this.center, 0, 0, 0);
      this.distance = 300;
    }
    this.theta = 0;
    this.phi = 0.45;
    this.panX = 0;
    this.panY = 0;
    this.panZ = 0;

    // Save default values for reset
    this.defaultTheta = this.theta;
    this.defaultPhi = this.phi;
    this.defaultDistance = this.distance;
    this.defaultPanX = this.panX;
    this.defaultPanY = this.panY;
    this.defaultPanZ = this.panZ;
  }

  async open(modelAbs: string, idx: FileIndex, gpu: GPUShared) {
    this.close();
    this.modelAbs = modelAbs;
    this.idx = idx;
    this.gpu = gpu;
    this.overlay.style.display = 'block';
    this.titleEl.textContent = displayModelName(modelAbs);
    this.hasMissingTexture = false;
    if (this.warnEl) this.warnEl.style.display = 'none';
    this.outDir = this.getExportDir();
    this.inpOutDir.value = this.outDir || '';

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
      ensureModelHasSequence(model);
      this.model = model;
      this.computeCamera(model);

      const base = displayModelName(modelAbs);
      const baseName = base.replace(/\.[^.]+$/, '');
      this.inpExportName.value = baseName;
      this.inpRenameName.value = baseName;
      this.updateExportHint();

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
      if (this.hasMissingTexture && this.warnEl) {
        this.warnEl.style.display = '';
      }
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
    this.hasMissingTexture = false;
    for (const tex of model.Textures || []) {
      if (!tex?.Image) continue;
      const abs = resolveTextureAbs(tex.Image, this.modelAbs!, idx);
        if (!abs) {
          console.warn('[tex-missing]', tex.Image, 'model', this.modelAbs);
          this.hasMissingTexture = true;
          continue;
        }
      promises.push((async () => {
        try {
          const data = await this.readFile(abs);
          await loadTextureIntoRenderer(renderer, tex.Image, abs, data, support);
        } catch (err) {
          console.warn('[tex-read-fail]', tex.Image, 'abs', abs, err);
          this.hasMissingTexture = true;
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

    // spherical camera with pan offset
    const cx = this.center[0] + this.panX;
    const cy = this.center[1] + this.panY;
    const cz = this.center[2] + this.panZ;
    const r = this.distance;
    const cosPhi = Math.cos(this.phi);
    vec3.set(
      cameraPos,
      cx + Math.cos(this.theta) * cosPhi * r,
      cy + Math.sin(this.theta) * cosPhi * r,
      cz + Math.sin(this.phi) * r
    );
    vec3.set(cameraTarget, cx, cy, cz);

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
  private observer: IntersectionObserver;
  private tiles: ModelTile[] = [];
  private tilePool = new Map<string, ModelTile>();
  private tileMap = new Map<HTMLDivElement, ModelTile>();
  private lastFiltered: string[] = [];

  private isMapMode = false;
  private lastPageList: string[] = [];
  private lastPages = 1;
  private lastPage = 0;
  private lastPageSize = 1;

  private loadingQueue: ModelTile[] = [];
  private loadingCount = 0;

  private singleViewer: SingleModelViewer;
  private readonly getExportDir: () => string | null;
  private readonly setExportDir: (dir: string | null) => void;

  private prefetchGen = 0;
  private prefetching = false;

  private readonly tilePoolMax = 200;

  private tilePoolGet(modelAbs: string): ModelTile | null {
    const t = this.tilePool.get(modelAbs) || null;
    if (!t) return null;
    this.tilePool.delete(modelAbs);
    this.tilePool.set(modelAbs, t);
    return t;
  }

  private tilePoolSet(modelAbs: string, tile: ModelTile): void {
    this.tilePool.delete(modelAbs);
    this.tilePool.set(modelAbs, tile);
  }

  private tilePoolEvict(keepAbs: Set<string>): void {
    while (this.tilePool.size > this.tilePoolMax) {
      const oldestKey = this.tilePool.keys().next().value as string | undefined;
      if (!oldestKey) return;
      if (keepAbs.has(oldestKey)) {
        const t = this.tilePool.get(oldestKey);
        if (!t) return;
        this.tilePool.delete(oldestKey);
        this.tilePool.set(oldestKey, t);
        continue;
      }
      const oldTile = this.tilePool.get(oldestKey);
      this.tilePool.delete(oldestKey);
      try { oldTile?.destroy(); } catch {}
    }
  }

  constructor(
    private readonly grid: HTMLElement,
    private readonly statusEl: HTMLElement,
    private readonly readFile: (p: string) => Promise<Uint8Array>,
    private readonly getSettings: () => ViewerSettings,
    getExportDir: () => string | null,
    setExportDir: (dir: string | null) => void,
  ) {
    this.getExportDir = getExportDir;
    this.setExportDir = setExportDir;
    this.singleViewer = new SingleModelViewer(this.readFile, this.getExportDir, this.setExportDir, (modelAbs) => {
      this.onExternalModelDeleted(modelAbs);
    });

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

    this.grid.addEventListener('contextmenu', (ev) => {
      const e = ev as unknown as MouseEvent;
      const target = e.target as HTMLElement | null;
      const tileEl = target?.closest?.('.tile') as HTMLDivElement | null;
      if (!tileEl) return;
      const tile = this.tileMap.get(tileEl);
      if (!tile) return;
      e.preventDefault();
      e.stopPropagation();
      this.openContextMenu(tile, e.clientX, e.clientY);
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

  private ctxMenuEl: HTMLDivElement | null = null;
  private ctxMenuCurrent: ModelTile | null = null;
  private ctxItemDelModel: HTMLDivElement | null = null;
  private ctxItemDelModelTex: HTMLDivElement | null = null;
  private ctxItemViewTextures: HTMLDivElement | null = null;

  private emitModelsChanged(deletedRels: string[]) {
    try {
      window.dispatchEvent(new CustomEvent('war3:modelsChanged', { detail: { deletedRels } }));
    } catch {
    }
  }

  private setCtxItemDisabled(item: HTMLDivElement | null, disabled: boolean) {
    if (!item) return;
    item.dataset.disabled = disabled ? '1' : '';
    item.style.cursor = disabled ? 'not-allowed' : 'pointer';
    item.style.opacity = disabled ? '0.5' : '1';
    item.style.pointerEvents = disabled ? 'none' : 'auto';
  }

  private ensureContextMenu() {
    if (this.ctxMenuEl) return;
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.zIndex = '99999';
    el.style.minWidth = '260px';
    el.style.padding = '10px';
    el.style.borderRadius = '14px';
    el.style.background = 'rgba(24, 24, 24, 0.92)';
    el.style.border = '1px solid rgba(255,255,255,0.10)';
    el.style.backdropFilter = 'blur(12px)';
    el.style.color = '#eee';
    el.style.display = 'none';
    el.style.userSelect = 'none';

    const makeItem = (label: string, onClick?: (tile: ModelTile) => void, disabled?: boolean) => {
      const item = document.createElement('div');
      item.textContent = label;
      item.style.padding = '10px 12px';
      item.style.borderRadius = '10px';
      item.dataset.disabled = disabled ? '1' : '';
      item.style.cursor = disabled ? 'not-allowed' : 'pointer';
      item.style.opacity = disabled ? '0.5' : '1';
      item.addEventListener('mouseenter', () => {
        if (item.dataset.disabled === '1') return;
        item.style.background = 'rgba(255,255,255,0.08)';
      });
      item.addEventListener('mouseleave', () => {
        item.style.background = 'transparent';
      });
      item.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (item.dataset.disabled === '1') return;
        const tile = this.ctxMenuCurrent;
        this.hideContextMenu();
        if (!tile) return;
        try { onClick?.(tile); } catch {}
      });
      el.appendChild(item);
      return item;
    };

    makeItem('当前模型：', undefined, true);
    makeItem('复制相对路径', (tile) => this.ctxCopyRel(tile));
    makeItem('复制绝对路径', (tile) => this.ctxCopyAbs(tile));
    makeItem('导出模型', (tile) => this.ctxExport(tile));
    this.ctxItemDelModel = makeItem('删除模型（仅模型）', (tile) => this.ctxDelete(tile, false)) || null;
    this.ctxItemDelModelTex = makeItem('删除模型（以及贴图）', (tile) => this.ctxDelete(tile, true)) || null;
    this.ctxItemViewTextures = makeItem('查看模型贴图', (tile) => this.ctxViewTextures(tile)) || null;

    document.body.appendChild(el);
    this.ctxMenuEl = el;

    window.addEventListener('mousedown', (e) => {
      if (!this.ctxMenuEl) return;
      const target = e.target as HTMLElement | null;
      if (target && this.ctxMenuEl.contains(target)) return;
      this.hideContextMenu();
    });
    window.addEventListener('keydown', (ev) => {
      if ((ev as KeyboardEvent).key === 'Escape') this.hideContextMenu();
    });
    window.addEventListener('scroll', () => this.hideContextMenu(), { passive: true });
  }

  private openContextMenu(tile: ModelTile, x: number, y: number) {
    this.ensureContextMenu();
    if (!this.ctxMenuEl) return;
    this.ctxMenuCurrent = tile;

    const disableDanger = this.isMapMode;
    this.setCtxItemDisabled(this.ctxItemDelModel, disableDanger);
    this.setCtxItemDisabled(this.ctxItemDelModelTex, disableDanger);
    this.setCtxItemDisabled(this.ctxItemViewTextures, disableDanger);

    const title = this.ctxMenuEl.firstChild as HTMLElement | null;
    if (title) {
      title.textContent = `当前模型： ${displayModelName(tile.modelAbs)}`;
    }

    this.ctxMenuEl.style.display = 'block';
    const pad = 8;
    const rect = this.ctxMenuEl.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width - pad;
    const maxY = window.innerHeight - rect.height - pad;
    this.ctxMenuEl.style.left = `${Math.max(pad, Math.min(x, maxX))}px`;
    this.ctxMenuEl.style.top = `${Math.max(pad, Math.min(y, maxY))}px`;
  }

  private hideContextMenu() {
    if (this.ctxMenuEl) this.ctxMenuEl.style.display = 'none';
    this.ctxMenuCurrent = null;
  }

  private ctxCopyRel(tile: ModelTile) {
    const rel = normalizeRelForCopy(tile.modelRel || displayModelName(tile.modelAbs));
    copyText(rel);
  }

  private ctxCopyAbs(tile: ModelTile) {
    copyText(tile.modelAbs);
  }

  private async parseModelFromAbs(modelAbs: string): Promise<{ model: Model; isMDX: boolean; bytes: Uint8Array } | null> {
    try {
      const bytes = await this.readFile(modelAbs);
      const lower = modelAbs.toLowerCase();
      const isMDX = lower.endsWith('.mdx') || isMDXBytes(bytes);
      const array = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
      let model: Model;
      if (isMDX) model = parseMDX(array);
      else {
        const text = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
        model = parseMDL(text);
      }
      ensureModelHasSequence(model);
      return { model, isMDX, bytes };
    } catch {
      return null;
    }
  }

  private async ctxExport(tile: ModelTile) {
    if (!this.idx) return;
    if (!window.war3Desktop) return;
    let out = this.getExportDir();
    if (!out) out = await window.war3Desktop.selectExportFolder();
    if (!out) return;
    try { this.setExportDir(out); } catch {}

    const parsed = await this.parseModelFromAbs(tile.modelAbs);
    if (!parsed) return;

    const used = new Set<string>();
    const modelCopy: any = { ...parsed.model, Textures: (parsed.model.Textures || []).map(tt => ({ ...tt })) };
    const texWrites: { abs: string; name: string }[] = [];

    for (let i = 0; i < (parsed.model.Textures || []).length; i++) {
      const tex = parsed.model.Textures[i];
      if (!tex?.Image) continue;
      if (isWar3NativePath(tex.Image)) continue;
      const abs = resolveTextureAbs(tex.Image, tile.modelAbs, this.idx);
      if (!abs) continue;
      const base = baseName(normalizeExportRel(tex.Image) || tex.Image) || baseName(abs);
      const name = uniqueName(base, used);
      modelCopy.Textures[i].Image = name;
      texWrites.push({ abs, name });
    }

    const baseModel = displayModelName(tile.modelAbs).replace(/\.(mdx|mdl)$/i, '');
    const modelFile = `${out.replace(/\\/g, '/')}/${baseModel}${parsed.isMDX ? '.mdx' : '.mdl'}`;
    if (parsed.isMDX) {
      const outBuf = generateMDX(modelCopy as Model);
      await window.war3Desktop.writeFile(modelFile, new Uint8Array(outBuf));
    } else {
      const outText = generateMDL(modelCopy as Model);
      await window.war3Desktop.writeFile(modelFile, new TextEncoder().encode(outText));
    }

    for (const tw of texWrites) {
      try {
        const data = await this.readFile(tw.abs);
        await window.war3Desktop.writeFile(`${out.replace(/\\/g, '/')}/${tw.name}`, data);
      } catch {
      }
    }

    alert('导出成功。');
  }

  public setExternalExportDir(dir: string | null) {
    try {
      this.singleViewer.setExternalExportDir(dir);
    } catch {
    }
  }

  private async ctxViewTextures(tile: ModelTile) {
    if (!this.idx) return;
    const parsed = await this.parseModelFromAbs(tile.modelAbs);
    if (!parsed) return;
    const lines: string[] = [];
    for (const tex of parsed.model.Textures || []) {
      if (!tex?.Image) continue;
      const native = isWar3NativePath(tex.Image);
      const abs = resolveTextureAbs(tex.Image, tile.modelAbs, this.idx);
      lines.push(`${native ? '[原生]' : '[导出]'} ${tex.Image}  ->  ${abs || '(missing)'}`);
    }
    alert(lines.join('\n'));
  }

  private async ctxDelete(tile: ModelTile, withTextures: boolean) {
    if (!this.idx || !window.war3Desktop) return;
    if (isVirtualMpqPath(tile.modelAbs)) {
      alert('MPQ 内资源无法删除（只能删除本地文件）。');
      return;
    }

    const toDelete: string[] = [tile.modelAbs];
    if (withTextures) {
      const parsed = await this.parseModelFromAbs(tile.modelAbs);
      if (parsed) {
        const modelDir = dirNameAbs(tile.modelAbs);
        for (const tex of parsed.model.Textures || []) {
          if (!tex?.Image) continue;
          if (isWar3NativePath(tex.Image)) continue;
          const abs = resolveTextureAbs(tex.Image, tile.modelAbs, this.idx);
          if (!abs) continue;
          if (isVirtualMpqPath(abs)) continue;
          if (dirNameAbs(abs) === modelDir) {
            toDelete.push(abs);
          }
        }
      }
    }

    if (!confirmDeleteFiles(toDelete)) return;

    const ok = await window.war3Desktop.deleteFiles(toDelete);
    if (!ok) {
      alert('删除失败（可能是 MPQ 资源或权限不足）。');
      return;
    }

    if (this.folder && tile.modelRel) {
      const rel = tile.modelRel;
      this.folder.models = this.folder.models.filter((m) => m !== rel);
      this.renderTiles();
      this.emitModelsChanged([rel]);
    }
  }

  public async deleteModels(modelRels: string[], withTextures: boolean): Promise<boolean> {
    if (!this.idx || !this.folder || !window.war3Desktop) return false;
    const uniq = Array.from(new Set((modelRels || []).filter(Boolean)));
    const toDeleteAbs: string[] = [];
    const deletedRels: string[] = [];

    for (const rel of uniq) {
      const abs = this.resolveModelAbs(rel);
      if (!abs) continue;
      if (isVirtualMpqPath(abs)) continue;
      deletedRels.push(rel);
      toDeleteAbs.push(abs);

      if (withTextures) {
        const parsed = await this.parseModelFromAbs(abs);
        if (parsed) {
          const modelDir = dirNameAbs(abs);
          for (const tex of parsed.model.Textures || []) {
            if (!tex?.Image) continue;
            if (isWar3NativePath(tex.Image)) continue;
            const texAbs = resolveTextureAbs(tex.Image, abs, this.idx);
            if (!texAbs) continue;
            if (isVirtualMpqPath(texAbs)) continue;
            if (dirNameAbs(texAbs) === modelDir) {
              toDeleteAbs.push(texAbs);
            }
          }
        }
      }
    }

    const uniqAbs = Array.from(new Set(toDeleteAbs));
    if (!uniqAbs.length) return false;
    if (!confirmDeleteFiles(uniqAbs)) return false;

    const ok = await window.war3Desktop.deleteFiles(uniqAbs);
    if (!ok) {
      alert('删除失败（可能是 MPQ 资源或权限不足）。');
      return false;
    }

    this.folder.models = this.folder.models.filter((m) => !deletedRels.includes(m));
    this.renderTiles();
    this.emitModelsChanged(deletedRels);
    return true;
  }

  private onExternalModelDeleted(modelAbs: string) {
    if (!this.folder || !this.idx) return;
    const absLower = (modelAbs || '').replace(/\\/g, '/').toLowerCase();
    const rel = this.folder.models.find((m) => {
      const a = this.idx?.byRelLower.get(m.replace(/\\/g, '/').toLowerCase());
      return (a || '').replace(/\\/g, '/').toLowerCase() === absLower;
    });
    if (!rel) return;
    this.folder.models = this.folder.models.filter((m) => m !== rel);
    this.renderTiles();
    this.emitModelsChanged([rel]);
  }

  public onModelRenamed(oldAbs: string, newAbs: string) {
    if (!this.folder || !this.idx) return;
    const oldAbsNorm = (oldAbs || '').replace(/\\/g, '/');
    const oldAbsLower = oldAbsNorm.toLowerCase();
    const newAbsNorm = (newAbs || '').replace(/\\/g, '/');

    const oldRelIdx = this.folder.models.findIndex((m) => {
      const a = this.idx?.byRelLower.get(m.replace(/\\/g, '/').toLowerCase());
      return (a || '').replace(/\\/g, '/').toLowerCase() === oldAbsLower;
    });

    if (oldRelIdx < 0) return;

    const root = this.folder.root.replace(/\\/g, '/');
    const newRel = newAbsNorm.startsWith(root)
      ? newAbsNorm.slice(root.length).replace(/^\/+/, '')
      : newAbsNorm.split('/').pop() || '';
    const newBase = newAbsNorm.split('/').pop() || '';

    this.folder.models[oldRelIdx] = newRel;

    const fileIdx = this.folder.files.findIndex((f) =>
      f.abs.replace(/\\/g, '/').toLowerCase() === oldAbsLower
    );
    if (fileIdx >= 0) {
      this.folder.files[fileIdx] = {
        ...this.folder.files[fileIdx],
        abs: newAbsNorm,
        rel: newRel,
        base: newBase,
      };
    }

    this.idx = this.buildIndex(this.folder);
    this.tilePool.clear();
    this.renderTiles();
  }

  private lastLoopTime = 0;

  private loop = (now: number) => {
    const dt = this.lastLoopTime ? (now - this.lastLoopTime) : 16;
    this.lastLoopTime = now;

    for (const tile of this.tiles) {
      if (tile.visible) {
        tile.tick(now, dt);
      }
    }
    requestAnimationFrame(this.loop);
  };

  public setGlobalAnimation(animName: string) {
    for (const tile of this.tiles) {
      tile.applyAnimation(animName);
    }
  }

  async setFolder(folder: FolderData) {
    this.folder = {
      ...folder,
      models: (folder.models || []).filter((m) => !isHiddenModelRel(m)),
    };

    this.isMapMode = typeof folder?.root === 'string' && folder.root.startsWith('mpq:');

    if (!this.gpu) {
      this.status('初始化 WebGPU...');
      this.gpu = await initWebGPU();
    }

    this.idx = this.buildIndex(folder);
    this.tilePool.clear();
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

  public async cacheAllModels(onProgress?: (done: number, total: number) => void): Promise<boolean> {
    if (!this.folder || !this.idx || !this.gpu) return false;

    const s = this.getSettings();
    const models = this.folder.models.slice();
    const total = models.length;
    let done = 0;
    const maxConcurrency = 1;
    const pending = models.slice();

    this.status(`缓存中... 0/${total}`);
    onProgress?.(0, total);

    const work = async () => {
      while (pending.length) {
        const rel = pending.shift();
        if (!rel) continue;
        const modelAbs = this.resolveModelAbs(rel);
        if (!modelAbs) {
          done++;
          continue;
        }

        const tile = new ModelTile(modelAbs, rel, this.idx!, this.gpu!, this.readFile, this.getSettings);
        tile.setSize(s.tileSize);

        try {
          await tile.load();
        } catch {
        } finally {
          try { tile.destroy(); } catch {}
          done++;
          this.status(`缓存中... ${done}/${total}`);
          onProgress?.(done, total);
          if (done % 5 === 0) {
            await new Promise((r) => setTimeout(r, 0));
          }
        }
      }
    };

    const workers = Array.from({ length: Math.min(maxConcurrency, total) }, () => work());
    await Promise.all(workers);
    this.status(`缓存完成: ${done}/${total}`);
    onProgress?.(done, total);
    return true;
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

        const modelBytes = await this.readFile(modelAbs);
        const lower = modelAbs.toLowerCase();
        const isMDX = lower.endsWith('.mdx') || isMDXBytes(modelBytes);
        const array = modelBytes.buffer.slice(modelBytes.byteOffset, modelBytes.byteOffset + modelBytes.byteLength);
        let model: Model;
        if (isMDX) {
          model = parseMDX(array);
        } else {
          const text = new TextDecoder('utf-8', { fatal: false }).decode(modelBytes);
          model = parseMDL(text);
        }

        const modelCopy: any = { ...model, Textures: (model.Textures || []).map(t => ({ ...t })) };
        const used = new Set<string>();
        const texWrites: { abs: string; dst: string }[] = [];

        const relNorm = rel.replace(/\\/g, '/');
        const outDirRel = relDir(relNorm);
        const outDirAbs = outDirRel ? `${outRoot.replace(/\\/g, '/')}/${outDirRel}` : outRoot.replace(/\\/g, '/');

        for (let i = 0; i < (model.Textures || []).length; i++) {
          const tex = model.Textures[i];
          if (!tex?.Image) continue;
          if (isWar3NativePath(tex.Image)) continue;
          const abs = resolveTextureAbs(tex.Image, modelAbs, this.idx);
          if (!abs) continue;
          const base = baseName(normalizeExportRel(tex.Image) || tex.Image) || baseName(abs);
          const name = uniqueName(base, used);
          modelCopy.Textures[i].Image = name;
          texWrites.push({ abs, dst: `${outDirAbs}/${name}` });
        }

        const dstModel = `${outRoot.replace(/\\/g, '/')}/${relNorm}`;
        if (isMDX) {
          const outBuf = generateMDX(modelCopy as Model);
          await window.war3Desktop.writeFile(dstModel, new Uint8Array(outBuf));
        } else {
          const outText = generateMDL(modelCopy as Model);
          await window.war3Desktop.writeFile(dstModel, new TextEncoder().encode(outText));
        }

        for (const tw of texWrites) {
          try {
            const texBytes = await this.readFile(tw.abs);
            await window.war3Desktop.writeFile(tw.dst, texBytes);
          } catch {
          }
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

  private startPrefetchNextPage(filtered: string[], page: number, pageSize: number) {
    if (!this.folder || !this.idx) return;

    this.prefetchGen++;
    const gen = this.prefetchGen;

    const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const nextPage = page + 1;
    if (nextPage >= pages) return;

    const start = nextPage * pageSize;
    const end = start + pageSize;
    const list = filtered.slice(start, end);
    if (!list.length) return;

    if (this.prefetching) return;
    this.prefetching = true;

    (async () => {
      try {
        for (let i = 0; i < list.length; i++) {
          if (gen !== this.prefetchGen) return;
          const rel = list[i];
          const modelAbs = this.resolveModelAbs(rel);
          if (!modelAbs) continue;

          try {
            let model = getCachedModel(modelAbs);
            if (!model) {
              const bytes = await this.readFile(modelAbs);
              const lower = modelAbs.toLowerCase();
              const array = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
              if (lower.endsWith('.mdx') || isMDXBytes(bytes)) {
                model = parseMDX(array);
              } else {
                const text = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
                model = parseMDL(text);
              }
              ensureModelHasSequence(model);
              setCachedModel(modelAbs, model);
            }

            for (const tex of model.Textures || []) {
              if (!tex?.Image) continue;
              const abs = resolveTextureAbs(tex.Image, modelAbs, this.idx);
              if (!abs) continue;
              try {
                await this.readFile(abs);
              } catch {
              }
            }
          } catch {
          }

          if (i % 3 === 0) {
            await new Promise((r) => setTimeout(r, 0));
          }
        }
      } finally {
        if (gen === this.prefetchGen) {
          this.prefetching = false;
        }
      }
    })();
  }

  private renderTiles() {
    const s = this.getSettings();
    const folder = this.folder!;
    const idx = this.idx!;
    const gpu = this.gpu!;

    const filter = (s.filter || '').trim().toLowerCase();
    const allModels = folder.models.slice();
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

    try { this.observer.disconnect(); } catch {}
    this.grid.innerHTML = '';
    this.tiles = [];
    this.tileMap.clear();
    this.loadingQueue = [];
    this.loadingCount = 0;

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

    const keepAbs = new Set<string>();
    for (const modelRel of list) {
      const modelAbs = this.resolveModelAbs(modelRel);
      if (!modelAbs) continue;
      keepAbs.add(modelAbs);
      let tile = this.tilePoolGet(modelAbs);
      if (!tile) {
        tile = new ModelTile(modelAbs, modelRel, idx, gpu, this.readFile, this.getSettings);
        this.tilePoolSet(modelAbs, tile);
      } else {
        tile.setRel(modelRel);
      }
      tile.setSize(s.tileSize);
      this.tiles.push(tile);
      this.tileMap.set(tile.el, tile);
      this.grid.appendChild(tile.el);
      this.observer.observe(tile.el);
    }

    this.tilePoolEvict(keepAbs);

    this.status(`模型: ${filtered.length}  | 页: ${page + 1}/${pages}  | 显示: ${list.length}`);

    this.startPrefetchNextPage(filtered, page, pageSize);
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