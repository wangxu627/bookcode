var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var pictureScheMa = new Schema({
    pic_id:             { type : String },
    thumbnail :         { type : String },
    original:           { type : String },
    md5:                { type : String },
});
var Picture = mongoose.model('pictures', pictureScheMa); 

function getPicturesById(picId) {
    return new Promise((resolve, reject) => {
        var wherestr = {pic_id: picId};
        Picture.find(wherestr, function(err, res){
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

module.exports = {
    Picture : Picture,
    getPicturesById : getPicturesById,
    addPicture : addPicture,
    checkIdentity : checkIdentity
}