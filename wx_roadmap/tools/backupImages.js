const fs = require("fs");
const zlib = require('zlib');
const sqlite3 = require("sqlite3");
const mongoose = require('mongoose');
const pictures = require("../db/models/pictures");
const config = require("../config");

const MONGODB_BACKUP = "mongodb://172.17.44.19:27017/imageBackup";
const SQLITE_BACKUP = "db/sqlite/imageBackup.db";
const dir = "public/upload/original";

function base64Encode(file) {
    let bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString("base64");
}

function base64Decode(base64str, file) {
    let bitmap = new Buffer(base64str, "base64");
    fs.writeFileSync(file, bitmap);
}

var Schema = mongoose.Schema;
var backupScheMa = new Schema({
    filename        : { type : String },
    data            : { type : String },
});
var Backup = mongoose.model('backup', backupScheMa); 

mongoose.connect(MONGODB_BACKUP);//；连接数据库
mongoose.connection.on('connected', () => {
    let files = fs.readdirSync(dir);
    for(let f of files) {
        let path = dir + "/" + f;
        console.log(path);
        let base64str = base64Encode(path);
        let bk = new Backup({
            filename : f,
            data : base64str
        });
        Backup.find({filename : f}, (err, res) => {
            if(res.length == 0) {
                bk.save();
            }
        })
    }

    // let p = pictures.getAllPictures();
    // p.then((res) => {
    //     for(let r of res) {
    //         console.log(!r.data);
    //         if(!r.data) {
    //             let pic_id = r.pic_id;
    //             let path = r.original.replace(config.FILE_SERVER, config.FILE_UPLOAD_PATH);
    //             console.log("update : " + pic_id);
    //             let base64str = base64Encode(path);
    //             pictures.updatePictureById(pic_id, base64str).then((res) => {
    //                 console.log(res);
    //             });
    //         }
    //     }
    // });
});

// sqlite备份
function createDatabase() {
    var db = new sqlite3.Database(SQLITE_BACKUP, (err) => {
        db.run("create table backup(id INTEGER PRIMARY KEY,\
                                    filename TEXT,\
                                    data TEXT);", () => {});
        console.log("create database ok");
    });
    return db;
}

function openDatabase(cb) {
    var db = new sqlite3.Database(SQLITE_BACKUP, sqlite3.OPEN_READWRITE, (err) => {
        if(err) {
            db = createDatabase();
        }
        _db = db;
        cb(db);
    });
}

function addOneItem(db, filename, data) {
    return new Promise((resolve, reject) => {
        db.run("insert into backup (filename, data) select ?, ? where not exists (select * from backup where filename = ?)", 
                        [filename, data, filename], (err) => {
            if(err) {
                return reject(err);
            }
            return resolve("success");
        });
    });
}

function backupImage(db) {
    let files = fs.readdirSync(dir);
    for(let f of files) {
        let path = dir + "/" + f;
        console.log(path);
        let base64str = base64Encode(path);
        addOneItem(db, f, base64str);
    }
}

// openDatabase((db)=>{
//     backupImage(db);
// })



