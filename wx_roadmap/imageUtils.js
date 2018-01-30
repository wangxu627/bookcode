const Jimp = require("jimp");

function saveImage(path, dest) {
    return new Promise((resolve, reject) => {
        Jimp.read(path, (err, image) => {
            if(err) {
                return reject(err);
            }
            image.exifRotate().write(dest, (_err, image) => {
                if(_err) {
                    return reject(_err);
                }
                return resolve();
            });
        });
    });
}

function getImageSize(path) {
    return new Promise((resolve, reject) => {
        Jimp.read(path, (err, image) => {
            if(err) {
                return reject(err);
            }
            return resolve({width : image.bitmap.width, height : image.bitmap.height});
        });
    });
}

function resizeImage(path, width, height, dest) {
    return new Promise((resolve, reject) => {
        Jimp.read(path, (err, image) => {
            if(err) {
                return reject(err);
            }
            image.resize(width, height).write(dest, (_err, image) => {
                if(_err) {
                    return reject(_err);
                }
                return resolve();
            });
        });
    });
}

function thumbImage(path, width, height, dest, quality) {
    return new Promise((resolve, reject) => {
        Jimp.read(path, (err, image) => {
            if(err) {
                return reject(err);
            }
            if(image.bitmap.width < image.bitmap.height) {
                let sacledHeight = (width * image.bitmap.height) / image.bitmap.width;
                image.resize(width, Jimp.AUTO).crop(0, (image.bitmap.height - sacledHeight) / 2, width, height);
            } else {
                let sacledWidth = (height * image.bitmap.width) / image.bitmap.height;
                image.resize(Jimp.AUTO, height).crop((image.bitmap.width - sacledWidth) / 2, 0, width, height);
            }
            image.write(dest, (_err, _image) => {
                if(_err) {
                    return reject(_err);
                }
                return resolve();
            });
        });
    });
}

module.exports = {
    saveImage : saveImage,
    resizeImage : resizeImage,
    getImageSize : getImageSize,
    thumbImage : thumbImage,
}