var express = require("express");
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });

function getWeatherData() {
    return {
        locations: [
            {
                name: 'Portland',
                forecastUrl: "http://111111111111111111",
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: "Overcast",
                temp: "54.1 F (12.3 C)",
            },
            {
                name: 'Bend',
                forecastUrl: "http://111111111111111111",
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
                weather: "Overcast",
                temp: "54.1 F (12.3 C)",
            },
            {
                name: 'Manzanita',
                forecastUrl: "http://111111111111111111",
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
                weather: "Overcast",
                temp: "54.1 F (12.3 C)",
            },
        ]
    }
}

var app = express();
// app.get('/headers', function(req,res){
//     res.set('Content-Type','text/plain');
//     var s = '';
//     for(var name in req.headers)
//         s += name + ': ' + req.headers[name] + '\n';
//     res.send(s);
// });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(function(req, res, next) {
    if(!res.locals.partials) {
        res.locals.partials = {};
    }
    res.locals.partials.weather = getWeatherData();
    next();
});

app.get('/weather', function(req,res){
    res.render("home", {layout: null});
});

app.listen(3000);