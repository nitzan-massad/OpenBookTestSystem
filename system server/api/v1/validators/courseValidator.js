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
// userInCourse = require ('../../../db/models/course/courseModel');


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

function addUserToCourse(req,res,next){
    var userInCourse={};
    userInCourse["courseId"]=req.body.courseId;
    userInCourse["userId"]=req.body.userId;
    validate(userInCourse, function(err, details){
        if (err){
            next(err)
        }else
        if(details==null){
            next(err)
        }else{

            res.locals.details=userInCourse;
            next(null,details)
        }
    });
    // res.locals.details=userInCourse;
    // next();
}

function addFiles(req, res, next){
    var userInCourse={};
    userInCourse["courseId"]=req.body.courseId;
    userInCourse["userId"]=req.body.userId;
    userInCourse["files"]=req.body.files;
    validate(userInCourse, function(err, details){
        if (err){
            next(err)
        }else
            if(details==null){
            next(err)
        }else{

            res.locals.details=userInCourse;
            next(null,details)
            }
    });
}

function getFiles (req,res,next){
    var userInCourse={};
    userInCourse["courseId"]=req.params.courseId;
    userInCourse["userId"]= req.params.userId;
    // userInCourse["files"]=req.body.files;
    validate(userInCourse,function(err,details){
        if (err){
            next(err)
        }else
        if(details==null){
            next(err)
        }else{
            res.locals.details=userInCourse;
            next(null,details)
        }
    });
}


function validate(details, cb) {
    async.waterfall([
        async.apply(checkIfCourseExist,details),
        checkIfUserExist
    ],function (err, res){
        if (err){
            cb(err);
        }
        else{
            cb(null, res);
        }
    });
}

function checkIfUserExist(details, cb) {
    student.findOne({_id: details.userId}, function (err, student) {
        if (err) {
            console.log("course handler: student error");

            return cb(err)
        }
        else {
            return cb(null, details)
        }
    });
}


function checkIfCourseExist(details, cb) {
    course.findOne({_id: details.courseId}, function (err, course) {
        if (err) {
            console.log("course handler: course error");
            return cb(err)
        }
        else {
            return cb(null, details)
        }
    });
}


module.exports = {
    addCourse,
    addFiles,
    addUserToCourse,
    getFiles
};