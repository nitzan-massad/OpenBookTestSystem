/**
 * This module routes any URL path that starts with: '.../api/v1/course/'
 */

'use strict';

var debug = require('debug');
// var error = debug('driverRoutes:error');
// var log = debug('driverRoutes:log');

var express = require('express');
var router = express.Router();

// controller
var courseController = require('../controllers/courseController');

// validator
var courseValidator = require('../validators/courseValidator');

router.route('/addCourse')
    .post(
        courseValidator.addCourse,
        courseController.addCourse);

router.route('/addFiles')
    .post(
        courseValidator.addFiles,
        courseController.addFiles);


router.route('/addUserToCourse')
    .post(
        courseValidator.addUserToCourse,
        courseController.addUserToCourse);

router.route('/:courseId/:userId/getfiles')
    .get(
        courseValidator.getFiles,
        courseController.getFiles);

router.route('/:userId/getcourses')
    .get(
        courseValidator.getCourses,
        courseController.getCourses);

router.route('/sendMessageToCourse')
    .post(
        courseValidator.sendMessageToCourse,
        courseController.sendMessageToCourse);




module.exports = router;
