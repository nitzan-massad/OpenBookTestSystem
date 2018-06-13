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
var truckRoutes = require('./truckRoutes');
var globalRoutes = require('./globalRoutes');

var studentRoutes = require('./studentRoutes');
var courseRoute = require('./courseRoute');


// controllers
var requestController = require('../controllers/requestController');


// All the API requests will go through here first of all
//router.all('*', requestController.verifyHeaders);

router.use('/truck/', truckRoutes);

router.use('/global/', globalRoutes);

router.use('/student',studentRoutes);

router.use('/course', courseRoute);

module.exports = router;