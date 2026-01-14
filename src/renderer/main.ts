import { BatchViewer, type ViewerSettings } from './war3/batchViewer';

const btnPick = document.getElementById('btnPick') as HTMLButtonElement;
const btnPickMap = document.getElementById('btnPickMap') as HTMLButtonElement;
const btnPrev = document.getElementById('btnPrev') as HTMLButtonElement;
const btnNext = document.getElementById('btnNext') as HTMLButtonElement;
const txtPage = document.getElementById('txtPage') as HTMLSpanElement;
const inpJump = document.getElementById('inpJump') as HTMLInputElement;
const btnJump = document.getElementById('btnJump') as HTMLButtonElement;
const inpLimit = document.getElementById('inpLimit') as HTMLInputElement;
const selAnim = document.getElementById('selAnim') as HTMLSelectElement;
const chkLoop = document.getElementById('chkLoop') as HTMLInputElement;
const btnCache = document.getElementById('btnCache') as HTMLButtonElement;
const togRotate = document.getElementById('togRotate') as HTMLInputElement;
const statusEl = document.getElementById('status') as HTMLSpanElement;
const war3StatusEl = document.getElementById('war3Status') as HTMLSpanElement;
const inpFilter = document.getElementById('inpFilter') as HTMLInputElement;
const grid = document.getElementById('grid') as HTMLDivElement;
const fileList = document.getElementById('fileList') as HTMLDivElement;
const btnSelAll = document.getElementById('btnSelAll') as HTMLButtonElement;
const btnSelNone = document.getElementById('btnSelNone') as HTMLButtonElement;
const btnPickOut = document.getElementById('btnPickOut') as HTMLButtonElement;
const txtOutDir = document.getElementById('txtOutDir') as HTMLDivElement;
const btnExportSelected = document.getElementById('btnExportSelected') as HTMLButtonElement;
const btnExportAll = document.getElementById('btnExportAll') as HTMLButtonElement;

if (!window.war3Desktop) {
  statusEl.textContent = 'Electron preload not found';
  throw new Error('Electron preload not found');
}

const settings: ViewerSettings = {
  tileSize: 256,
  limit: parseInt(inpLimit.value, 10),
  page: 0,
  filter: inpFilter.value,
  animate: true,
  animName: selAnim?.value || 'stand',
  loop: !!chkLoop?.checked,
  rotate: togRotate.checked,
  particles: true,
  ribbons: true,
};

function getSettings(): ViewerSettings {
  settings.tileSize = 256;
  settings.limit = Math.max(1, parseInt(inpLimit.value, 10) || 1);
  settings.page = Math.max(0, settings.page | 0);
  settings.filter = inpFilter.value || '';
  settings.animate = true;
  settings.animName = selAnim?.value || 'stand';
  settings.loop = !!chkLoop?.checked;
  settings.rotate = togRotate.checked;
  settings.particles = true;
  settings.ribbons = true;
  return settings;
}

const READ_FILE_CACHE_MAX_BYTES = 256 * 1024 * 1024;
let readFileCacheBytes = 0;
const readFileCache = new Map<string, Uint8Array>();

function readFileCacheGet(abs: string): Uint8Array | null {
  const v = readFileCache.get(abs);
  if (!v) return null;
  readFileCache.delete(abs);
  readFileCache.set(abs, v);
  return v;
}

function readFileCacheSet(abs: string, bytes: Uint8Array): void {
  const existed = readFileCache.get(abs);
  if (existed) {
    readFileCacheBytes -= existed.byteLength || 0;
    readFileCache.delete(abs);
  }
  readFileCache.set(abs, bytes);
  readFileCacheBytes += bytes.byteLength || 0;
  while (readFileCacheBytes > READ_FILE_CACHE_MAX_BYTES && readFileCache.size) {
    const oldestKey = readFileCache.keys().next().value as string;
    const oldestVal = readFileCache.get(oldestKey);
    readFileCache.delete(oldestKey);
    readFileCacheBytes -= oldestVal?.byteLength || 0;
  }
}

const readFile = async (abs: string): Promise<Uint8Array> => {
  const cached = readFileCacheGet(abs);
  if (cached) return cached;
  const data = await window.war3Desktop.readFile(abs);
  if (!data) {
    throw new Error(`readFile failed: ${abs}`);
  }
  const bytes = data instanceof Uint8Array ? data : new Uint8Array(data as any);
  readFileCacheSet(abs, bytes);
  return bytes;
};

const viewer = new BatchViewer(grid, statusEl, readFile, getSettings);

let exportOutDir: string | null = null;
const selected = new Set<string>();

function renderPageInfo() {
  const info = viewer.getRenderInfo();
  if (!info) {
    txtPage.textContent = '0/0';
    inpJump.value = '1';
    return;
  }
  txtPage.textContent = `${info.page + 1}/${info.pages}`;
  inpJump.value = String(info.page + 1);
}

function rebuildFileList() {
  const list = viewer.getCurrentPageModelRels();
  fileList.innerHTML = '';
  for (const rel of list) {
    const row = document.createElement('div');
    row.className = 'file-item';
    const chk = document.createElement('input');
    chk.type = 'checkbox';
    chk.checked = selected.has(rel);
    const name = document.createElement('div');
    name.className = 'file-name';
    name.textContent = rel;
    row.appendChild(chk);
    row.appendChild(name);

    const toggle = (v: boolean) => {
      if (v) selected.add(rel);
      else selected.delete(rel);
      chk.checked = v;
    };
    chk.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle(chk.checked);
    });
    row.addEventListener('click', () => toggle(!selected.has(rel)));
    fileList.appendChild(row);
  }
}

