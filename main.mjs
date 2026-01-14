// desktop/main.mjs
import { app, BrowserWindow, ipcMain, dialog, Menu } from "electron";
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MPQ reader (ported from vscode-plugin-blp-preview-main, no native dependency)
const require = createRequire(import.meta.url);
const MpqArchive = require('./mpq_cjs/archive').default;

function isDev() {
  // 最稳：没打包就认为是 dev
  return !app.isPackaged;
}

// --- WebGPU 开关（必须在 app ready 前设置） ---
app.commandLine.appendSwitch("enable-unsafe-webgpu");
app.commandLine.appendSwitch("enable-features", "WebGPU");

// 可选：部分机器上可能更稳（一般不用开）
// app.commandLine.appendSwitch("disable-gpu-sandbox");

let mainWindow = null;

// --- Warcraft MPQ integration (pure JS MPQ reader (no native dependency)) ---
// Default directory provided by user. Can be overridden via IPC.
const DEFAULT_WAR3_DIR = "E:\\Warcraft III Frozen Throne";
let war3Dir = DEFAULT_WAR3_DIR;

const mpqState = {
  nextId: 1,
  archives: new Map(), // id -> { path }
  activeMapId: null,
  gameMpqs: [], // ordered list of mpq paths
};

function sha1(s) {
  return crypto.createHash('sha1').update(s).digest('hex');
}

// MPQ reading is handled by the built-in JS MPQ reader (mpq_cjs/archive).

function hasRequiredMpqs(dir) {
  if (!dir) return false;
  // Consider the directory valid if we can find at least one MPQ in common locations.
  // (Classic 1.26/1.27: War3*.mpq. Some installs place MPQs under Data/)
  const roots = [dir, path.join(dir, 'Data')];
  for (const r of roots) {
    try {
      if (!fs.existsSync(r)) continue;
      const items = fs.readdirSync(r, { withFileTypes: true });
      for (const it of items) {
        if (it.isFile() && it.name.toLowerCase().endsWith('.mpq')) {
          return true;
        }
      }
    } catch {
      // ignore
    }
  }
  return false;
}

function autoDetectWar3Dir() {
  // Best-effort scan of common install paths on Windows. No registry needed.
  if (process.platform !== 'win32') return null;
  const bases = new Set();
  const pushBase = (b) => { if (b && typeof b === 'string') bases.add(b); };

  pushBase(process.env['PROGRAMFILES']);
  pushBase(process.env['PROGRAMFILES(X86)']);
  pushBase('C:\\');
  pushBase('D:\\');
  pushBase('E:\\');
  pushBase('F:\\');
  pushBase('G:\\');

  const suffixes = [
    'Warcraft III',
    'Warcraft III\\',
    'Warcraft III Frozen Throne',
    'Warcraft III Reforged',
  ];

  const candidates = [];
  for (const b of bases) {
    for (const suf of suffixes) {
      const full = path.join(b, suf);
      candidates.push(full);
    }
  }

  for (const c of candidates) {
    if (hasRequiredMpqs(c)) {
      return c;
    }
  }
  return null;
}

function getConfigPath() {
  return path.join(app.getPath('userData'), 'settings.json');
}

function loadSettingsSafe() {
  try {
    const p = getConfigPath();
    if (!fs.existsSync(p)) return;
    const json = JSON.parse(fs.readFileSync(p, 'utf8'));
    if (json && typeof json.war3Dir === 'string' && json.war3Dir.length > 0) {
      war3Dir = json.war3Dir;
    }
  } catch {
    // ignore
  }
}

function ensureWar3Dir() {
  // If config already has a valid dir with MPQs, keep it.
  if (hasRequiredMpqs(war3Dir)) {
    return;
  }

  // Try auto-detect common install locations.
  const auto = autoDetectWar3Dir();
  if (auto && hasRequiredMpqs(auto)) {
    war3Dir = auto;
    saveSettingsSafe();
    console.log('[war3] auto-detected dir:', war3Dir);
    return;
  }

  // Fallback: keep existing (may be invalid) so user can still set manually.
}

function saveSettingsSafe() {
  try {
    const p = getConfigPath();
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, JSON.stringify({ war3Dir }, null, 2), 'utf8');
  } catch {
    // ignore
  }
}


