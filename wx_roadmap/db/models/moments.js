var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var momentScheMa = new Schema({
    content:        { type : String },
    pictures:       { type : String },
    date:           { type : Number, default : Date.now},
});
var Moment = mongoose.model('moments', momentScheMa);

function getAllMoments() {
    return new Promise((resolve, reject) => {
        var wherestr = {};
        Moment.find(wherestr, function(err, res){
            if(!err) {
                return resolve(res);
            } else {
                return reject(err);
            }
        });
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
    addMoment : addMoment
}