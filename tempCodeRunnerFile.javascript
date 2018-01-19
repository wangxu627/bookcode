var express = require("express");

var app = express();
app.post("/friend", function(req, res){
    console.log("hhhhhhhhhhhhh");
    res.json("1I3Ow8bfztbw3MDMxs7D8M3O3Mrw3crDztvGwMHwyd3GysHL3PDe2srd1vDdytzfwMHcyo2V1I3MwMvKjZWen5+fn9KDjczAy8qNlZ6fn5+f0g==");
});
app.listen(3000);