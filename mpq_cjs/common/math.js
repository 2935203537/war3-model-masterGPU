"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.degToRad = degToRad;
exports.radToDeg = radToDeg;
exports.randomInRange = randomInRange;
exports.clamp = clamp;
exports.lerp = lerp;
exports.hermite = hermite;
exports.bezier = bezier;
exports.copysign = copysign;
exports.powerOfTwo = powerOfTwo;
exports.isPowerOfTwo = isPowerOfTwo;
/**
 * Convert from degrees to radians.
 */
function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}
/**
 * Convert from radians to degrees.
 */
function radToDeg(radians) {
    return radians * (180 / Math.PI);
}
/**
 * Gets a random number between a range.
 */
function randomInRange(a, b) {
    return a + Math.random() * (b - a);
}
/**
 * Clamp a number in a range.
 */
function clamp(x, minVal, maxVal) {
    return Math.min(Math.max(x, minVal), maxVal);
}
/**
 * Linear interpolation.
 */
function lerp(a, b, t) {
    return a + t * (b - a);
}
/**
 * Hermite interpolation.
 */
function hermite(a, b, c, d, t) {
    let factorTimes2 = t * t;
    let factor1 = factorTimes2 * (2 * t - 3) + 1;
    let factor2 = factorTimes2 * (t - 2) + t;
    let factor3 = factorTimes2 * (t - 1);
    let factor4 = factorTimes2 * (3 - 2 * t);
    return (a * factor1) + (b * factor2) + (c * factor3) + (d * factor4);
}
/**
 * Bezier interpolation.
 */
function bezier(a, b, c, d, t) {
    let invt = 1 - t;
    let factorTimes2 = t * t;
    let inverseFactorTimesTwo = invt * invt;
    let factor1 = inverseFactorTimesTwo * invt;
    let factor2 = 3 * t * inverseFactorTimesTwo;
    let factor3 = 3 * factorTimes2 * invt;
    let factor4 = factorTimes2 * t;
    return (a * factor1) + (b * factor2) + (c * factor3) + (d * factor4);
}
/**
 * Copies the sign of one number onto another.
 */
function copysign(x, y) {
    let signy = Math.sign(y);
    if (signy === 0) {
        return 0;
    }
    let signx = Math.sign(x);
    if (signx !== signy) {
        return -x;
    }
    return x;
}
/**
 * Gets the closest power of two bigger or equal to the given number.
 */
function powerOfTwo(x) {
    x--;
    x |= x >> 1;
    x |= x >> 2;
    x |= x >> 4;
    x |= x >> 8;
    x |= x >> 16;
    x++;
    return x;
}
/**
 * Is this number a power of two?
 */
function isPowerOfTwo(x) {
    if (x === 0) {
        return false;
    }
    return ((x & (x - 1)) === 0);
}
