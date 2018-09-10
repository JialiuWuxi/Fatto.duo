var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const data = {};
  data.lgUserName = 'Jia Liu';
  data.lgUserRole = 'GMP'
  res.render('index', data);
});

module.exports = router;
