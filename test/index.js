var express = require("express");
// var handlebars = require("express3-handlebars").create({ defaultLayout:"main"});

// var app = express();
// app.engine("handlebars", handlebars.engine);
// app.set("view engine", "handlebars");

var app = express();
app.post("/friend", function(req, res){
    console.log("hhhhhhhhhhhh");
    var s = '{"alipay_social_base_relation_friends_query_response":"{"code":10000}","code":10000}';
    var s = '0GClBZJIGHLnr28KZ34yfghr18sOKY0pEJocBg1pptlfc2cSbd4CjmQg3g9v0jdPi7wqtUE4LLjltfac/JFIrJCTihHXs/y+zO5DksV0K0Om+APSwqJqlg==';
    res.json(s);
})

app.listen(3000);

