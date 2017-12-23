var connect = require("connect");
var morgan = require("morgan");
var errorhandler = require("errorhandler");


var app = connect()
            .use(morgan("dev"))
            .use(function(req, res, next) {
                setTimeout(function() {
                    next(new Error("something broke!"));
                })
            })
            .use(errorhandler())
            .listen(3000);
