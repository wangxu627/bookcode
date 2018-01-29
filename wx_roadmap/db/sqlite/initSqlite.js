const sqlite3 = require("sqlite3");
const config = require("../../config");

let _db = null;

function createDatabase() {
    var db = new sqlite3.Database(config.SQLITE_PATH, (err) => {
        db.run("create table moments(id INTEGER PRIMARY KEY,\
                                     content TEXT,\
                                     pictures TEXT,\
                                     date INT);", () => {});
        db.run("create table pictures(id INTEGER PRIMARY KEY,\
                                      pic_id TEXT,\
                                      thumbnail TEXT,\
                                      bmiddle TEXT,\
                                      original TEXT,\
                                      md5 TEXT,\
                                      data TEXT);", () => {});
        console.log("create database ok");
    });
    return db;
}

function openDatabase(cb) {
    var db = new sqlite3.Database(config.SQLITE_PATH, sqlite3.OPEN_READWRITE, (err) => {
        if(err) {
            db = createDatabase();
        }
        _db = db;
        cb(db);
    });
}

function getDatabase() {
    return _db;
}

module.exports = {
    openDatabase : openDatabase,
    getDb : getDatabase,
    getDatabase : getDatabase,
}


