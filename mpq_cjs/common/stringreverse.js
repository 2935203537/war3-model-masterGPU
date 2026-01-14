"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = reverse;
/**
 * Reverses a string.
 */
function reverse(s) {
    return [...s].reverse().join('');
}
