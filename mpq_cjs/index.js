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
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const child_process = __importStar(require("child_process"));
const manager_1 = __importDefault(require("./manager"));
const REG_PATH = 'HKCU\\Software\\Blizzard Entertainment\\Warcraft III';
class MpqManager {
    static get instance() {
        if (!MpqManager.hasInit) {
            MpqManager.hasInit = true;
            MpqManager.create();
        }
        return MpqManager._mpqManager;
    }
    static create() {
        this._mpqManager = new manager_1.default();
        const data = vscode.workspace.getConfiguration("blpPreview");
        if (data && data.mpqLocation) {
            if (fs.existsSync(data.mpqLocation)) {
                this._mpqManager.load(data.mpqLocation).catch(e => {
                    this._mpqManager = null;
                    console.error(e);
                    vscode.window.showErrorMessage("mpq location is not a mpq file!");
                });
            }
        }
        else {
            child_process.exec(`reg query "${REG_PATH}" /v "InstallPath"`, (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    return;
                }
                const match = stdout.match(/InstallPath\s+REG_SZ\s+([^\r\n]+)/);
                if (match) {
                    const path = match[1];
                    const mpqPath = path + '\\war3.mpq';
                    if (fs.existsSync(mpqPath)) {
                        this._mpqManager.load(mpqPath).catch(e => {
                            this._mpqManager = null;
                            console.error(e);
                            vscode.window.showErrorMessage("mpq location is not a mpq file!");
                        });
                    }
                }
            });
        }
    }
}
MpqManager.hasInit = false;
exports.default = MpqManager;
