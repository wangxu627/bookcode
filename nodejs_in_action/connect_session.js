var connect = require("connect");
var cookieParser = require("cookie-parser");
var session = require("express-session");

var app = connect()
            .use(cookieParser("keyboard cat"))
            .use(session({resave:false, secret:false, saveUninitialized:true}))
            .use(function(req, res) {
                var sess = req.session;
                if(sess.views) {
                    res.setHeader("Content-Type", "text/html");
                    res.write("<p>views: " + sess.views + "</p>");
                    sess.views++;    
                    res.end();                    
                } else {
                    sess.views = 1;
                    res.end("Welcome to the session demo. refresh!");
                }
            })
            .listen(3000);