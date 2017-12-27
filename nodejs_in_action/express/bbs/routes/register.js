var express = require('express');
var router = express.Router();

// router.form = function(req, res) {
//     res.render("register", {title: "Register"});
// };

router.get('/', function(req, res, next) {
  res.render("register", {title: "Register"});
});

router.post('/submit', function(req, res, next) {
    res.render("register", {title: "Register"});
});

module.exports = router;