var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});


router.get('/auth', function(req, res, next) {
  const parms = {};
  parms.signInUrl = authHelper.getAuthUrl();
  res.redirect(parms.signInUrl);
});


module.exports = router;