function hasMpqSignature(p) {
  // Fast validation to avoid treating random .mpq-like files as MPQ archives.
  // MPQ header: 'MPQ\x1A' (77 80 81 26)
  // User data header: 'MPQ\x1B' (77 80 81 27) which points to the real header.
  try {
    const fd = fs.openSync(p, 'r');
    try {
      const st = fs.fstatSync(fd);
      const size = st.size >>> 0;
      const head = Buffer.alloc(16);
      fs.readSync(fd, head, 0, 16, 0);

      // MPQ\x1A at 0
      if (head[0] === 77 && head[1] === 80 && head[2] === 81 && head[3] === 26) return true;

      // MPQ\x1B user data header at 0
      if (head[0] === 77 && head[1] === 80 && head[2] === 81 && head[3] === 27) {
        const off = head.readUInt32LE(8);
        if (off >= 0 && off + 4 <= size) {
          const sig = Buffer.alloc(4);
          fs.readSync(fd, sig, 0, 4, off);
          if (sig[0] === 77 && sig[1] === 80 && sig[2] === 81 && sig[3] === 26) return true;
        }
      }

      // Scan first 2MB at 512-boundaries for 'MPQ\x1A'
      const buf = Buffer.alloc(4);
      const maxBlocks = Math.min(Math.ceil(size / 512), 4096);
      for (let i = 0; i < maxBlocks; i++) {
        const base = i * 512;
        fs.readSync(fd, buf, 0, 4, base);
        if (buf[0] === 77 && buf[1] === 80 && buf[2] === 81 && buf[3] === 26) return true;
      }
      return false;
    } finally {
      fs.closeSync(fd);
    }
  } catch {
    return false;
  }
}

function refreshGameMpqList() {
  // Auto-scan MPQs under install directory, then order them by override priority.
  // Priority rule: patch > local > expansion > base, then any other MPQs.
  const scanRoots = [war3Dir, path.join(war3Dir, 'Data')];
  const found = new Map(); // lower(abs) -> abs

  const addIfMpq = (p) => {
    if (!p || typeof p !== 'string') return;
    const low = p.toLowerCase();
    if (!low.endsWith('.mpq')) return;
    if (fs.existsSync(p) && fs.statSync(p).isFile()) {
      // Filter out non-MPQ files that happen to end with .mpq (prevents 'No MPQ header' spam).
      if (!hasMpqSignature(p)) return;
      found.set(low, p);
    }
  };

  for (const root of scanRoots) {
    try {
      if (!fs.existsSync(root)) continue;
      const items = fs.readdirSync(root, { withFileTypes: true });
      for (const it of items) {
        if (it.isFile()) {
          addIfMpq(path.join(root, it.name));
        }
      }
    } catch {
      // ignore
    }
  }

  // Some installs put additional MPQs in subfolders (rare for classic, common for some custom setups).
  // We'll do a shallow walk (depth <= 2) to pick them up without getting too expensive.
  const walkShallow = (root, depth) => {
    if (depth <= 0) return;
    try {
      if (!fs.existsSync(root)) return;
      const items = fs.readdirSync(root, { withFileTypes: true });
      for (const it of items) {
        const p = path.join(root, it.name);
        if (it.isFile()) {
          addIfMpq(p);
        } else if (it.isDirectory()) {
          const nameLow = it.name.toLowerCase();
          // Skip huge/unrelated folders
          if (nameLow === 'maps' || nameLow === 'screenshots' || nameLow === 'replays' || nameLow === 'saves') continue;
          walkShallow(p, depth - 1);
        }
      }
    } catch {
      // ignore
    }
  };
  walkShallow(war3Dir, 2);

  const list = Array.from(found.values());

  const scoreMpq = (p) => {
    const name = path.basename(p).toLowerCase();
    // Higher score means higher priority (searched earlier).
    let score = 0;
    if (name.includes('patch')) score += 1000;
    if (name.includes('local')) score += 400;
    // Expansion indicator
    if (name.includes('war3x')) score += 200;
    if (name === 'war3.mpq') score += 100;
    // Prefer canonical names if present
    if (name === 'war3patch.mpq') score += 50;
    if (name === 'war3xlocal.mpq' || name === 'war3local.mpq') score += 20;
    if (name === 'war3x.mpq') score += 10;
    // More specific (longer) names usually represent overrides
    score += Math.min(30, name.length);
    return score;
  };

  list.sort((a, b) => {
    const sa = scoreMpq(a);
    const sb = scoreMpq(b);
    if (sa !== sb) return sb - sa;
    return path.basename(a).localeCompare(path.basename(b));
  });

  mpqState.gameMpqs = list;
}

