var gm = require("gm");

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

function getIPAdress(){  
    let interfaces = require('os').networkInterfaces();  
    for(let devName in interfaces){  
        let iface = interfaces[devName];  
          for(let i=0;i<iface.length;i++){  
                let alias = iface[i];  
               if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
                     return alias.address;  
               }  
          }  
    }  
} 

function getFormatDateString(stamp) {
    let duration = Date.now() - stamp;
    if(duration < 3600) {
        return Math.floor(duration / 60) + "分钟前";
    } else if(duration < 3600 * 24) {
        return Math.floor(duration / 3600) + "小时前";
    } else {
        return (new Date(stamp)).Format("yyyy-MM-dd hh:mm:ss");
    }
}

function saveImage(path, dest) {
    return new Promise((resolve, reject) => {
        gm(path).autoOrient().write(dest, (err) => {
            if(err) {
                return reject(err);
            }
            return resolve();
        });
    });
}

function getImageSize(path) {
    return new Promise((resolve, reject) => {
        gm(path).size((err, value) => {
            if(err) {
                return reject(err);
            }
            return resolve(value);
        });
    });
}

function resizeImage(path, width, height, dest) {
    return new Promise((resolve, reject) => {
        gm(path).resize(width, height).write(dest, (err) => {
            if(err) {
                return reject(err);
            }
            return resolve();
        });
    });
}

function thumbImage(path, width, height, dest, quality) {
    return new Promise((resolve, reject) => {
        gm(path).thumb(width, width, dest, quality, (err, stdout, stderr, command)=>{
            if (err) {
                return reject(err);
            }
            return resolve({stdout, stderr, command});
        });
    });
}

module.exports = {
    getIPAdress : getIPAdress,
    getFormatDateString : getFormatDateString,
    saveImage : saveImage,
    resizeImage : resizeImage,
    getImageSize : getImageSize,
    thumbImage : thumbImage,
}