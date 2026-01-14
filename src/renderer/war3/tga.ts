/*
  Minimal TGA (Targa) decoder for common Warcraft III pipelines.
  Supports:
  - Image type 2 (uncompressed true-color)
  - Image type 10 (RLE true-color)
  - 24/32 bpp
*/

export function decodeTGA(bytes: Uint8Array): ImageData {
  const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const idLength = dv.getUint8(0);
  const colorMapType = dv.getUint8(1);
  const imageType = dv.getUint8(2);

  if (colorMapType !== 0) {
    throw new Error('TGA colormap not supported');
  }
  if (imageType !== 2 && imageType !== 10) {
    throw new Error(`Unsupported TGA image type: ${imageType}`);
  }

  const width = dv.getUint16(12, true);
  const height = dv.getUint16(14, true);
  const bpp = dv.getUint8(16);
  const descriptor = dv.getUint8(17);

  if (bpp !== 24 && bpp !== 32) {
    throw new Error(`Unsupported TGA bpp: ${bpp}`);
  }

  const originTop = (descriptor & 0x20) !== 0;

  let offset = 18 + idLength;
  const pixelCount = width * height;
  const out = new Uint8ClampedArray(pixelCount * 4);

  const readPixel = (srcIndex: number, dstIndex: number) => {
    const b = bytes[srcIndex + 0];
    const g = bytes[srcIndex + 1];
    const r = bytes[srcIndex + 2];
    const a = bpp === 32 ? bytes[srcIndex + 3] : 255;
    out[dstIndex + 0] = r;
    out[dstIndex + 1] = g;
    out[dstIndex + 2] = b;
    out[dstIndex + 3] = a;
  };

  if (imageType === 2) {
    const bytesPerPixel = bpp >> 3;
    for (let i = 0; i < pixelCount; i++) {
      const src = offset + i * bytesPerPixel;
      const x = i % width;
      const y = (i / width) | 0;
      const yy = originTop ? y : (height - 1 - y);
      const dst = (yy * width + x) * 4;
      readPixel(src, dst);
    }
  } else {
    // RLE
    const bytesPerPixel = bpp >> 3;
    let i = 0;
    while (i < pixelCount) {
      const packet = bytes[offset++];
      const count = (packet & 0x7f) + 1;
      const isRLE = (packet & 0x80) !== 0;

      if (isRLE) {
        const src = offset;
        offset += bytesPerPixel;
        for (let c = 0; c < count; c++) {
          const x = i % width;
          const y = (i / width) | 0;
          const yy = originTop ? y : (height - 1 - y);
          const dst = (yy * width + x) * 4;
          readPixel(src, dst);
          i++;
        }
      } else {
        for (let c = 0; c < count; c++) {
          const src = offset;
          offset += bytesPerPixel;
          const x = i % width;
          const y = (i / width) | 0;
          const yy = originTop ? y : (height - 1 - y);
          const dst = (yy * width + x) * 4;
          readPixel(src, dst);
          i++;
        }
      }
    }
  }

  return new ImageData(out, width, height);
}