function refreshAll() {
  viewer.refresh();
  renderPageInfo();
  rebuildFileList();

  try {
    const main = document.querySelector('.main') as HTMLElement | null;
    if (main) main.scrollTop = 0;
  } catch {}
  try {
    fileList.scrollTop = 0;
  } catch {}
}

async function refreshWar3Status() {
  if (!war3StatusEl) return;
  if (!window.war3Desktop?.getWar3Status) {
    war3StatusEl.textContent = 'War3: preload missing';
    return;
  }
  try {
    const info = await window.war3Desktop.getWar3Status();
    if (!info) {
      war3StatusEl.textContent = 'War3: 未设置';
      return;
    }
    const dir = info.dir || '(未设置)';
    const tag = info.hasMpqs ? 'OK' : '缺少MPQ';
    war3StatusEl.textContent = `War3: ${tag} | ${dir}`;
  } catch (e) {
    war3StatusEl.textContent = 'War3: 查询失败';
    console.error(e);
  }
}

btnPick.addEventListener('click', async () => {
  try {
    statusEl.textContent = '选择文件夹...';
    const folder = await window.war3Desktop.selectFolder();
    if (!folder) {
      statusEl.textContent = '取消';
      return;
    }
    await viewer.setFolder(folder);
    refreshAll();
    await refreshWar3Status();
  } catch (e: any) {
    console.error(e);
    statusEl.textContent = `错误: ${e?.message || e}`;
  }
});

btnPickMap.addEventListener('click', async () => {
  try {
    statusEl.textContent = '选择地图...';
    const folder = await window.war3Desktop.selectMap();
    if (!folder) {
      statusEl.textContent = '取消';
      return;
    }
    await viewer.setFolder(folder);
    refreshAll();
    await refreshWar3Status();
  } catch (e: any) {
    console.error(e);
    statusEl.textContent = `错误: ${e?.message || e}`;
  }
});

// 初次加载时显示 War3 目录/MPQ 状态
refreshWar3Status();

function refresh() {
  refreshAll();
}

inpLimit.addEventListener('change', refresh);
selAnim.addEventListener('change', () => {
  settings.animName = selAnim.value || 'stand';
  viewer.setGlobalAnimation(settings.animName);
});
chkLoop.addEventListener('change', () => {
  settings.loop = chkLoop.checked;
});
btnCache?.addEventListener('click', async () => {
  if (!btnCache) return;
  const prevText = btnCache.textContent;
  btnCache.disabled = true;
  btnCache.textContent = '缓存中... 0/0';
  try {
    await viewer.cacheAllModels((done, total) => {
      btnCache.textContent = `缓存中... ${done}/${total}`;
    });
  } catch (e) {
    console.error(e);
  } finally {
    btnCache.disabled = false;
    btnCache.textContent = prevText || '一键缓存';
  }
});
togRotate.addEventListener('change', () => {/*no tile rebuild needed*/});

let filterTimer: number | null = null;
inpFilter.addEventListener('input', () => {
  if (filterTimer) window.clearTimeout(filterTimer);
  filterTimer = window.setTimeout(() => {
    settings.page = 0;
    refresh();
    filterTimer = null;
  }, 200);
});

btnPrev.addEventListener('click', () => {
  const cur = settings.page | 0;
  if (cur <= 0) return;
  settings.page = cur - 1;
  refresh();
});

const applyJump = () => {
  const info = viewer.getRenderInfo();
  if (!info) return;
  const raw = parseInt(inpJump.value, 10);
  const desired = Number.isFinite(raw) ? raw : 1;
  const nextPage = Math.max(1, Math.min(info.pages, desired)) - 1;
  if (nextPage === (settings.page | 0)) return;
  settings.page = nextPage;
  refresh();
};

btnJump.addEventListener('click', applyJump);
inpJump.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') applyJump();
});

btnNext.addEventListener('click', () => {
  const info = viewer.getRenderInfo();
  const cur = settings.page | 0;
  if (info) {
    if (cur >= info.pages - 1) return;
    settings.page = cur + 1;
    refresh();
    return;
  }
  settings.page = cur + 1;
  refresh();
});

btnSelAll.addEventListener('click', () => {
  for (const rel of viewer.getCurrentPageModelRels()) {
    selected.add(rel);
  }
  rebuildFileList();
});

btnSelNone.addEventListener('click', () => {
  for (const rel of viewer.getCurrentPageModelRels()) {
    selected.delete(rel);
  }
  rebuildFileList();
});

btnPickOut.addEventListener('click', async () => {
  if (!window.war3Desktop) return;
  const out = await window.war3Desktop.selectExportFolder();
  if (!out) return;
  exportOutDir = out;
  txtOutDir.textContent = out;
});

btnExportSelected.addEventListener('click', async () => {
  if (!exportOutDir) {
    statusEl.textContent = '请先选择导出目录';
    return;
  }
  const items = Array.from(selected);
  statusEl.textContent = `导出选中: ${items.length}...`;
  const ok = await viewer.exportModels(exportOutDir, items);
  statusEl.textContent = ok ? `导出完成: ${items.length}` : '导出失败';
});

btnExportAll.addEventListener('click', async () => {
  if (!exportOutDir) {
    statusEl.textContent = '请先选择导出目录';
    return;
  }
  const items = viewer.getFilteredModelRels();
  statusEl.textContent = `导出全部: ${items.length}...`;
  const ok = await viewer.exportModels(exportOutDir, items);
  statusEl.textContent = ok ? `导出完成: ${items.length}` : '导出失败';
});
