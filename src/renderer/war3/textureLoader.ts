import { decodeBLP, getBLPImageData } from 'war3-model';
import { parseHeaders, decodeDds } from 'dds-parser';
import type { ModelRenderer } from 'war3-model';
import { decodeTGA } from './tga';

const CLEANUP_NAME_REGEXP = /^(?:.*\\|.*\/)?([^\\/]+)$/;

const DECODE_CACHE_MAX_BYTES = 512 * 1024 * 1024;
let decodeCacheBytes = 0;
// key -> { bytes: number, kind, payload }
const decodeCache = new Map<string, { bytes: number; kind: 'mipmaps' | 'image' | 'gpuCompressed'; payload: any }>();

function decodeCacheGet(key: string) {
  const v = decodeCache.get(key);
  if (!v) return null;
  decodeCache.delete(key);
  decodeCache.set(key, v);
  return v;
}

function decodeCacheSet(key: string, entry: { bytes: number; kind: 'mipmaps' | 'image' | 'gpuCompressed'; payload: any }) {
  const existed = decodeCache.get(key);
  if (existed) {
    decodeCacheBytes -= existed.bytes;
    decodeCache.delete(key);
  }
  decodeCache.set(key, entry);
  decodeCacheBytes += entry.bytes;
  while (decodeCacheBytes > DECODE_CACHE_MAX_BYTES && decodeCache.size) {
    const oldestKey = decodeCache.keys().next().value as string;
    const oldestVal = decodeCache.get(oldestKey);
    decodeCache.delete(oldestKey);
    decodeCacheBytes -= oldestVal?.bytes || 0;
  }
}

export type FileIndex = {
  root: string;
  byRelLower: Map<string, string>; // rel(lower) => abs
  byBaseLower: Map<string, string>; // filename(lower) => abs
};

export function normalizeModelPath(p: string): string {
  return p.replace(/\\/g, '/');
}

export function resolveTextureAbs(textureImage: string, modelAbs: string, idx: FileIndex): string | null {
  const normalized = normalizeModelPath(textureImage);
  // Try relative path inside root
  const relAttempt = normalizeModelPath(normalized).toLowerCase();
  const absByRel = idx.byRelLower.get(relAttempt);
  if (absByRel) return absByRel;

  // Try "modelDir + textureImage"
  const modelDir = normalizeModelPath(modelAbs).split('/').slice(0, -1).join('/');
  const joined = (modelDir ? modelDir + '/' : '') + normalized;
  const relFromRoot = joined.startsWith(normalizeModelPath(idx.root))
    ? normalizeModelPath(joined).slice(normalizeModelPath(idx.root).length + 1)
    : null;
  if (relFromRoot) {
    const abs = idx.byRelLower.get(relFromRoot.toLowerCase());
    if (abs) return abs;
  }

  // Fallback by basename
  const base = normalized.replace(CLEANUP_NAME_REGEXP, '$1').toLowerCase();
  const absByBase = idx.byBaseLower.get(base);
  if (absByBase) return absByBase;


  // Do not force MPQ lookup for Reforged HD virtual paths in classic installs.
  // Also, war3mapImported/* usually lives inside the map archive or alongside the model, not in game MPQs.
  const nLower = normalized.toLowerCase();
  if (nLower.startsWith('_hd.w3mod:') || nLower.startsWith('war3mapimported/')) {
    return null;
  }

  // MPQ mode fallback: if we're viewing an MPQ-backed "folder", we can still attempt
  // to load the texture directly from the MPQ chain even if it wasn't indexed.
  // The main process will interpret "mpq:auto:<path>" and try map MPQ first, then game MPQs.
  if (idx.root.startsWith('mpq:')) {
    return `mpq:auto:${normalized}`;
  }

  // Extra fallback: even when browsing local folders, try resolving to game MPQs so
  // built-in textures (Shockwave/GenericGlow etc.) can still be found.
  return `mpq:auto:${normalized}`;
}


function makeFallbackMipmaps(): any[] {
  // 1x1 fully transparent pixel.
  const data = new Uint8ClampedArray([0, 0, 0, 0]);
  // ImageDataLike matches war3-model expectations in browser.
  // @ts-ignore
  return [typeof ImageData !== 'undefined' ? new ImageData(data, 1, 1) : { width: 1, height: 1, data, colorSpace: 'srgb' }];
}


