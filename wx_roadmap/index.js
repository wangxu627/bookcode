var express = require("express");
var eh = require("express-handlebars");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var moments = require("./moments");

handlebars = eh.create({
    defaultLayout:"main",
    helpers:{
        equals: function(lhs, rhs, options) {
            if(lhs == rhs) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        }
    }}
);
//handlebars = eh.create();
// eh.registerHelper("ifCond", function(v1, v2, options) {
//     if(v1 == v2) {
//         return options.fn(this);
//     }
//     return options.inverse(this);
// });
var app = express();
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 3000);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser('session'));
app.use(session({
    secret: 'session',//与cookieParser中的一致
    resave: true,
    saveUninitialized:true
}));

app.get("/", function(req, res) {
    var articles = moments.getArticles();
    res.render("home", {
        articles:articles,
    });
});
app.get("/admin_wx", function(req, res) {
    console.log(req.session.user);
    if(req.session.user) {
        res.render("admin_wx");
    } else {
        res.redirect("/login_wx");
    }
});
app.get("/login_wx", function(req, res) {
    res.render("login_wx");
});
app.get("/post", function(req, res) {
    res.render("post_m", {
        layout:null
    });
})
app.post("/signin", function(req, res) {
    console.log("req ::::: " + JSON.stringify(req.body));
    if(req.body.username == "wangxu" && req.body.password == "123456") {
        //res.header("Access-Control-Allow-Credentials", "true");
        var user={
           logined:1
        }
        req.session.user=user;
        req.session.save((err)=>{
            console.log("err : " + err);
            res.redirect("/");        
        });
    } else {
        res.status(400);
        res.end("mistake");
    }
});
app.use(function(req, res, next) {
    res.status(404);
    res.render("404");
});
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(500);
    res.render("500");
});
app.listen(3000, function() {
    console.log("Server started.");
});

