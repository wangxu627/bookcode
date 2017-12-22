var connect = require("connect");
var morgan = require("morgan");
var favicon = require("serve-favicon");
var path = require("path");

var app = connect()
            //.use(morgan("combined"))
            //.use(morgan(":method :url :response-time ms"))
            .use(morgan("dev"))
            //.use(favicon(path.join(__dirname, "public", "favicon.ico")))
            .use(function(req, res) {
                console.log("Hello");
                res.end("Hello World")               
            })
            .listen(3000);