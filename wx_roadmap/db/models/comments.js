var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var commentScheMa = new Schema({
    content: String,
    towhich : String,
    type: String,
    date: String,
});
var Comment = mongoose.model('comments', commentScheMa); 

function getCommentsByToId(towhich, cb) {
    var wherestr = {towhich: towhich};
	Comment.find(wherestr, function(err, res){
        cb(err, res);
    });
}

function addComment(mo, cb) {
    mo.save(function (err, res) {
        cb(err, res);
    });
}

module.exports = {
    Comment : Comment,
    getCommentsByToId : getCommentsByToId,
    addComment : addComment
}

