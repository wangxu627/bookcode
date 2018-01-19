var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(function(req, res, next){
    console.log(JSON.stringify(req.headers));
    console.log(JSON.stringify(req.body));
    res.send('ok');
});

app.listen(3000);