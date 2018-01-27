var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var momentScheMa = new Schema({
    content:        { type : String },
    pictures:       { type : String },
    date:           { type : Number, default : Date.now},
});
var Moment = mongoose.model("moments", momentScheMa);

function getAllMoments() {
    return new Promise((resolve, reject) => {
        Moment.find({}, function(err, res){
            if(!err) {
                return resolve(res);
            } else {
                return reject(err);
            }
        }).sort({date:-1});
    });
}

function getMoments(offset, cnt) {
    return new Promise((resolve, reject) => {
        Moment.find({}, function(err, res){
            if(!err) {
                return resolve(res);
            } else {
                return reject(err);
            }
        }).skip(offset).limit(cnt).sort({date:-1});
    });
}

function addMoment(mo) {
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

module.exports = {
    Moment : Moment,
    getAllMoments : getAllMoments,
    getMoments : getMoments,
    addMoment : addMoment
}