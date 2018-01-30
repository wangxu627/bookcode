// var gm = require("gm");
// var fs = require("fs");

// // gm(__dirname + "/upload/file-1516764627109.jpeg").resize(
// gm(__dirname + "/upload/file-1516764627109.jpeg").thumb(80, 80, __dirname + "/upload/thumbnail/file-1516764627109.jpeg", 60, 
//     (err, stdout, stderr, command)=>{
//         console.log(err);
//         console.log(stdout);
//         console.log(stderr);
//         console.log(command);
//     }
// );


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
                console.log("1111111111111111");
                console.log(_err);
                console.log(_image);
                if(_err) {
                    return reject(_err);
                }
                return resolve();
            });
        });
    });



    // getImageSize(path).then((value) => {
    //     if(value.width < value.height) {
    //         image.resize(width, height)
    //     }
    // })
    // return resizeImage(path, width, height, dest);
}

// resizeImage("bc.jpg", 320, 178, "sbc.jpg");
thumbImage("bc.jpg", 120, 120, "abc.jpg")