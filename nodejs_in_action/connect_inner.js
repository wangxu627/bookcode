var connect = require("connect");
var bodyParser = require('body-parser');

var app = connect()
            //.use(bodyParser.urlencoded({ extended: true }))
            //.use(bodyParser.multipart())
            //.use(connect.limit("32kb"))
            .use(bodyParser.json({limit: '32kb'}))
            .use(connect.query())
            .use(function(req, res) {
                console.log("Registered new user: " + req.body);                
                res.end("Registered new user: " + req.body.username);
            })
            .listen(3000);