export type TextureSupport = {
  hasGPUBC: boolean;
};

export async function loadTextureIntoRenderer(
  renderer: ModelRenderer,
  textureImage: string,
  absPath: string,
  bytes: Uint8Array,
  support: TextureSupport,
): Promise<void> {
  const cacheKey = `${absPath}|gpuBC:${support.hasGPUBC ? 1 : 0}`;
  const cached = decodeCacheGet(cacheKey);
  if (cached) {
    if (cached.kind === 'mipmaps') {
      renderer.setTextureImageData(textureImage, cached.payload);
      return;
    }
    if (cached.kind === 'image') {
      renderer.setTextureImageData(textureImage, [cached.payload]);
      return;
    }
    if (cached.kind === 'gpuCompressed' && (renderer as any).setGPUTextureCompressedImage) {
      const { gpuFormat, array, dds } = cached.payload;
      (renderer as any).setGPUTextureCompressedImage(textureImage, gpuFormat, array, dds);
      return;
    }
  }

  const lower = absPath.toLowerCase();
  if (lower.endsWith('.blp')) {
    const blp = decodeBLP(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));

    // Some BLPs report mipmap slots beyond the last valid 1x1 level.
    // Creating ImageData with 0 width/height throws on Chromium.
    const mipmaps: any[] = [];
    for (let i = 0; i < blp.mipmaps.length; i++) {
      const w = blp.width >> i;
      const h = blp.height >> i;
      if (w <= 0 || h <= 0) break;
      try {
        mipmaps.push(getBLPImageData(blp, i));
      } catch (e) {
        // If a higher mip level is malformed, stop at the last good level.
        break;
      }
    }

    const out = mipmaps.length ? mipmaps : makeFallbackMipmaps();
    decodeCacheSet(cacheKey, {
      bytes: (bytes.byteLength || 0),
      kind: 'mipmaps',
      payload: out,
    });
    renderer.setTextureImageData(textureImage, out);
    return;
  }

  if (lower.endsWith('.dds')) {
    const array = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
    const dds = parseHeaders(array);

    let gpuFormat: GPUTextureFormat | undefined;
    if (support.hasGPUBC) {
      if (dds.format === 'dxt1') gpuFormat = 'bc1-rgba-unorm';
      else if (dds.format === 'dxt3') gpuFormat = 'bc2-rgba-unorm';
      else if (dds.format === 'dxt5') gpuFormat = 'bc3-rgba-unorm';
      else if (dds.format === 'ati2') gpuFormat = 'bc5-rg-unorm';
    }

    if (gpuFormat && (renderer as any).setGPUTextureCompressedImage) {
      (renderer as any).setGPUTextureCompressedImage(textureImage, gpuFormat, array, dds);
      decodeCacheSet(cacheKey, {
        bytes: (bytes.byteLength || 0),
        kind: 'gpuCompressed',
        payload: { gpuFormat, array, dds },
      });
      return;
    }

    // Fallback: decode to RGBA mip chain
    const uint8 = new Uint8Array(array);
    const images = dds.images
      .filter(img => img.shape.width > 0 && img.shape.height > 0)
      .map(img => {
        const src = uint8.slice(img.offset, img.offset + img.length);
        const rgba = decodeDds(src, dds.format, img.shape.width, img.shape.height);
        return new ImageData(new Uint8ClampedArray(rgba), img.shape.width, img.shape.height);
      });

    decodeCacheSet(cacheKey, {
      bytes: (bytes.byteLength || 0),
      kind: 'mipmaps',
      payload: images,
    });
    renderer.setTextureImageData(textureImage, images);
    return;
  }

  if (lower.endsWith('.tga')) {
    const img = decodeTGA(bytes);
    decodeCacheSet(cacheKey, {
      bytes: (bytes.byteLength || 0),
      kind: 'image',
      payload: img,
    });
    renderer.setTextureImageData(textureImage, [img]);
    return;
  }

  // Generic images (png/jpg/webp)
  const blob = new Blob([bytes]);
  const url = URL.createObjectURL(blob);
  try {
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Image decode failed'));
      img.src = url;
    });
    renderer.setTextureImage(textureImage, img);
  } finally {
    URL.revokeObjectURL(url);
  }
}
