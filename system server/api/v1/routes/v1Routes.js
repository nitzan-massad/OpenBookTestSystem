/**
 * This module routes any URL path that starts with: '.../api/v1/'
 */

'use strict';

var debug = require('debug');
var error = debug('v1Routes:error');
var log = debug('v1Routes:log');

var express = require('express');
var router = express.Router();

// routes
var driverRoutes = require('./driverRoutes'); 
var dispatcherRoutes = require('./dispatcherRoutes'); 
var truckRoutes = require('./truckRoutes');
var globalRoutes = require('./globalRoutes');

var studentRoutes = require('./studentRoutes');

// controllers
var requestController = require('../controllers/requestController');


// All the API requests will go through here first of all
//router.all('*', requestController.verifyHeaders);

router.use('/driver/', driverRoutes);
router.use('/dispatcher/', dispatcherRoutes);
router.use('/truck/', truckRoutes);

router.use('/global/', globalRoutes);

router.use('/student',studentRoutes);

module.exports = router;