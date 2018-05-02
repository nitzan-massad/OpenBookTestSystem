/**
 * This module routes any URL path that starts with: '.../api/'
 */

'use strict';

// var debug = require('debug');
// var error = debug('apiRoutes:error');
// var log = debug('apiRoutes:log');

var express = require('express');
var router = express.Router();



router.get('/login', function (req, res) {
  res.render('admin/pages/login.ejs');
});


//Dashboard//
router.get('/dashboard', function (req, res) {

 res.render('admin/pages/dashboard.ejs',{
   usersCount:'2222'
 });
 
});

//Active Users//
router.get('/activeUsers', function (req, res) {
  
  res.render('admin/pages/activeUsers.ejs',{
    users:data.getUserMinimizeData()
  });
});

//Unread Messages
router.get('/messages', function (req, res) {
  res.render('admin/pages/unreadMessages.ejs',{
   messages: data.get24HMessages()
  });
});

//Assets//
router.get('/assets', function (req, res) {
  res.render('admin/pages/assets.ejs',{
   assets:data.getAssetMinimizeData()
  });
});

//Assets Types//
router.get('/assetType', function (req, res) {
  res.render('admin/pages/assetType.ejs',{
   assetType:data.getAssetTypes()
  });
});
//Assets Sub Type//
router.get('/assetSubType', function (req, res) {
  res.render('admin/pages/assetSubType.ejs',{
   assetSubType:data.getAssetSubTypes()
  });
});
//Leads //
router.get('/leads', function (req, res) {
  res.render('admin/pages/importLeads.ejs',{
    importedLeads:[]
   
  });
});
//Notify//
router.get('/pushNotification', function (req, res) {
  res.render('admin/pages/pushNotification.ejs',{
   notifications:[]
  });
});

//User Details//
router.get('/userDetails', function (req, res) {
  res.render('admin/pages/activeUserDetails.ejs',{
  });
});

//Asset Details//
router.get('/assetDetails', function (req, res) {
  res.render('admin/pages/assetDetails.ejs',{
   
  });
});

//Asset Types Details//
router.get('/assetTypeDetails', function (req, res) {
  res.render('admin/pages/assetTypeDetails.ejs',{
  });
});

//Asset SubTypes Details//
router.get('/assetSubTypeDetails', function (req, res) {
  res.render('admin/pages/assetSubTypeDetails.ejs',{
   
  });
});

module.exports = router;



