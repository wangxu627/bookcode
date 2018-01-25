var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var momentScheMa = new Schema({
    content: String,
    pictures: String,
    date: String,
});
var Moment = mongoose.model('moments', momentScheMa);

function getAllMoments(cb) {
    var wherestr = {};
	Moment.find(wherestr, function(err, res){
        cb(err, res);
    });
}

function addMoment(mo, cb) {
    mo.save(function (err, res) {
        cb(err, res);
    });
}

module.exports = {
    Moment : Moment,
    getAllMoments : getAllMoments,
    addMoment : addMoment
}