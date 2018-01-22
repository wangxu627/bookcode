var express = require("express");
var eh = require("express-handlebars");
var moments = require("./moments");

handlebars = eh.create({
    defaultLayout:"main",
    helpers:{
        equals: function(lhs, rhs, options) {
            if(lhs == rhs) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        }
    }}
);
//handlebars = eh.create();
// eh.registerHelper("ifCond", function(v1, v2, options) {
//     if(v1 == v2) {
//         return options.fn(this);
//     }
//     return options.inverse(this);
// });
var app = express();
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 3000);

app.use(express.static(__dirname + "/public"));
app.get("/", function(req, res) {
    var articles = moments.getArticles();
    res.render("home", {articles:articles});
});
app.get("/admin_wx", function(req, res) {
    res.render("admin_wx");
});
app.use(function(req, res, next) {
    res.status(404);
    res.render("404");
});
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(500);
    res.render("500");
});
app.listen(3000, function() {
    console.log("Server started.");
});

