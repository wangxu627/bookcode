var https = require("https");
var fs = require("fs");
var express = require("express");

var app = express();
app.get("/", function(req, res, next){
    console.log("hhhh");
    res.end("hello");
})
var options = {
    key: fs.readFileSync(__dirname + "/ssl/wangxu.pem"),
    cert: fs.readFileSync(__dirname + "/ssl/wangxu.crt")
};

https.createServer(options, app).listen(3000, function(){
    console.log("Express tarted in 3000");
});