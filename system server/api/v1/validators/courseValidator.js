'use strict';

var debug = require('debug');
var error = debug('courseValidator:error');
var log = debug('courseValidator:log');

var mongoose = require('mongoose'),

    course = require ('../../../db/models/course/courseModel'),
    Student = require ('../../../db/models/student/studentModel');


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


function getCourses(req,res,next){
    var userId = req.params.userId;
    if (!userId) {
        var msg = 'invalid parameters';
        error(msg);
        next(new Error(msg));
    }
    student.findOne({_id:userId},function(err,user){
        if (err){
            next(err);
        }else{
            if (!user){
                var msg = 'invalid user id';
                error(msg)
                next(new Error(msg))
            }else{
                res.locals.details=user;
                next();
            }
        }
    });
}


function sendMessageToCourse(req,res,next){
    var array={};
    array["courseId"]=req.body.courseId;
    array["userId"]=req.body.userId;
    array["message"]=req.body.message;
    if ( !array["courseId"] || !array["userId"] || !array["message"]){
        var msg = 'invalid parameters';
        error(msg);
        next(new Error(msg));
    }
    validateToSendMessage(array,function(err,details){
        if (err){
            next(err)
        }else
        if(details==null){
            next(err)
        }else{
            res.locals.details=array;
            next(null,details)
        }
    });
}


// ***************************************** check if user ss lecturer and course exist

function validateToSendMessage(details,cb){
    async.waterfall([
        async.apply(checkIfCourseExist,details),
        checkIfUserLecturer
    ],function (err, res){
        if (err){
            cb(err);
        }
        else{
            cb(null, res);
        }
    });
}

// ****************************************check if user is lecturer

function checkIfUserLecturer(details, cb) {
    student.findOne({_id: details.userId, status: "lecturer"}, function (err, lecturer) {
        if (err) {
            console.log("course handler: no such lecturer");
            return cb(err)
        }
        else {
            console.log(details.userId)
            console.log(lecturer)
            return cb(null, details)
        }
    });
}

// ****************************************validate user and course  exist

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

// ****************************************check if user exist

function checkIfUserExist(details, cb) {
    student.findOne({_id: details.userId}, function (err, student) {
        if (err) {
            console.log("course handler: student error");
            return cb(err)
        }
        else {
            console.log(details.userId)
            console.log(student)
            return cb(null, details)
        }
    });
}

// ****************************************check if course exist

function checkIfCourseExist(details, cb) {
    course.findOne({_id: details.courseId}, function (err, course) {
        if (err) {
            console.log("course handler: course error");
            return cb(err)
        }
        else {
            console.log(course)
            return cb(null, details)
        }
    });
}


module.exports = {
    addCourse,
    addFiles,
    addUserToCourse,
    getFiles,
    getCourses,
    sendMessageToCourse
};