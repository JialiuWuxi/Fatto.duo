var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');
const axios = require('axios');

/* GET home page. */
router.get('/', async function(req, res, next) {
    const parms = {};
    const accessToken = await authHelper.getAccessToken(req.cookies, res);
    const userName = req.cookies.graph_user_name;
  
    if (accessToken && userName) {
      parms.lgUserName = userName;
    } else {
      res.redirect('/')
    }    

    let config = {headers: { Authorization: accessToken,}};

    try {
      let response = await axios.get(`${process.env.API_HOSTNAME}/api/v2/branches`, config);
      parms.caseBranchOption = response.data.value;
      response = await axios.get(`${process.env.API_HOSTNAME}/api/v2/casetype`, config);
      parms.caseCategoryOption = response.data.value;    
      response = await axios.get(`${process.env.API_HOSTNAME}/api/v2/departments?branchid=1`, config);
      parms.caseDepartmentOption = response.data.value;
      response = await axios.get(`${process.env.API_HOSTNAME}/api/v2/clients`, config);
      parms.clientList = response.data.value;  
      let clientTitle = response.data.value[0].fields.Title;
      response = await axios.get(`${process.env.API_HOSTNAME}/api/v2/groups?search=${encodeURIComponent(clientTitle)}`, config);
      parms.clientContactList = response.data.value;
      response = await axios.get(`${process.env.API_HOSTNAME}/api/v2/me`, config);
      parms.lgUserRole = response.data.jobTitle;    
      //response = await axios.get(`${process.env.API_HOSTNAME}/api/v2/clients/`);

  
    } catch (error) {
      console.error(error);
    }
    res.render('matter', parms);
});
  
module.exports = router;