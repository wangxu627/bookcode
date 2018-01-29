var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var pictureScheMa = new Schema({
    pic_id:             { type : String },
    thumbnail :         { type : String },
    bmiddle :           { type : String },
    original :          { type : String },
    md5 :               { type : String },
    data :              { type : String },
});
var Picture = mongoose.model('pictures', pictureScheMa); 

function getAllPictures() {
    return new Promise((resolve, reject) => {
        Picture.find(function(err, res){
            if(!err) {
                return resolve(res);
            } else {
                return reject(err);
            }
        });
    });
}

function getPicturesById(picId) {
    return new Promise((resolve, reject) => {
        let wherestr = { pic_id : picId};
        let projection = { pic_id : 1, thumbnail : 1, bmiddle : 1, original : 1};
        Picture.find(wherestr, projection, function(err, res){
            if(!err) {
                return resolve(res);
            } else {
                return reject(err);
            }
        });
    });
}

function addPicture(mo) {
    return new Promise((resolve, reject) => {
        mo.save(function (err, res) {
            if(!err) {
                return resolve(res);
            } else {
                return reject(err);
            }
        });
    });
}

function checkIdentity(md5, cb) {
    return new Promise((resolve, reject) => {
        var wherestr = {md5: md5};
        Picture.find(wherestr, function(err, res){
            cb(err, res);
        });
    });
}

function updatePictureById(picId, data) {
    return new Promise((resolve, reject) => {
        let wherestr = { pic_id : picId};
        let projection = { data : data };
        Picture.update(wherestr, projection, function(err, res){
            if(!err) {
                return resolve(res);
            } else {
                return reject(err);
            }
        });
    });
}

module.exports = {
    Picture : Picture,
    getAllPictures : getAllPictures,
    getPicturesById : getPicturesById,
    addPicture : addPicture,
    checkIdentity : checkIdentity,
    updatePictureById : updatePictureById
}