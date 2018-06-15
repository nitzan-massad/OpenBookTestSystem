/**
 * This module routes any URL path that starts with: '.../api/v1/student/'
 */

'use strict';

var debug = require('debug');
// var error = debug('driverRoutes:error');
// var log = debug('driverRoutes:log');

var express = require('express');
var router = express.Router();

// controller
var studentController = require('../controllers/studentController');

// validator
var studentValidator = require('../validators/studentValidator');

router.route('/register')
    .post(
        studentValidator.register,
        studentController.register); // Register new driver

router.route('/login')
    .post(
        studentValidator.login,
        studentController.login );

router.route('/:userId/getMessages')
    .get(
        studentValidator.getMessages,
        studentController.getMessages);

router.route('/readMessage')
    .post(
        studentValidator.readMessage,
        studentController.readMessage);


module.exports = router;


