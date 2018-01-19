var http = require("http");

var options = {
    hostname: "172.17.44.27",
    port: 3000,
    method: "GET",
    path: "/abc/haha",
    headers: {
        'user-agent':"wangxu`s app"
    }
};

var req = http.request(options, (res) => {
    console.log(res.statusCode);
});
req.on("error", function(err){
    console.error(err);
});
req.end();

// var http=require('http');  
// var options={  
//    hostname:'172.17.44.27',  
//    port:3000,  
//    path:'abc/aas',  
//    method:'POST',  
//    headers:{  
//        "user-agent":"wangxu`s app"
//    }  
// }  
// var req=http.request(options, function(res) {  
//     console.log('Status:',res.statusCode);   
//     res.on('data',function(chun){  
//     });  
//     res.on('end',function(){  
//     });  
// });  
// req.on('error',function(err){  
//     console.error(err);  
// });  
// req.end();