let utils = require("./utils");

// windows home
// let config = {
//     DB_URL : 'mongodb://localhost:27017/roadmap',
//     FILE_SERVER : "http://" + utils.getIPAdress() + ":3000/"
// }

// windows office
let config = {
    FILE_SERVER : "http://" + utils.getIPAdress() + ":3000/",
    PAGE_SIZE : 20,
    FILE_UPLOAD_PATH : __dirname + "\\public\\",
    DB_TYPE : "mongodb",
    MONGODB_URL : "mongodb://172.17.44.19:27017/roadmap",
    SQLITE_PATH : "./db/sqlite/roadmap.db",
}

module.exports = config;


