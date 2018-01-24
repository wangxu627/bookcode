var gm = require("gm");
var fs = require("fs");

// gm(__dirname + "/upload/file-1516764627109.jpeg").resize(
gm(__dirname + "/upload/file-1516764627109.jpeg").thumb(80, 80, __dirname + "/upload/thumbnail/file-1516764627109.jpeg", 60, 
    (err, stdout, stderr, command)=>{
        console.log(err);
        console.log(stdout);
        console.log(stderr);
        console.log(command);
    }
);
 