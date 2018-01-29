let sqlite3 = require("sqlite3");
let isq = require("./initSqlite");

let pictureModel = {
    id : 0,
    pic_id : "",
    thumbnail : "",
    bmiddle : "",
    original : "",
    md5 : "",
    data : 0
};

class Picture {
    constructor(param) {
        this.param = param;
    }

    getParam() {
        return this.param;
    }
}

function getAllPictures() {
    return new Promise((resolve, reject) => {
        isq.getDb().all("select * from pictures", (err, rows) => {
            if(err) {
                return reject(err);
            }
            return resolve(rows);
        });
    });
}

function getPicturesById(picId) {
    return new Promise((resolve, reject) => {
        isq.getDb().all("select * from pictures where pic_id = ?", [picId], (err, rows) => {
            if(err) {
                return reject(err);
            }
            return resolve(rows);
        });
    });
}

function addPicture(mo) {
    return new Promise((resolve, reject) => {
        let p = mo.getParam();
        isq.getDb().run("insert into pictures (pic_id, thumbnail, bmiddle, original, md5, data) values(?, ?, ?, ?, ?, ?)", 
                        [p.pic_id, p.thumbnail, p.bmiddle, p.original, p.md5, p.data], (err) => {
            if(err) {
                return reject(err);
            }
            return resolve("success");
        });
    });
}

function checkIdentity(md5) {
    return new Promise((resolve, reject) => {
        isq.getDb().all("select * from pictures where md5 = ?", [md5], (err, rows) => {
            if(err) {
                return reject(err);
            }
            return resolve(rows);
        });
    });
}

function updatePictureById(picId, data) {
    return new Promise((resolve, reject) => {
        isq.getDb().run("update pictures set data = ? where pic_id = ?", 
                        [data, picId], (err) => {
            if(err) {
                return reject(err);
            }
            return resolve("success");
        });
    });
}


isq.openDatabase(() => {
    // for(let i = 0;i < 100;i++) {
    //     //pic_id, thumbnail, bmiddle, original, md5, data

    //     addPicture({
    //         pic_id:"hello" + i,
    //         thumbnail:"thumbnail123",
    //         bmiddle:"bmiddle123",
    //         original:"original123",
    //     }).then((res) => {
    //         console.log(res);
    //     });
    // }
    
    // getPicturesById("hello91").then((res) => {
    //     console.log(res);
    // })

    // updatePictureById("hello : 3", "1111111111111111111111").then((res) => {
    //     console.log(res);
    // });
});

module.exports = {
    Picture : Picture,
    getAllPictures : getAllPictures,
    getPicturesById : getPicturesById,
    addPicture : addPicture,
    checkIdentity : checkIdentity,
    updatePictureById : updatePictureById
}