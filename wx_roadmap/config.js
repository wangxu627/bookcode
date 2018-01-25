let utils = require("./utils");

// windows home
// let config = {
//     DB_URL : 'mongodb://localhost:27017/roadmap',
//     FILE_SERVER : "http://" + utils.getIPAdress() + ":3000/"
// }

// windows office
let config = {
    DB_URL : 'mongodb://172.17.44.19:27017/roadmap',
    FILE_SERVER : "http://" + utils.getIPAdress() + ":3000/"
}

module.exports = config;


