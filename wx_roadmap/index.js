var express = require("express");
var eh = require("express-handlebars");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var multer = require("multer");
var gm = require("gm");
var crypto = require("crypto");
var moments = require("./moments");

var handlebars = eh.create({
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

var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, __dirname + "/public/upload/original")
    }, 
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        var md5 = crypto.createHash("md5");
        var fileName = md5.update(file.originalname).digest("hex");
        cb(null, fileName + "." + fileFormat[fileFormat.length - 1]);
    }
});
var upload = multer({storage: storage});  
//var upload = multer({ dest: __dirname + "/upload" });

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
    if(req.session.user) {
        res.render("post");
    } else {
        res.redirect("/login_wx");
    }
});
app.post("/uploadPic", upload.array("file"), function(req, res) {
    console.log("+=======================>>> : ");
    console.log(req.files);
    for(let i = 0;i < req.files.length;i++) {
        let file = req.files[i]
        gm(file.path).autoOrient().write(file.path, function(err) {
            console.log("err : " + err);
            gm(file.path).thumb(80, 80, file.destination + "/../thumbnail/" + file.filename, 60, 
                (err, stdout, stderr, command)=>{
                    if (err) {
                        console.log(err);
                        res.end();
                        return;
                    }
                    let originalUrl = file.path.replace("G:\\bookcode\\bookcode\\wx_roadmap\\public\\", "http://172.17.40.147:3000/").replace("\\", "/").replace("\\", "/");
                    console.log("originalUrl ==> " + originalUrl);
                    let respInfo = {
                        "pic_id" : file.filename.split(".")[0],
                        "thumbnail_pic" : originalUrl.replace("original", "thumbnail"),
                        "original_pic" : originalUrl
                    };
                    res.end(JSON.stringify(respInfo));
                }
            );
        });
    }
});

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

app.post("/commit", function(req, res) {
    console.log(JSON.stringify(req.body));
    res.redirect("/");   
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

