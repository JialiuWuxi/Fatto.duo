var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');
const axios = require('axios');

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
 
    let config = {headers: { Authorization: accessToken,}};

    try {
      let response = await axios.get(`${process.env.API_HOSTNAME}/api/v2/me`, config);
      parms.lgUserRole = response.data.jobTitle;  
    } catch (error) {
      console.error(error);
    }    
    parms.lgUserName = userName;
  } else {
    res.redirect('/');
  }
  res.render('index', parms);
});


module.exports = router;
