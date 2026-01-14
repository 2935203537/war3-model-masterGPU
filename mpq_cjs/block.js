"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_zlib_1 = require("node:zlib");
const explode_1 = __importDefault(require("./explode"));
const huffman_1 = __importDefault(require("./huffman"));
const adpcm_1 = __importDefault(require("./adpcm"));
const constants_1 = require("./constants");
/**
 * A block.
 */
class Block {
    constructor() {
        this.offset = 0;
        this.compressedSize = 0;
        this.normalSize = 0;
        this.flags = 0;
    }
    load(bytes) {
        this.offset = bytes[0];
        this.compressedSize = bytes[1];
        this.normalSize = bytes[2];
        this.flags = bytes[3];
    }
    save(bytes) {
        bytes[0] = this.offset;
        bytes[1] = this.compressedSize;
        bytes[2] = this.normalSize;
        bytes[3] = this.flags;
    }
    decode(name, data, archive) {
        const c = archive.c;
        const encryptionKey = c.computeFileKey(name, this);
        const flags = this.flags;
        if (flags === constants_1.FILE_EXISTS) {
            return data.slice(0, this.normalSize);
        }
        if (flags & constants_1.FILE_SINGLE_UNIT) {
            // One buffer of possibly encrypted and/or compressed data.
            // Read the sector
            let sector;
            // If this block is encrypted, decrypt the sector.
            if (flags & constants_1.FILE_ENCRYPTED) {
                sector = c.decryptBlock(data.slice(0, this.compressedSize), encryptionKey);
            }
            else {
                sector = data.subarray(0, this.compressedSize);
            }
            // If this block is compressed, decompress the sector.
            // Otherwise, copy the sector as-is.
            if (flags & constants_1.FILE_COMPRESSED) {
                sector = this.decompressSector(name, sector, this.normalSize);
            }
            return sector;
        }
        // One or more sectors of possibly encrypted and/or compressed data.
        const sectorCount = Math.ceil(this.normalSize / archive.sectorSize);
        // Alocate a buffer for the uncompressed block size
        const out = [];
        // const buffer = new Uint8Array(this.normalSize);
        // Get the sector offsets
        let sectorOffsets = new Uint32Array(data.buffer, 0, sectorCount + 1);
        // If this file is encrypted, copy the sector offsets and decrypt them.
        if (flags & constants_1.FILE_ENCRYPTED) {
            sectorOffsets = c.decryptBlock(sectorOffsets.slice(), encryptionKey - 1);
        }
        let start = sectorOffsets[0];
        let end = sectorOffsets[1];
        let offset = 0;
        for (let i = 0; i < sectorCount; i++) {
            let sector;
            // If this file is encrypted, copy the sector and decrypt it.
            // Otherwise a view can be used directly.
            if (flags & constants_1.FILE_ENCRYPTED) {
                sector = c.decryptBlock(data.slice(start, end), encryptionKey + i);
            }
            else {
                sector = data.subarray(start, end);
            }
            // Decompress the sector
            if (flags & constants_1.FILE_COMPRESSED) {
                let uncompressedSize = archive.sectorSize;
                // If this is the last sector, its uncompressed size might not be the size of a sector.
                if (this.normalSize - offset < uncompressedSize) {
                    uncompressedSize = this.normalSize - offset;
                }
                sector = this.decompressSector(name, sector, uncompressedSize);
            }
            // Some sectors have this flags instead of the compression flag + algorithm byte.
            if (flags & constants_1.FILE_IMPLODE) {
                sector = (0, explode_1.default)(sector);
            }
            // Add the sector bytes to the buffer
            // buffer.set(sector, offset);
            out.push(sector);
            offset += sector.byteLength;
            // Prepare for the next sector
            if (i < sectorCount) {
                start = end;
                end = sectorOffsets[i + 2];
            }
        }
        function merge(arrays) {
            // 计算新数组的总长度
            const totalLength = arrays.reduce((acc, curr) => acc + curr.length, 0);
            // 创建新的 Uint8Array 对象
            const mergedArray = new Uint8Array(totalLength);
            // 将原始数组的内容复制到新数组中
            let offset = 0;
            for (let i = 0; i < arrays.length; i++) {
                mergedArray.set(arrays[i], offset);
                offset += arrays[i].length;
            }
            // 返回合并后的数组
            return mergedArray;
        }
        return merge(out);
    }
    decompressSector(name, bytes, decompressedSize) {
        // If the size of the data is the same as its decompressed size, it's not compressed.
        if (bytes.byteLength === decompressedSize) {
            return bytes;
        }
        else {
            const compressionMask = bytes[0];
            if (compressionMask & constants_1.COMPRESSION_BZIP2) {
                throw new Error(`File ${name}: compression type 'bzip2' not supported`);
            }
            if (compressionMask & constants_1.COMPRESSION_IMPLODE) {
                try {
                    bytes = (0, explode_1.default)(bytes.subarray(1));
                }
                catch (e) {
                    throw new Error(`File ${name}: failed to decompress with 'explode': ${e}`);
                }
            }
            if (compressionMask & constants_1.COMPRESSION_DEFLATE) {
                try {
                    // MPQ uses a zlib/deflate stream. Most files are zlib-wrapped, but some
                    // archives contain raw-deflate. Try zlib first, then fall back to raw.
                    const payload = Buffer.from(bytes.subarray(1));
                    try {
                        bytes = new Uint8Array((0, node_zlib_1.inflateSync)(payload));
                    }
                    catch {
                        bytes = new Uint8Array((0, node_zlib_1.inflateRawSync)(payload));
                    }
                }
                catch (e) {
                    throw new Error(`File ${name}: failed to decompress with 'zlib': ${e}`);
                }
            }
            if (compressionMask & constants_1.COMPRESSION_HUFFMAN) {
                try {
                    bytes = (0, huffman_1.default)(bytes.subarray(1));
                }
                catch (e) {
                    throw new Error(`File ${name}: failed to decompress with 'huffman': ${e}`);
                }
                // throw new Error(`File ${name}: compression type 'huffman' not supported`);
            }
            if (compressionMask & constants_1.COMPRESSION_ADPCM_STEREO) {
                try {
                    bytes = (0, adpcm_1.default)(bytes, 2, decompressedSize);
                }
                catch (e) {
                    console.error(e);
                    throw new Error(`File ${name}: compression type 'adpcm stereo' not supported`);
                }
            }
            if (compressionMask & constants_1.COMPRESSION_ADPCM_MONO) {
                try {
                    bytes = (0, adpcm_1.default)(bytes, 1, decompressedSize);
                }
                catch (e) {
                    console.error(e);
                    throw new Error(`File ${name}: compression type 'adpcm mono' not supported`);
                }
            }
            return bytes;
        }
    }
}
exports.default = Block;
