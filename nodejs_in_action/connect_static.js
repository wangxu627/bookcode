var serveStatic = require('serve-static');
var serveIndex = require('serve-index')
var connect = require("connect");

var app = connect()
            .use("/static", serveIndex("static"))
            .use("/static", serveStatic("static"))
            .listen(3000)

