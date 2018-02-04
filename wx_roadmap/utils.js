const crypto = require("crypto");
const fs = require("fs");

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

function getFormatDateString(stampMS) {
    let now = Math.floor(Date.now() / 1000);
    let stamp = Math.floor(stampMS / 1000);
    let duration = now - stamp;
    if(duration < 60 * 60) {
        return Math.max(1, Math.floor(duration / 60)) + "分钟前";
    } else if(duration < 3600 * 24) {
        return Math.max(1, Math.floor(duration / 3600)) + "小时前";
    } else {
        return (new Date(stampMS)).Format("yyyy-MM-dd hh:mm:ss");
    }
}

function calcFileMD5(path) {
    let data = fs.readFileSync(path);
    let md5 = crypto.createHash("md5");
    return md5.update(data).digest("hex");
}

module.exports = {
    getIPAdress : getIPAdress,
    getFormatDateString : getFormatDateString,
    calcFileMD5 : calcFileMD5,
}