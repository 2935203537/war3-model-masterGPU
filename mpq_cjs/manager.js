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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const archive_1 = __importDefault(require("./archive"));
const fspromise_1 = __importDefault(require("./fspromise"));
const task_1 = __importDefault(require("../common/task"));
const path = __importStar(require("path"));
class ArchiveManager {
    constructor() {
        this.archives = [];
        this.task = new task_1.default();
        this.isLoading = false;
    }
    async load(mpqFilePath) {
        if (this.isLoading) {
            await this.task;
            return;
        }
        this.isLoading = true;
        const root = path.dirname(mpqFilePath);
        const files = await fspromise_1.default.readDir(root);
        this.archives = await Promise.all(files.filter(v => v.endsWith('.mpq')).map(async (file) => {
            const archive = new archive_1.default(path.basename(file));
            await archive.load(path.resolve(root, file));
            return archive;
        }));
        this.task.resolve(true);
    }
    async get(name) {
        for (let i = 0; i < this.archives.length; i++) {
            const ret = await this.archives[i].get(name);
            if (ret) {
                return ret;
            }
        }
        return null;
    }
    async getAll(name) {
        const rets = [];
        for (let i = 0; i < this.archives.length; i++) {
            const ret = await this.archives[i].get(name);
            if (ret) {
                rets.push(ret);
            }
        }
        return rets;
    }
}
exports.default = ArchiveManager;
// const archive = new ArchiveManager();
// archive.load("/mnt/d/Program Files (x86)/dzclient/Game/Warcraft III Frozen Throne/war3.mpq").then(async () => {
//     const buf = await archive.get('replaceabletextures\\teamcolor\\teamcolor00.blp');
//     console.info(buf);
// });
