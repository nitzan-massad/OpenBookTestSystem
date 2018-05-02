'use strict';

var debug = require('debug');
var error = debug('courseValidator:error');
var log = debug('courseValidator:log');

var mongoose = require('mongoose'),

    driver = require('../../../db/models/driver/driverModel'),
    truck = require('../../../db/models/truck/truckModel'),
    offer = require('../../../db/models/dispatcher/offerModel'),
    savedOffer = require('../../../db/models/driver/savedOfferModel'),

    course = require ('../../../db/models/course/courseModel');

var async = require('async');
var bcrypt = require('bcrypt');
const saltRounds = 10;

function addCourse(req, res, next)
{
    var courseDetails={};
    courseDetails["courseName"]=req.body.courseName;
    courseDetails["courseNumber"]=req.body.courseNumber;
    courseDetails["courseTestDateFirst"]=req.body.courseTestDateFirst;
    courseDetails["courseTestDateSecond"]=req.body.courseTestDateSecond;

    res.locals.courseDetails=courseDetails;
    next();
}



module.exports = {
    addCourse
};