var connect = require("connect");
var vhost = require("vhost");

var server = connect();
var app = require("./sites/expressjs.dev");


var userapp = connect();
userapp.use(function(req, res, next) {
    var username = req.vhost[0];
    req.originalUrl = req.url;
    req.url ="/" + username + req.url;

    next();
});

//server.use(vhost("expressjs.dev", app));
server.use(vhost("expressjs.dev", userapp));
server.listen(3000);