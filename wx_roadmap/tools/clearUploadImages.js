const fs = require("fs");

dirs = ["public/upload/bmiddle", "public/upload/original", "public/upload/thumbnail"];

for(let d of dirs) {
    let files = fs.readdirSync(d);
    for(let f of files) {
        console.log(d + "/" + f);
        fs.unlink(d + "/" + f);
    }
}