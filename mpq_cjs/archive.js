"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typecast_1 = require("./common/typecast");
const blocktable_1 = __importDefault(require("./blocktable"));
const crypto_1 = __importDefault(require("./crypto"));
const hashtable_1 = __importDefault(require("./hashtable"));
const isarchive_1 = require("./isarchive");
const fspromise_1 = __importDefault(require("./fspromise"));
/**
 * MoPaQ archive (MPQ) version 0.
 */
class MpqArchive {
    static getByPath(mpqFilePath) {
        const cached = this.cache.get(mpqFilePath);
        if (cached) {
            return cached;
        }
        const archive = new MpqArchive(mpqFilePath);
        archive.promise = archive.load(mpqFilePath);
        this.cache.set(mpqFilePath, archive);
        return archive;
    }
    constructor(name) {
        this.readonly = false;
        this.name = name;
        this.headerOffset = 0;
        this.sectorSize = 4096;
        this.c = new crypto_1.default();
        this.hashTable = new hashtable_1.default(this.c);
        this.blockTable = new blocktable_1.default(this.c);
    }
    /**
     * Load an existing archive.
     *
     * Note that this clears the archive from whatever it had in it before.
     */
    async load(mpqFilePath, readonly = false) {
        const fd = await fspromise_1.default.open(mpqFilePath, "r");
        this.fd = fd;
        const stat = await fspromise_1.default.stat(mpqFilePath);
        this.readonly = readonly;
        // let fileSize = buffer.byteLength;
        let headerOffset = (0, isarchive_1.searchHeader)(fd, stat.size);
        if (headerOffset === -1) {
            throw new Error('No MPQ header');
        }
        const buf = Buffer.alloc(8 * 4);
        await fspromise_1.default.read(fd, buf, 0, buf.length, headerOffset);
        // Read the header.
        let uint32array = new Uint32Array(buf.valueOf().buffer);
        // let headerSize = uint32array[1];
        // let archiveSize = uint32array[2];
        let formatVersionSectorSize = uint32array[3];
        // let formatVersion = formatVersionSectorSize & 0x0000FFFF;
        let hashPos = (0, typecast_1.numberToUint32)(uint32array[4] + headerOffset); // Whoever thought of MoonLight, clever!
        let blockPos = (0, typecast_1.numberToUint32)(uint32array[5] + headerOffset);
        let hashSize = uint32array[6];
        let blockSize = uint32array[7];
        // There can only be as many or less blocks as there are hashes.
        // Therefore, if the file is reporting too many blocks, cap the actual blocks read to the amount of hashes.
        if (blockSize > hashSize) {
            blockSize = hashSize;
        }
        this.headerOffset = headerOffset;
        this.sectorSize = 512 * (1 << (formatVersionSectorSize >>> 16)); // Generally 4096
        // Read the hash table.
        // Also clears any existing entries.
        // Have to copy the data, because hashPos is not guaranteed to be a multiple of 4.
        const hashTableBuf = Buffer.alloc(hashSize * 16);
        await fspromise_1.default.read(fd, hashTableBuf, 0, hashSize * 16, hashPos);
        this.hashTable.load(hashTableBuf.valueOf());
        // Read the block table.
        // Also clears any existing entries.
        // Have to copy the data, because blockPos is not guaranteed to be a multiple of 4.
        const blockTableBuf = Buffer.alloc(blockSize * 16);
        await fspromise_1.default.read(fd, blockTableBuf, 0, blockSize * 16, blockPos);
        this.blockTable.load(blockTableBuf.valueOf());
    }
    has(name) {
        const hash = this.hashTable.get(name);
        if (!hash) {
            return false;
        }
        const block = this.blockTable.entries[hash.blockIndex];
        if (!block) {
            return false;
        }
        return true;
    }
    async get(name) {
        const hash = this.hashTable.get(name);
        if (!hash) {
            return null;
        }
        const block = this.blockTable.entries[hash.blockIndex];
        if (!block) {
            return null;
        }
        // 空文件
        if (block.compressedSize === 0) {
            return new Uint8Array(0);
        }
        const blpBuffer = Buffer.alloc(block.compressedSize);
        await fspromise_1.default.read(this.fd, blpBuffer, 0, blpBuffer.length, this.headerOffset + block.offset);
        return block.decode(name, new Uint8Array(blpBuffer), this);
    }
}
MpqArchive.cache = new Map();
exports.default = MpqArchive;
