var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var pictureScheMa = new Schema({
    pic_id:             { type : String },
    thumbnail :         { type : String },
    original:           { type : String },
    md5:                { type : String },
});
var Picture = mongoose.model('pictures', pictureScheMa); 

function getPicturesById(picId, cb) {
    var wherestr = {pic_id: picId};
	Picture.find(wherestr, function(err, res){
        cb(err, res);
    });
}

function addPicture(mo, cb) {
    mo.save(function (err, res) {
        cb(err, res);
    });
}

function checkIdentity(md5, cb) {
    var wherestr = {md5: md5};
	Picture.find(wherestr, function(err, res){
        cb(err, res);
    });
}

module.exports = {
    Picture : Picture,
    getPicturesById : getPicturesById,
    addPicture : addPicture,
    checkIdentity : checkIdentity
}