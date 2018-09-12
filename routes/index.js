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


router.get('/index', async function(req, res, next) {
  let parms = {};
  const accessToken = await authHelper.getAccessToken(req.cookies, res);
  const userName = req.cookies.graph_user_name;

  if (accessToken && userName) {
    parms.lgUserName = userName;
  } else {
    parms.signInUrl = authHelper.getAuthUrl();
  }
  res.render('index', parms);
});


module.exports = router;
