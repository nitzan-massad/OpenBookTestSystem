/**
 * This module routes any URL path that starts with: '.../api/v1/global/'
 */

'use strict';

var debug = require('debug');
var error = debug('globalRoutes:error');
var log = debug('globalRoutes:log');

var express = require('express');
var router = express.Router();

// controller
var globalController = require('../controllers/globalController');

// validator
var globalValidator = require('../validators/globalValidator');

router.route('/changePassword')
    .put(globalValidator.changePassword, globalController.changePassword);


router.route('/forgotPassword')
    .put(globalValidator.forgotPassword,globalController.forgotPassword); 



module.exports = router;