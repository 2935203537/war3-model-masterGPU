import { BatchViewer, type ViewerSettings } from './war3/batchViewer';

const btnPick = document.getElementById('btnPick') as HTMLButtonElement;
const btnPickMap = document.getElementById('btnPickMap') as HTMLButtonElement;
const inpLimit = document.getElementById('inpLimit') as HTMLInputElement;
const selSize = document.getElementById('selSize') as HTMLSelectElement;
const togAnim = document.getElementById('togAnim') as HTMLInputElement;
const togRotate = document.getElementById('togRotate') as HTMLInputElement;
const togParticles = document.getElementById('togParticles') as HTMLInputElement;
const togRibbons = document.getElementById('togRibbons') as HTMLInputElement;
const statusEl = document.getElementById('status') as HTMLSpanElement;
const war3StatusEl = document.getElementById('war3Status') as HTMLSpanElement;
const inpFilter = document.getElementById('inpFilter') as HTMLInputElement;
const grid = document.getElementById('grid') as HTMLDivElement;

if (!window.war3Desktop) {
  statusEl.textContent = 'Electron preload not found';
  throw new Error('Electron preload not found');
}

const settings: ViewerSettings = {
  tileSize: parseInt(selSize.value, 10),
  limit: parseInt(inpLimit.value, 10),
  filter: inpFilter.value,
  animate: togAnim.checked,
  rotate: togRotate.checked,
  particles: togParticles.checked,
  ribbons: togRibbons.checked,
};

function getSettings(): ViewerSettings {
  settings.tileSize = parseInt(selSize.value, 10);
  settings.limit = Math.max(1, parseInt(inpLimit.value, 10) || 1);
  settings.filter = inpFilter.value || '';
  settings.animate = togAnim.checked;
  settings.rotate = togRotate.checked;
  settings.particles = togParticles.checked;
  settings.ribbons = togRibbons.checked;
  return settings;
}

const readFile = async (abs: string): Promise<Uint8Array> => {
  const data = await window.war3Desktop.readFile(abs);
  if (!data) {
    throw new Error(`readFile failed: ${abs}`);
  }
  return data instanceof Uint8Array ? data : new Uint8Array(data as any);
};

const viewer = new BatchViewer(grid, statusEl, readFile, getSettings);

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
    await refreshWar3Status();
  } catch (e: any) {
    console.error(e);
    statusEl.textContent = `错误: ${e?.message || e}`;
  }
});

// 初次加载时显示 War3 目录/MPQ 状态
refreshWar3Status();

function refresh() {
  viewer.refresh();
}

inpLimit.addEventListener('change', refresh);
selSize.addEventListener('change', refresh);
togAnim.addEventListener('change', () => {/*no tile rebuild needed*/});
togRotate.addEventListener('change', () => {/*no tile rebuild needed*/});
togParticles.addEventListener('change', () => {/*effects applied on load*/});
togRibbons.addEventListener('change', () => {/*effects applied on load*/});

let filterTimer: number | null = null;
inpFilter.addEventListener('input', () => {
  if (filterTimer) window.clearTimeout(filterTimer);
  filterTimer = window.setTimeout(() => {
    refresh();
    filterTimer = null;
  }, 200);
});
