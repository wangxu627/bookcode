var gm = require("gm");

function saveImage(path, dest) {
    return new Promise((resolve, reject) => {
        gm(path).autoOrient().write(dest, (err) => {
            if(err) {
                return reject(err);
            }
            return resolve();
        });
    });
}

function getImageSize(path) {
    return new Promise((resolve, reject) => {
        gm(path).size((err, value) => {
            if(err) {
                return reject(err);
            }
            return resolve(value);
        });
    });
}

function resizeImage(path, width, height, dest) {
    return new Promise((resolve, reject) => {
        gm(path).resize(width, height).write(dest, (err) => {
            if(err) {
                return reject(err);
            }
            return resolve();
        });
    });
}

function thumbImage(path, width, height, dest, quality) {
    return new Promise((resolve, reject) => {
        gm(path).thumb(width, width, dest, quality, (err, stdout, stderr, command)=>{
            if (err) {
                return reject(err);
            }
            return resolve({stdout, stderr, command});
        });
    });
}


module.exports = {
    saveImage : saveImage,
    resizeImage : resizeImage,
    getImageSize : getImageSize,
    thumbImage : thumbImage,
}