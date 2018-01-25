var express = require("express");
var eh = require("express-handlebars");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var multer = require("multer");
var gm = require("gm");
var crypto = require("crypto");
var mongoose = require('mongoose');
var moments = require("./db/models/moments");
var pictures = require("./db/models/pictures");
var moments_old = require("./moments_old");
var utils = require("./utils");
var config = require("./config");

mongoose.connect(config.DB_URL);//；连接数据库
mongoose.connection.on('connected', () => {
    console.log("mongodb connnected.");
});

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
    var articles = moments_old.getArticles();
    
    // moments.getAllMoments((_err, _res) => {
    //     let momentsData = _res.map((item,index,input) => {
    //         let pics = item.pictures.split(",");
    //         pics.forEach((element, index, array) => {
    //             pictures.getPicturesById(element, (_errPic, _resPic) => {
    //                 if(pics.length > 1) {
    //                     if(_resPic.length > 0) {
    //                         array[index] = _resPic[0].thumbnail;
    //                     }
    //                 } else {
    //                     if(_resPic.length > 0) {
    //                         array[index] = _resPic[0].original;
    //                     }
    //                 }
                   
    //             });
    //         });
            
    //         let data = {
    //             _id : item._id,
    //             content : item.content,
    //             pictures : pics,
    //             __v : 0
    //         };
    //         return data;
    //     });

    //     setTimeout(()=>{
    //         console.log(momentsData);
    //         res.render("home", {
    //             articles : momentsData
    //         });
    //     }, 800);
    // });

    let p = moments.getAllMoments();
    p.then((_res) => {
        let momentsData = _res.map((item,index) => {
            let pics = item.pictures.split(",");
            let data = {
                _id : item._id,
                content : item.content,
                pictures : pics,
                __v : 0
            };
            return data;
        });
        return momentsData;
    }).then((momentsData)=> {
        let arr = [];
        for(let i = 0;i < momentsData.length;i++) {
            for(let j = 0;j < momentsData[i].pictures.length;j++) {
                let sp = pictures.getPicturesById(momentsData[i].pictures[j]);
                sp.then((_resPic) => {
                    if(momentsData[i].pictures.length > 1) {
                        if(_resPic.length > 0) {
                            console.log("modify data " + momentsData[i].pictures[j], _resPic[0].thumbnail);
                            momentsData[i].pictures[j] = _resPic[0].thumbnail;
                        }
                    } else {
                        if(_resPic.length > 0) {
                            console.log("modify data " + momentsData[i].pictures[j], _resPic[0].original);
                            momentsData[i].pictures[j] = _resPic[0].original;
                        }
                    }
                });
                arr.push(sp);
            }
        }
        let promiseAll = Promise.all(arr).then(()=>{
            return momentsData;
        }).catch((err) => {
            console.log(err);
        });
        return promiseAll;
    }).then((value) => {
        res.render("home", {
            articles : value
        });
    }).catch((err) => {
        console.log(err);
    })
  
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

                    let originalUrl = file.path.replace(__dirname + "\\public\\", config.FILE_SERVER).replace("\\", "/").replace("\\", "/");
                    console.log("originalUrl ==> " + originalUrl);
                    let respInfo = {
                        "pic_id" : file.filename.split(".")[0],
                        "thumbnail_pic" : originalUrl.replace("original", "thumbnail"),
                        "original_pic" : originalUrl
                    };
                    //res.end(JSON.stringify(respInfo));
                    var pic = new pictures.Picture({
                        pic_id : respInfo.pic_id,
                        thumbnail : respInfo.thumbnail_pic,
                        original : respInfo.original_pic,
                        md5 : "0",
                    });
                    pictures.addPicture(pic).then((_res) => {
                        res.end(JSON.stringify(respInfo));
                    });
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
    let mo = new moments.Moment({
        content : req.body.content,
        pictures : req.body.pic_ids
    });
    moments.addMoment(mo).then((_res) => {
        res.redirect("/");
    });
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

