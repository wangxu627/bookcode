var fs = require("fs");
var path = require("path");
var args = process.argv.splice(2);
var command = args.shift();
var taskDescription = args.join(" ");
var files = path.join(process.cwd(), "/.tasks");

// var a = [1,2,3,4];
// var b = a.shift();

// console.log(a);
// console.log(b);
// console.log(a);
