var http=require('http');  
// var querystring=require('querystring');  
// //发送 http Post 请求  
// var postData=querystring.stringify({  
//     msg:'中文内容'  
// });  

var options={  
   hostname:'localhost',  
   port:3000,  
   path:'/aas',  
   method:'POST',  
   headers:{  
       "user-agent":"wangxu`s app"
    //'Content-Type':'application/x-www-form-urlencoded',  
    //'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',  
    //'Content-Length':Buffer.byteLength(postData)  
   }  
}  
var req=http.request(options, function(res) {  
    console.log('Status:',res.statusCode);  
    //console.log('headers:',JSON.stringify(res.headers));  
    //res.setEncoding('utf-8');  
    res.on('data',function(chun){  
        // console.log('body分隔线---------------------------------\r\n');  
        // console.info(chun);  
    });  
    res.on('end',function(){  
        //console.log('No more data in response.********');  
    });  
});  
req.on('error',function(err){  
    console.error(err);  
});  
//req.write(postData);  
req.end();  
