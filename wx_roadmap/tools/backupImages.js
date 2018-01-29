const fs = require("fs");
const zlib = require('zlib');
const mongoose = require('mongoose');
const pictures = require("../db/models/pictures");
const config = require("../config");

function base64Encode(file) {
    let bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString("base64");
}

function base64Decode(base64str, file) {
    let bitmap = new Buffer(base64str, "base64");
    fs.writeFileSync(file, bitmap);
}

mongoose.connect(config.DB_URL);//；连接数据库
mongoose.connection.on('connected', () => {
    let p = pictures.getAllPictures();
    p.then((res) => {
        for(let r of res) {
            console.log(!r.data);
            if(!r.data) {
                let pic_id = r.pic_id;
                let path = r.original.replace(config.FILE_SERVER, config.FILE_UPLOAD_PATH);
                console.log("update : " + pic_id);
                let base64str = base64Encode(path);
                pictures.updatePictureById(pic_id, base64str).then((res) => {
                    console.log(res);
                });
            }
        }
    });
});
