"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchHeader = searchHeader;
exports.isArchive = isArchive;
const fs = __importStar(require("fs"));
/**
 * Search for the MPQ header - 'MPQ\x1A'.
 *
 * Notes:
 * - Some MPQ archives begin with a user data header ('MPQ\x1B') that points to the real MPQ header.
 * - The real MPQ header is aligned on 512-byte boundaries.
 *
 * This function returns the byte offset of the MPQ header, or -1 if not found.
 */
function searchHeader(fd, fileSize) {
    // First: try to detect a user data header at offset 0.
    // Format (StormLib / common docs):
    //   0x00: char[4]  'MPQ\x1B'
    //   0x04: uint32   userDataSize
    //   0x08: uint32   mpqHeaderOffset
    //   0x0C: uint32   userDataHeaderSize
    // If present, mpqHeaderOffset points to the actual 'MPQ\x1A' header.
    try {
        if (fileSize >= 16) {
            const hdr = Buffer.alloc(16);
            fs.readSync(fd, hdr, 0, 16, 0);
            if (hdr[0] === 77 && hdr[1] === 80 && hdr[2] === 81 && hdr[3] === 27) {
                const mpqHeaderOffset = hdr.readUInt32LE(8);
                if (mpqHeaderOffset >= 0 && mpqHeaderOffset + 4 <= fileSize) {
                    const sig = Buffer.alloc(4);
                    fs.readSync(fd, sig, 0, 4, mpqHeaderOffset);
                    if (sig[0] === 77 && sig[1] === 80 && sig[2] === 81 && sig[3] === 26) {
                        return mpqHeaderOffset;
                    }
                }
            }
        }
    }
    catch {
        // ignore and fall back to scanning
    }
    // Fallback: scan 512-aligned offsets for 'MPQ\x1A'.
    const buf = Buffer.alloc(4);
    // Many real-world MPQs place the header within the first couple of MB.
    // Scan up to 4096 * 512 = 2MB, or the whole file if smaller.
    const maxBlocks = Math.min(Math.ceil(fileSize / 512), 4096);
    for (let i = 0; i < maxBlocks; i++) {
        const base = i * 512;
        fs.readSync(fd, buf, 0, 4, base);
        if (buf[0] === 77 && buf[1] === 80 && buf[2] === 81 && buf[3] === 26) {
            return base;
        }
    }
    return -1;
}
/**
 * Checks whether the given buffer is either a Warcraft 3 map or otherwise a generic MPQ archive.
 */
function isArchive(bytes) {
    // Check for the map identifier - HM3W
    if (bytes[0] === 72 && bytes[1] === 77 && bytes[2] === 51 && bytes[3] === 87) {
        return true;
    }
    // Otherwise, require a real MPQ header signature in the buffer.
    // We can't scan the whole file here, but this protects against treating random files as archives.
    return bytes[0] === 77 && bytes[1] === 80 && bytes[2] === 81 && bytes[3] === 26;
}