async function stormReadFileCached(mpqPath, innerPath) {
  const cacheRoot = path.join(app.getPath('userData'), 'mpq_cache');
  const key = sha1(mpqPath + '|' + innerPath.toLowerCase());
  const out = path.join(cacheRoot, key);
  try {
    if (fs.existsSync(out)) {
      return await fs.promises.readFile(out);
    }
    await fs.promises.mkdir(cacheRoot, { recursive: true });
    // JS MPQ reader (no native dependency): open archive, read file, then cache on disk.
    const archive = MpqArchive.getByPath(mpqPath);
    await archive.promise;
    const mpqName = innerPath.replace(/\//g, '\\');
    const data = await archive.get(mpqName);
    if (!data) {
      throw new Error(`MPQ file not found: '${innerPath}' in '${mpqPath}'`);
    }
    const buf = Buffer.from(data);
    await fs.promises.writeFile(out, buf);
    return buf;
  } catch (e) {
    throw e;
  }
}

async function mpqReadFromChain(innerPath, preferredMapId = null) {
  // Try map MPQ first (if any), then game MPQs.
  // Also apply best-effort path normalization / fallback for imported assets.
  const expandInnerPaths = (p) => {
    if (!p || typeof p !== 'string') return [];
    let s = p.trim().replace(/^\/+/, '');
    // Normalize slashes for canonical form.
    s = s.replace(/\\/g, '/');

    const out = [];
    const add = (x) => {
      if (!x) return;
      const k = x;
      if (!out.includes(k)) out.push(k);
    };

    add(s);
    add(s.replace(/\//g, '\\')); // backslash variant

    const lower = s.toLowerCase();
    const hasDir = lower.includes('/');
    const ext = path.posix.extname(lower);
    const isAsset = MODEL_EXTS.has(ext) || TEX_EXTS.has(ext);

    // Many maps store non-custom imports under war3mapImported/<name>
    // but references may appear as bare filenames. Try both.
    if (isAsset && !hasDir) {
      add(`war3mapImported/${s}`);
      add(`war3mapImported\\${s}`);
    }

    // If path already has war3mapImported/, also try without it.
    if (lower.startsWith('war3mapimported/')) {
      const tail = s.slice('war3mapImported/'.length);
      add(tail);
      add(tail.replace(/\//g, '\\'));
    }

    return out;
  };

  const innerCandidates = expandInnerPaths(innerPath);
  if (innerCandidates.length === 0) {
    throw new Error('MPQ invalid path');
  }

  const tries = [];
  if (preferredMapId && mpqState.archives.has(preferredMapId)) {
    tries.push(mpqState.archives.get(preferredMapId).path);
  } else if (mpqState.activeMapId && mpqState.archives.has(mpqState.activeMapId)) {
    tries.push(mpqState.archives.get(mpqState.activeMapId).path);
  }
  for (const p of mpqState.gameMpqs) tries.push(p);

  if (tries.length === 0) {
    throw new Error('No MPQs loaded. Please set Warcraft III directory (with War3.mpq / War3x.mpq etc.).');
  }

  let lastErr = null;
  for (const mpqPath of tries) {
    for (const cand of innerCandidates) {
      try {
        return await stormReadFileCached(mpqPath, cand);
      } catch (e) {
        lastErr = e;
      }
    }
  }
  throw lastErr || new Error('MPQ file not found');
}

// 你要扫描的扩展名（按需增减）
// NOTE: 当前渲染器( war3-model )不支持 .m3（二进制 SC2 模型格式）。
// 为避免误扫到 .m3（保护图常见）导致加载失败，这里先只收集 .mdx/.mdl。
// 如果后续你确实需要 .m3，我们再单独接入解析/渲染链路。
const MODEL_EXTS = new Set([".mdx", ".mdl"]);
const TEX_EXTS = new Set([".blp", ".dds", ".tga", ".png", ".jpg", ".jpeg", ".webp"]);

function normalizeExt(p) {
  return path.extname(p).toLowerCase();
}

// --- Text decoding helpers (best-effort for listfile / filenames) ---
function _countRepl(s) {
  return (s.match(/\uFFFD/g) || []).length;
}

function decodeBytesSmart(bytes) {
  // Try UTF-8, then GBK/CP936, and finally latin1 (byte-preserving).
  const buf = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);

  const utf8 = buf.toString('utf8');
  const gbk = (() => {
    try { return new TextDecoder('gbk').decode(buf); } catch { return null; }
  })();
  const latin1 = buf.toString('latin1');

  const candidates = [
    { s: utf8, repl: _countRepl(utf8) },
    ...(gbk != null ? [{ s: gbk, repl: _countRepl(gbk) }] : []),
    { s: latin1, repl: _countRepl(latin1) },
  ];

  const pathishScore = (s) => {
    // Favor strings that look like file paths.
    let score = 0;
    for (let i = 0; i < s.length; i++) {
      const c = s.charCodeAt(i);
      if ((c >= 0x30 && c <= 0x39) || (c >= 0x41 && c <= 0x5A) || (c >= 0x61 && c <= 0x7A)) score += 1;
      else if (c === 0x2F || c === 0x5C || c === 0x2E || c === 0x5F || c === 0x2D) score += 2;
      else if (c >= 0x4E00 && c <= 0x9FFF) score += 1; // CJK
    }
    return score;
  };

  candidates.sort((a, b) => {
    if (a.repl !== b.repl) return a.repl - b.repl;
    return pathishScore(b.s) - pathishScore(a.s);
  });

  return candidates[0].s;
}

function decodeTextSmart(buf) {
  // For large listfiles this is still cheap, and avoids spawning PowerShell (removed).
  const s = decodeBytesSmart(buf);
  // If it looks like UTF-8 already, keep as-is.
  return s;
}

const _cp936Cache = new Map();
async function decodeCp936(buf) {
  // Decode bytes as CP936/GBK in-process.
  // Note: Support for legacy encodings depends on the ICU build shipped with your Electron version.
  // If not available, we simply return null and let callers fall back to UTF-8/latin1 heuristics.
  try {
    // Prefer GB18030 (superset) if available, otherwise GBK.
    try { return new TextDecoder('gb18030').decode(buf); } catch {}
    return new TextDecoder('gbk').decode(buf);
  } catch {
    return null;
  }
}




// --- Scan binary/text buffers to extract referenced resource paths (no listfile needed) ---
function scanBufferForPaths(buf, extsSet) {
  const found = new Set();
  if (!buf || !buf.length) return found;

  const lower = Buffer.from(buf); // copy
  // lower-case ASCII letters in-place for searching extensions
  for (let i = 0; i < lower.length; i++) {
    const c = lower[i];
    if (c >= 0x41 && c <= 0x5A) lower[i] = c + 0x20;
  }

  const exts = Array.from(extsSet);
  const delims = new Set([0x00, 0x0A, 0x0D, 0x09, 0x20, 0x22, 0x27, 0x3C, 0x3E, 0x28, 0x29, 0x5B, 0x5D, 0x7B, 0x7D, 0x7C, 0x2C, 0x3B]);

  function isDelimiter(b) {
    return delims.has(b);
  }

  for (const ext of exts) {
    const extBytes = Buffer.from(ext, 'ascii'); // ext is ascii (e.g. .mdx)
    let pos = 0;
    while (pos >= 0 && pos < lower.length) {
      const idx = lower.indexOf(extBytes, pos);
      if (idx < 0) break;

      // Expand left to find start
      let start = idx;
      while (start > 0 && !isDelimiter(lower[start - 1])) start--;

      // Expand right to find end (include extension)
      let end = idx + extBytes.length;
      while (end < lower.length && !isDelimiter(lower[end])) end++;

      // Slice original bytes (not lower) so we keep original case/bytes
      const slice = buf.slice(start, end);

      // Decode best effort: UTF-8 / GBK / latin1.
      let s = decodeBytesSmart(slice);

      s = s.replace(/\0/g, '');
      s = s.trim();

      // Basic cleanup / validation
      if (s.length >= ext.length + 1 && s.length <= 260) {
        // normalize slashes
        s = s.replace(/\\/g, '/');
        // remove surrounding quotes if any
        s = s.replace(/^["']+|["']+$/g, '');
        // guard: must end with ext
        const sLower = s.toLowerCase();
        if (sLower.endsWith(ext)) {
          // remove weird control chars
          s = s.replace(/[\u0000-\u001F]/g, '');
          // avoid obviously bad matches
          if (/^[^<>:"|?*]+$/.test(s)) found.add(s);
        }
      }

      pos = idx + extBytes.length;
    }
  }

  return found;
}

// Parse war3map.imp (import list) to recover imported file paths even when (listfile) is missing.
// Format (v1): int32 version, int32 count, then for each entry: uint8 flags, C-string path.
async function parseWar3mapImp(buf) {
  const out = [];
  if (!buf || buf.length < 8) return out;

  const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  let off = 0;

  const readI32 = () => {
    if (off + 4 > buf.length) return null;
    const v = dv.getInt32(off, true);
    off += 4;
    return v;
  };

  const readCStringBytes = () => {
    if (off >= buf.length) return null;
    const end = buf.indexOf(0, off);
    const e = end >= 0 ? end : buf.length;
    const slice = buf.slice(off, e);
    off = (end >= 0 ? end + 1 : buf.length);
    return slice;
  };

  const decodeImpString = async (bytes) => {
    if (!bytes || bytes.length === 0) return '';
    let s = decodeBytesSmart(bytes);
    s = String(s).replace(/\0/g, '').trim();

    // If it looks garbled and contains high bytes, try CP936/GBK via decodeCp936.
    const hasHigh = Buffer.from(bytes).some(b => b >= 0x80);
    const looksGarbled = s.includes('\uFFFD') || (hasHigh && !/[\u4E00-\u9FFF]/.test(s) && /[\\\/]/.test(s));
    if (looksGarbled) {
      const gbk = await decodeCp936(bytes);
      if (gbk && !gbk.includes('\uFFFD')) {
        s = gbk.replace(/\0/g, '').trim();
      }
    }
    return s;
  };

  const ver = readI32();
  const n = readI32();
  // sanity: if header looks wrong, fallback to scanning
  const maxN = 200000;
  const headerOk = ver != null && n != null && n >= 0 && n <= maxN;
  if (!headerOk) {
    // Fallback: just scan for path-like strings inside imp bytes
    for (const p of scanBufferForPaths(buf, new Set([...MODEL_EXTS, ...TEX_EXTS]))) out.push(p);
    return out;
  }

  // Unified parse: entries may store flag as 4 bytes or 1 byte.
  for (let i = 0; i < n; i++) {
    if (off >= buf.length) break;

    // Consume flag: prefer 4-byte if it looks like a small int.
    let flag = null;
    if (off + 4 <= buf.length) {
      const v4 = dv.getInt32(off, true);
      if (Number.isFinite(v4) && v4 >= -16 && v4 <= 32) {
        flag = v4;
        off += 4;
      }
    }
    if (flag == null && off + 1 <= buf.length) {
      const v1 = dv.getUint8(off);
      if (v1 <= 32) {
        flag = v1;
        off += 1;
      }
    }
    const bytes = readCStringBytes();
    if (flag == null || bytes == null) break;

    let p = await decodeImpString(bytes);
    if (!p) continue;

    let s = p.replace(/\\/g, '/');
    const lower = s.toLowerCase();
    const looksLikeBare = !lower.includes('/');
    const isStandard = (flag === 5 || flag === 8 || flag === 0 || flag === 1);
    if (isStandard && looksLikeBare) s = `war3mapImported/${s}`;
    out.push(s);
  }

  // Last-resort: if nothing parsed, scan raw bytes.
  if (out.length === 0) {
    for (const p of scanBufferForPaths(buf, new Set([...MODEL_EXTS, ...TEX_EXTS]))) out.push(p);
  }
  return out;
}



async function enumerateMapResourcesNoListfile(mapPath) {
  const targets = [
    'war3map.imp',
    'war3map.j',
    'war3map.lua',
    'war3map.wts',
    'war3map.w3i',
    'war3map.w3e',
    'war3map.w3r',
    'war3map.w3g',
    'war3map.w3p',
    'war3map.w3s',
    'war3map.w3u',
    'war3map.w3t',
    'war3map.w3b',
    'war3map.w3d',
    'war3map.w3a',
    'war3map.w3h',
    'war3map.w3q',
    'war3map.w3c',
    'war3map.wpm',
    'war3map.mmp',
    'war3map.shd',
    'war3map.doo',
    'war3mapUnits.doo',
    'war3map.wtg',
    'war3map.wct',
    'war3mapMisc.txt',
    'war3mapSkin.txt',
  ];

  const models = new Set();
  const textures = new Set();

  // 1) Best-effort import list parsing: this works even when (listfile) is removed.
  try {
    const impBuf = await stormReadFileCached(mapPath, 'war3map.imp');
    for (const rel of await parseWar3mapImp(impBuf)) {
      const ext = normalizeExt(rel);
      if (MODEL_EXTS.has(ext)) models.add(rel);
      if (TEX_EXTS.has(ext)) textures.add(rel);
    }
  } catch {
    // ignore missing
  }

  for (const t of targets) {
    try {
      const buf = await stormReadFileCached(mapPath, t);

      // Byte-scan (fast, works for ASCII paths even in binary files)
      for (const p of scanBufferForPaths(buf, MODEL_EXTS)) models.add(p);
      for (const p of scanBufferForPaths(buf, TEX_EXTS)) textures.add(p);

      // If the map uses Chinese filenames and no listfile, the raw bytes are often CP936/GBK.
      // Decode the whole chunk once (Windows-only) and regex-extract paths to restore names as much as possible.
      if (buf.length > 0 && buf.length < 5_000_000) {
        const txt = await decodeCp936(buf);
        if (txt) {
			  const rxModel = /[^\s"'<>|]{1,260}\.(?:mdx|mdl)/ig;
          const rxTex = /[^\s"'<>|]{1,260}\.(?:blp|dds|tga|png|jpe?g|webp)/ig;
          for (const m of txt.match(rxModel) || []) models.add(m.replace(/\\/g, '/'));
          for (const m of txt.match(rxTex) || []) textures.add(m.replace(/\\/g, '/'));
        }
      }
    } catch {
      // ignore missing
    }
  }

  // If still empty, do a last-resort scan of the entire map file bytes (may be heavier but helps).
  if (models.size === 0) {
    try {
      const whole = await fs.promises.readFile(mapPath);
      for (const p of scanBufferForPaths(whole, MODEL_EXTS)) models.add(p);
      for (const p of scanBufferForPaths(whole, TEX_EXTS)) textures.add(p);
    } catch {}
  }

  return { models: Array.from(models), textures: Array.from(textures) };
}


async function statSafe(p) {
  try {
    return await fs.promises.stat(p);
  } catch {
    return null;
  }
}

async function scanFolderRecursive(rootDir) {
  /** 返回：
   * {
   *   root: "E:\\xxx",
   *   files: [{ abs, rel, ext, base }, ...],
   *   models: ["relative/path/to/model.mdx", ...]
   * }
   */
  const models = [];
  const textures = [];

  async function walk(dir) {
    let entries;
    try {
      entries = await fs.promises.readdir(dir, { withFileTypes: true });
    } catch (e) {
      // 读不了就跳过（权限/占用/符号链接等）
      return;
    }

    for (const ent of entries) {
      const absPath = path.join(dir, ent.name);

      // 跳过一些常见垃圾目录
      if (ent.isDirectory()) {
        const nameLower = ent.name.toLowerCase();
        if (nameLower === "node_modules" || nameLower === ".git") continue;
        await walk(absPath);
        continue;
      }

      if (!ent.isFile()) continue;

      const ext = normalizeExt(ent.name);
      if (!MODEL_EXTS.has(ext) && !TEX_EXTS.has(ext)) continue;

      const st = await statSafe(absPath);
      // IMPORTANT: Normalize to forward slashes so renderer-side lookups match
      // MDX/MDL internal paths (which typically use '/') across Windows/macOS/Linux.
      const relPath = path.relative(rootDir, absPath).replace(/\\/g, "/");

      const item = {
        absPath,
        relPath,
        name: ent.name,
        ext,
        size: st?.size ?? 0,
        mtimeMs: st?.mtimeMs ?? 0,
      };

      if (MODEL_EXTS.has(ext)) models.push(item);
      else textures.push(item);
    }
  }

  await walk(rootDir);

  // 排序：让显示更稳定
  models.sort((a, b) => a.relPath.localeCompare(b.relPath));
  textures.sort((a, b) => a.relPath.localeCompare(b.relPath));

  // 合并所有文件并转换格式以匹配 FolderData
  const allFiles = [...models, ...textures].map(item => ({
    abs: item.absPath,
    rel: item.relPath,
    ext: item.ext,
    base: item.name,
  }));

  // 提取模型的相对路径
  const modelPaths = models.map(item => item.relPath.replace(/\\/g, "/"));

  return { root: rootDir, files: allFiles, models: modelPaths };
}

function setupMenu(win) {
  // 可选：提供 File -> Open Folder / View -> DevTools
  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "Set Warcraft III Directory",
          click: async () => {
            const res = await dialog.showOpenDialog(win, {
              title: "Select Warcraft III directory",
              properties: ["openDirectory"],
            });
            if (res.canceled || !res.filePaths?.[0]) return;
            war3Dir = res.filePaths[0];
            saveSettingsSafe();
            refreshGameMpqList();
          },
        },
        {
          label: "Open Folder",
          accelerator: "Ctrl+O",
          click: async () => {
            const res = await dialog.showOpenDialog(win, {
              title: "Select assets folder",
              properties: ["openDirectory"],
            });
            if (res.canceled || !res.filePaths?.[0]) return;
            win.webContents.send("folder-selected", res.filePaths[0]);
          },
        },
        { type: "separator" },
        { role: "quit" },
      ],
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 860,
    backgroundColor: "#111111",
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  setupMenu(mainWindow);

  // 关键：你之前遇到的“黑屏/加载失败”，这里能直接打印原因
  mainWindow.webContents.on("did-fail-load", (_e, code, desc, url) => {
    console.error("did-fail-load:", { code, desc, url });
  });

  // Set Content Security Policy
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self' ws: wss:; worker-src 'self' blob:;"
        ]
      }
    });
  });

  if (isDev()) {
    const devUrl = process.env.VITE_DEV_SERVER_URL || "http://localhost:5173";
    await mainWindow.loadURL(devUrl);
    // 开发期建议默认打开 DevTools，便于看报错
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    // 打包/production：加载本地 build 出来的页面
    // 你需要确保 vite build 输出到 desktop/dist/renderer/index.html
    const indexHtml = path.join(__dirname, "dist", "renderer", "index.html");
    await mainWindow.loadFile(indexHtml);
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// --- IPC：选择文件夹 ---
ipcMain.handle("select-folder", async () => {
  const res = await dialog.showOpenDialog({
    title: "Select assets folder",
    properties: ["openDirectory"],
  });
  if (res.canceled || !res.filePaths?.[0]) return null;
  const folderPath = res.filePaths[0];
  // 直接返回扫描结果，而不仅仅是路径
  const st = await statSafe(folderPath);
  if (!st || !st.isDirectory()) return null;
  return await scanFolderRecursive(folderPath);
});

// --- IPC: get/set Warcraft III directory ---
ipcMain.handle('get-war3-dir', async () => {
  return war3Dir;
});

ipcMain.handle('get-war3-status', async () => {
  return {
    dir: war3Dir,
    mpqCount: mpqState.gameMpqs.length,
    mpqs: mpqState.gameMpqs.slice(),
    hasMpqs: mpqState.gameMpqs.length > 0,
  };
});

ipcMain.handle('set-war3-dir', async (_evt, dir) => {
  if (typeof dir === 'string' && dir.length > 0) {
    war3Dir = dir;
    saveSettingsSafe();
    refreshGameMpqList();
  }
  return war3Dir;
});

// --- IPC: open W3X/W3M and build an MPQ-backed FolderData ---
ipcMain.handle('select-map', async () => {
  const res = await dialog.showOpenDialog({
    title: 'Open Warcraft 3 Map (w3x/w3m)',
    properties: ['openFile'],
    filters: [
      { name: 'Warcraft 3 Map', extensions: ['w3x', 'w3m'] },
      { name: 'All Files', extensions: ['*'] },
    ],
  });
  if (res.canceled || !res.filePaths?.[0]) return null;

  const mapPath = res.filePaths[0];
  const id = mpqState.nextId++;
  mpqState.archives.set(id, { path: mapPath });
  mpqState.activeMapId = id;

  // Read (listfile) to enumerate contained files if present. If missing, fall back to scanning war3map.* to extract referenced resources.
  let listText = '';
  let hasListfile = false;
  try {
    const buf = await stormReadFileCached(mapPath, '(listfile)');
    // Best-effort decode: UTF-8 first; if it looks broken, try CP936 (GBK).
    const smart = decodeTextSmart(buf);
    if (smart != null) {
      listText = smart;
    } else {
      const gbk = await decodeCp936(buf);
      listText = (gbk ?? buf.toString('latin1'));
    }
    hasListfile = true;
  } catch {
    hasListfile = false;
  }

  let lines = [];
  let extracted = null;
  if (hasListfile) {
    lines = listText.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
    // Even有 listfile，也可能缺少原生模型/贴图路径，补一次扫描以覆盖引用但未列出的资源。
    try {
      extracted = await enumerateMapResourcesNoListfile(mapPath);
    } catch {
      extracted = null;
    }
  } else {
    // No listfile: extract referenced model/texture paths from war3map.* and scripts.
    extracted = await enumerateMapResourcesNoListfile(mapPath);
  }

  const files = [];
  const models = [];
  const seenLower = new Set();
  const addFile = (rel) => {
    // Best-effort cleanup to avoid garbled/malformed paths.
    if (rel == null) return;
    let relStr = String(rel);
    // Drop strings with replacement chars or obvious binary garbage
    if (relStr.includes('\uFFFD')) return;
    // Heuristic: if it contains lots of latin1 high bytes but no CJK, it's likely mojibake from wrong decoding
    if (/[\u0080-\u00FF]/.test(relStr) && !/[\u4E00-\u9FFF]/.test(relStr)) {
      // Keep if it still looks like a plain ASCII path
      if (!/^[\w\-./\\]+\.[A-Za-z0-9]+$/.test(relStr)) return;
    }
    const ext = normalizeExt(relStr);
    if (!MODEL_EXTS.has(ext) && !TEX_EXTS.has(ext)) return;
    const relNorm = relStr.replace(/\\/g, '/').trim();
    if (!relNorm) return;
    const relLower = relNorm.toLowerCase();
    if (seenLower.has(relLower)) return;
    seenLower.add(relLower);
    const abs = `mpq:${id}:${relNorm}`;
    const base = path.posix.basename(relNorm);
    files.push({ abs, rel: relNorm, ext, base });
    if (MODEL_EXTS.has(ext)) models.push(relNorm);
  };

  if (hasListfile) {
    for (const rel of lines) addFile(rel);
  }

  // Merge额外扫描到的资源（弥补 listfile 不全的情况）。
  if (extracted) {
    for (const rel of extracted.models) addFile(rel);
    for (const rel of extracted.textures) addFile(rel);
  }

  files.sort((a, b) => a.rel.localeCompare(b.rel));
  models.sort((a, b) => a.localeCompare(b));

  // If still empty, don't hard-fail. Some protected maps intentionally remove listfile,
  // and may reference models only at runtime. We return an empty list so the UI can
  // still stay responsive.
  if (models.length === 0) {
    console.warn('[select-map] No models found via listfile/imp/war3map scan:', mapPath);
  }

  return { root: `mpq:${id}`, files, models };
});




// --- IPC：选择导出目录 ---
ipcMain.handle("select-export-folder", async () => {
  const res = await dialog.showOpenDialog({
    title: "Select export folder",
    properties: ["openDirectory", "createDirectory"],
  });
  if (res.canceled || !res.filePaths?.[0]) return null;
  return res.filePaths[0];
});

function safeRelPath(p) {
  if (!p || typeof p !== "string") return null;
  // normalize
  const s = p.replace(/\\/g, "/");
  if (s.startsWith("/") || /^[A-Za-z]:\//.test(s)) return null;
  if (s.includes("..")) return null;
  return s;
}

// --- IPC：导出文件（拷贝 src -> outRoot/rel）---
ipcMain.handle("fs:exportFiles", async (_evt, outRoot, items) => {
  try {
    if (!outRoot || typeof outRoot !== "string") return false;
    if (!Array.isArray(items)) return false;

    const st = await statSafe(outRoot);
    if (!st || !st.isDirectory()) {
      // try create
      await fs.promises.mkdir(outRoot, { recursive: true });
    }

    for (const it of items) {
      if (!it || typeof it !== "object") continue;
      const src = it.src;
      const rel = safeRelPath(it.rel);
      if (!src || typeof src !== "string" || !rel) continue;

      const dst = path.join(outRoot, rel);
      await fs.promises.mkdir(path.dirname(dst), { recursive: true });
      await fs.promises.copyFile(src, dst);
    }
    return true;
  } catch (e) {
    return false;
  }
});

// --- IPC：写文件（二进制）---
ipcMain.handle("fs:writeFile", async (_evt, absPath, data) => {
  try {
    if (!absPath || typeof absPath !== "string") return false;
    if (!data) return false;
    const buf = Buffer.from(data);
    await fs.promises.mkdir(path.dirname(absPath), { recursive: true });
    await fs.promises.writeFile(absPath, buf);
    return true;
  } catch (e) {
    return false;
  }
});


// --- IPC：扫描文件夹（递归）---
ipcMain.handle("fs:scanFolder", async (_evt, folderPath) => {
  if (!folderPath || typeof folderPath !== "string") return null;
  const st = await statSafe(folderPath);
  if (!st || !st.isDirectory()) return null;
  return await scanFolderRecursive(folderPath);
});

// --- IPC：读取文件（二进制）---
// renderer 用 ArrayBuffer 接收：new Uint8Array(buffer)
const READ_FILE_CACHE_MAX_BYTES = 512 * 1024 * 1024;
let readFileCacheBytes = 0;
// absPath -> Buffer, Map insertion order is used as LRU
const readFileCache = new Map();

function readFileCacheGet(absPath) {
  const v = readFileCache.get(absPath);
  if (!v) return null;
  // refresh LRU order
  readFileCache.delete(absPath);
  readFileCache.set(absPath, v);
  return v;
}

function readFileCacheSet(absPath, data) {
  if (!data) return;
  const buf = Buffer.isBuffer(data) ? data : Buffer.from(data);
  const existed = readFileCache.get(absPath);
  if (existed) {
    readFileCacheBytes -= existed.length || 0;
    readFileCache.delete(absPath);
  }
  readFileCache.set(absPath, buf);
  readFileCacheBytes += buf.length || 0;

  while (readFileCacheBytes > READ_FILE_CACHE_MAX_BYTES && readFileCache.size) {
    const oldestKey = readFileCache.keys().next().value;
    const oldestVal = readFileCache.get(oldestKey);
    readFileCache.delete(oldestKey);
    readFileCacheBytes -= (oldestVal?.length || 0);
  }
}

ipcMain.handle("read-file", async (_evt, absPath) => {
  if (!absPath || typeof absPath !== "string") return null;
  try {
    const cached = readFileCacheGet(absPath);
    if (cached) return cached;

    // MPQ-backed virtual paths:
    //  - mpq:<id>:<innerPath>
    //  - mpq:auto:<innerPath> (search map MPQ then game MPQs)
    if (absPath.startsWith('mpq:')) {
      const mId = absPath.match(/^mpq:(\d+):(.*)$/);
      if (mId) {
        const id = Number(mId[1]);
	    // 注意：某些旧版本可能会构造出 "mpq:1: <path>"（冒号后有空格）
	    // 这里做一次 trim/normalize，避免找不到文件。
	    const inner = String(mId[2] ?? '').trim();
	    const data = await mpqReadFromChain(inner, id);
	    readFileCacheSet(absPath, data);
	    return readFileCacheGet(absPath) || data;
      }
      const mAuto = absPath.match(/^mpq:auto:(.*)$/);
      if (mAuto) {
	    const inner = String(mAuto[1] ?? '').trim();
	    const data = await mpqReadFromChain(inner, null);
	    readFileCacheSet(absPath, data);
	    return readFileCacheGet(absPath) || data;
      }
      // Unknown mpq scheme
      return null;
    }

    const data = await fs.promises.readFile(absPath);
    // Electron 会把 Buffer 序列化成可传输的 Uint8Array/ArrayBuffer

    readFileCacheSet(absPath, data);
    return data;
  } catch (e) {
    const code = (e && typeof e === 'object' && 'code' in e) ? String(e.code) : '';
    if (code === 'ENOENT') return null;

    // Propagate rich error to renderer (ipcRenderer.invoke will reject), so the UI shows the real reason.
    const msg = (e && typeof e === 'object' && 'message' in e) ? String(e.message) : String(e);
    const stderr = (e && typeof e === 'object' && 'stderr' in e && e.stderr) ? String(e.stderr) : '';
    console.error('[read-file] failed:', absPath, msg, stderr);
    throw new Error(stderr ? `${msg} | ${stderr}` : msg);
  }
});

// --- App lifecycle ---
app.whenReady().then(async () => {
  loadSettingsSafe();
  ensureWar3Dir();
  refreshGameMpqList();
  await createWindow();

  app.on("activate", async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  // macOS 习惯不退出；Windows/Linux 直接退出
  if (process.platform !== "darwin") app.quit();
});
