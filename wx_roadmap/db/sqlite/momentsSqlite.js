let sqlite3 = require("sqlite3");
let isq = require("./initSqlite");

var momentsModel = {
    id : 0,
    content : "",
    pictures : "",
    date : 0
};

class Moment {
    constructor(param) {
        this.param = param;
    }

    getParam() {
        return this.param;
    }
}

function getAllMoments() {
    return new Promise((resolve, reject) => {
        isq.getDb().all("select * from moments order by date desc", (err, rows) => {
            if(err) {
                return reject(err);
            }
            return resolve(rows);
        });
    });
}

function getMoments(offset, cnt) {
    return new Promise((resolve, reject) => {
        isq.getDb().all("select * from moments order by date desc limit ? offset ?", [cnt, offset], (err, rows) => {
            if(err) {
                return reject(err);
            }
            return resolve(rows);
        });
    });
}

function getMomentsCount() {
    return new Promise((resolve, reject) => {
        isq.getDb().all("select count(id) from moments", (err, rows) => {
            if(err) {
                return reject(err);
            }
            return resolve(rows[0]["count(id)"]);
        });
    });
}


function addMoment(mo) {
    return new Promise((resolve, reject) => {
        let p = mo.getParam();
        p.date = Date.parse(new Date());
        isq.getDb().run("insert into moments (content, pictures, date) values(?, ?, ?)", 
                        [p.content, p.pictures, p.date], (err) => {
            if(err) {
                return reject(err);
            }
            return resolve("success");
        });
    });
}

function removeMomentById(id) {
    return new Promise((resolve, reject) => {
        isq.getDb().run("delete from moments where id = ?", [id], (err) => {
            if(err) {
            return reject(err);
            }
            return resolve("success");
        });
    });
}


// isq.openDatabase(() => {
//     // for(let i = 0;i < 100;i++) {
//     //     addMoment({
//     //         content:"hello",
//     //         pictures:"123"
//     //     }).then((res) => {
//     //         console.log(res);
//     //     });
//     // }
    
//     getMoments(0, 20).then((res) => {
//         console.log(res);
//     });
// });

module.exports = {
    Moment : Moment,
    getAllMoments : getAllMoments,
    getMoments : getMoments,
    getMomentsCount : getMomentsCount,
    addMoment : addMoment,
    removeMomentById : removeMomentById
}