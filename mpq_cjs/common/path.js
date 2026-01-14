"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basename = basename;
exports.extname = extname;
exports.name = name;
/**
 * Returns the base name of a file path.
 *
 * Path/To/My/File.ext => File.ext
 */
function basename(path) {
    if (path && path.length) {
        let index = path.lastIndexOf('/');
        if (index !== -1) {
            path = path.slice(index + 1);
        }
        index = path.lastIndexOf('\\');
        if (index !== -1) {
            path = path.slice(index + 1);
        }
        return path;
    }
    return '';
}
/**
 * Returns the extension name of a file path.
 *
 * Path/To/My/File.ext => .ext
 */
function extname(path) {
    if (path && path.length) {
        let index = path.lastIndexOf('.');
        if (index !== -1) {
            path = path.slice(index).toLowerCase();
        }
        return path;
    }
    return '';
}
/**
 * Returns the base name of a file path without the extension.
 *
 * Path/To/My/File.ext => File
 */
function name(path) {
    path = basename(path);
    let index = path.lastIndexOf('.');
    if (index !== -1) {
        path = path.slice(0, index);
    }
    return path;
}
