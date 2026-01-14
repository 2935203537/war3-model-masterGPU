"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeAudioData = decodeAudioData;
let audioContext;
// Some browsers don't have OfflineAudioContext or AudioContext.
if (typeof OfflineAudioContext === 'function') {
    audioContext = new OfflineAudioContext(1, 1, 48000);
}
/**
 * A context-less decodeAudioData().
 */
function decodeAudioData(buffer) {
    if (audioContext) {
        return audioContext.decodeAudioData(buffer);
    }
}
