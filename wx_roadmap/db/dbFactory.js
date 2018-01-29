const config = require("../config");
const isq = require("./sqlite/initSqlite");
const mongoose = require('mongoose');


function initDb() {
    if(config.DB_TYPE == "sqlite") {
        isq.openDatabase(()=>{});
    } else if(config.DB_TYPE == "mongodb") {
        mongoose.connect(config.MONGODB_URL);//；连接数据库
        mongoose.connection.on('connected', () => {
            console.log("mongodb connnected.");
        });
    }
}

function getCommentsModel() {
    if(config.DB_TYPE == "sqlite") {
        const comments = require("./sqlite/commentsSqlite");
        return comments;
    } else if(config.DB_TYPE == "mongodb") {
        const comments = require("./mongodb/commentsMongo");
        return comments;
    }
}

function getMomentsModel() {
    if(config.DB_TYPE == "sqlite") {
        const moments = require("./sqlite/momentsSqlite");
        return moments;
    } else if(config.DB_TYPE == "mongodb") {
        const moments = require("./mongodb/momentsMongo");
        return moments;
    }
}

function getPicturesModel() {
    if(config.DB_TYPE == "sqlite") {
        const pictures = require("./sqlite/picturesSqlite");
        return pictures;
    } else if(config.DB_TYPE == "mongodb") {
        const pictures = require("./mongodb/picturesMongo");
        return pictures;
    }
}

module.exports = {
    initDb : initDb,
    getCommentsModel : getCommentsModel,
    getMomentsModel : getMomentsModel,
    getPicturesModel : getPicturesModel
}