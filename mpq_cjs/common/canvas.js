"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blobToImage = blobToImage;
exports.blobToImageData = blobToImageData;
exports.imageDataToBlob = imageDataToBlob;
exports.imageDataToDataUrl = imageDataToDataUrl;
exports.imageDataToImage = imageDataToImage;
exports.imageToImageData = imageToImageData;
exports.resizeImageData = resizeImageData;
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const canvas2 = document.createElement('canvas');
const ctx2 = canvas2.getContext('2d');
function blobToImage(blob) {
    return new Promise((resolve) => {
        let url = URL.createObjectURL(blob);
        let image = new Image();
        image.onload = () => {
            resolve(image);
        };
        image.onerror = () => {
            resolve(image);
        };
        image.src = url;
    });
}
function blobToImageData(blob) {
    return new Promise((resolve, reject) => {
        let url = URL.createObjectURL(blob);
        let image = new Image();
        image.onload = () => {
            URL.revokeObjectURL(url);
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            resolve(ctx.getImageData(0, 0, image.width, image.height));
        };
        image.onerror = (e) => {
            reject(e);
        };
        image.src = url;
    });
}
function imageDataToBlob(imageData) {
    return new Promise((resolve) => {
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        ctx.putImageData(imageData, 0, 0);
        canvas.toBlob((blob) => {
            resolve(blob);
        });
    });
}
function imageDataToDataUrl(imageData) {
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
}
function imageDataToImage(imageData) {
    let image = new Image();
    image.src = imageDataToDataUrl(imageData);
    return image;
}
function imageToImageData(image) {
    let width = image.width;
    let height = image.height;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0);
    return ctx.getImageData(0, 0, width, height);
}
function resizeImageData(data, width, height) {
    if (data instanceof ImageData) {
        canvas.width = data.width;
        canvas.height = data.height;
        ctx.putImageData(data, 0, 0);
        canvas2.width = width;
        canvas2.height = height;
        ctx2.drawImage(canvas, 0, 0, width, height);
        return ctx2.getImageData(0, 0, width, height);
    }
    else {
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(data, 0, 0, width, height);
        return ctx.getImageData(0, 0, width, height);
    }
}
