var connect = require("connect");
var logger = require("./middleware/logger");
var router = require("./middleware/router");

var routes = {
    GET: {
        '/users': function(req, res) {
            res.end("tobi, loki, ferret");
        },
        "/user/:id": function(req, res, id) {
            res.end("user " + id);
        }
    },
    DELETE: {
        "/user/:id": function(req, res, id) {
            res.end("deleted user " + id);
        }
    }
};

// connect()
//     .use(logger(":method :url :statusCode"))
//     .use(router(routes))
//     .listen(3000);

connect().use((req, res)=>{
        foo();
    }).listen(3001);