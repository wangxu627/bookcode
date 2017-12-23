var connect = require("connect");
//var basicauth = require('basicauth-middleware');
var basicauth = require('basic-auth-connect');

var app = connect()
            .use(basicauth("tj", "tobi"))
            .use(function(req, res) {
                res.end("I`am secret");
            })
            .listen(3000);