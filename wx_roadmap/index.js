var express = require("express");
var eh = require("express-handlebars");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var multer = require("multer");
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
    queryMoments(0, (value)=>{
        res.render("home", {
            articles : value
        });
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
    //if(req.session.user) {
        res.render("post");
    // } else {
    //     res.redirect("/login_wx");
    // }
});
app.post("/uploadPic", upload.array("file"), function(req, res) {
    let arrPromise = [];
    let arrResp = [];
    for(let i = 0;i < req.files.length;i++) {
        let file = req.files[i]
        let p = utils.saveImage(file.path, file.path).then(()=> {
                    return utils.getImageSize(file.path);
                }).then((value) => {
                    console.log("size is value : " + JSON.stringify(value));
                    let baseSize = 440; // sina
                    if(value.width < baseSize || value.height < baseSize) {
                        console.log("insert bmiddle directly");
                        return utils.saveImage(file.path, file.destination + "/../bmiddle/" + file.filename);
                    } else {
                        console.log("resize and insert bmiddle");
                        let width = 0, height = 0;
                        if(value.width < value.height) {
                            ratio = value.width / baseSize;
                            width = baseSize;
                            height = value.height / ratio;
                        } else {
                            ratio = value.height / baseSize;
                            height = baseSize;
                            width = value.width / ratio;
                        }
                        return utils.resizeImage(file.path, width, height, file.destination + "/../bmiddle/" + file.filename);
                    }
                }).then(() => {
                    return utils.thumbImage(file.path, 80, 80, file.destination + "/../thumbnail/" + file.filename, 100);
                }).then(() => {
                    let originalUrl = file.path.replace(__dirname + "\\public\\", config.FILE_SERVER).replace("\\", "/").replace("\\", "/");
                    console.log("originalUrl ==> " + originalUrl);
                    let respInfo = {
                        "pic_id" : file.filename.split(".")[0],
                        "thumbnail_pic" : originalUrl.replace("original", "thumbnail"),
                        "bmiddle_pic" : originalUrl.replace("original", "bmiddle"),
                        "original_pic" : originalUrl
                    };
                    //res.end(JSON.stringify(respInfo));
                    var pic = new pictures.Picture({
                        pic_id : respInfo.pic_id,
                        thumbnail : respInfo.thumbnail_pic,
                        bmiddle : respInfo.bmiddle_pic,
                        original : respInfo.original_pic,
                        md5 : "0",
                    });
                    return pictures.addPicture(pic).then(()=>{
                        arrResp.push(respInfo);
                    });
                }).catch((err) => {
                    console.log(err);
                });;
        arrPromise.push(p);
    }
    Promise.all(arrPromise).then(()=>{
        res.end(JSON.stringify(arrResp[0]));
    }).catch(()=>{
        res.end();
    });
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

app.post("/loadMore", function(req, res) {
    console.log(JSON.stringify(req.body));
    queryMoments(parseInt(req.body.page), (value) => {
        console.log(value);
        //res.end(JSON.stringify(value));
        res.render("moment", {
            articles : value,
            layout : null
        });
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

// functions 

function queryMoments(page, cb) {
    let startIdx = page * config.PAGE_SIZE;
    let p = moments.getMoments(startIdx, config.PAGE_SIZE);
    p.then((_res) => {
        console.log("query count : " + _res.length);
        let momentsData = _res.map((item,index) => {
            let pics = item.pictures.split(",");
            let data = {
                _id : item._id,
                content : item.content,
                pictures : pics,
                post_date : utils.getFormatDateString(item.date),
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
                            momentsData[i].pictures[j] = _resPic[0].thumbnail;
                        }
                    } else {
                        if(_resPic.length > 0) {
                            momentsData[i].pictures[j] = _resPic[0].bmiddle;
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
        cb(value);
    }).catch((err) => {
        console.log(err);
    });
}
