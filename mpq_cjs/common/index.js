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
const glMatrix = __importStar(require("gl-matrix"));
const glMatrixAddon = __importStar(require("./gl-matrix-addon"));
const math = __importStar(require("./math"));
const canvas = __importStar(require("./canvas"));
const binarystream_1 = __importDefault(require("./binarystream"));
const bitstream_1 = __importDefault(require("./bitstream"));
const urlwithparams_1 = __importDefault(require("./urlwithparams"));
const path = __importStar(require("./path"));
const isformat_1 = require("./isformat");
exports.default = {
    glMatrix,
    glMatrixAddon,
    math,
    canvas,
    BinaryStream: binarystream_1.default,
    BitStream: bitstream_1.default,
    urlWithParams: urlwithparams_1.default,
    path,
    isPng: isformat_1.isPng,
    isJpeg: isformat_1.isJpeg,
    isGif: isformat_1.isGif,
    isWebP: isformat_1.isWebP,
};
