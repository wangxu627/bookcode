var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var momentScheMa = new Schema({
    content: String,
    pictures: String,
    date: String,
}); //  定义了一个新的模型，但是此模式还未和users集合有关联
var Moment = mongoose.model('moments', momentScheMa); //  与users集合关联

function getAllMoments(cb) {
    var wherestr = {};
	Moment.find(wherestr, function(err, res){
        cb(err, res);
        // if (err) {
        //     console.log("Error:" + err);
        // }
        // else {
        //     console.log("Res:" + res);
        // }
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