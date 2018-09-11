var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('matter');
});
  

  
  
module.exports = router;