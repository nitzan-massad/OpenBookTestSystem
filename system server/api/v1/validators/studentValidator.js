'use strict';

var debug = require('debug');
var error = debug('studentValidator:error');
var log = debug('studentValidator:log');

var mongoose = require('mongoose'),
    student = require ('../../../db/models/student/studentModel'),
    userInCourse = require('../../../db/models/course/userInCourseModel');

var async = require('async');
var bcrypt = require('bcrypt');
const saltRounds = 10;

function register(req, res, next)
{
    var userDetails={};
    userDetails["firstName"]=req.body.firstName;
    userDetails["lastName"]=req.body.lastName;
    userDetails["username"]=req.body.username;
    var password=req.body.password;
    var hashPassword= bcrypt.hashSync(password,saltRounds);
    userDetails["password"]=hashPassword;
    userDetails["status"]=req.body.status;
    userDetails["email"]=req.body.email;

    res.locals.userDetails=userDetails;
    next();
}



function login(req, res, next){
    //console.log("test-1");
    //console.log(req.body);
    if ((!req.body.username) || (!req.body.password)){
        // console.log("test0")
        var msg="invalid user name or password";
        error(msg);
        next(new Error(msg));
    }
    //console.log("test1")
    next()
}

function getMessages(req,res,next){
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

function readMessage(req,res,next){
    var details={};
    details["userId"]=req.body.userId;
    details["messageId"]=req.body.messageId;
    if (!req.body.userId || !req.body.messageId) {
        var msg = 'invalid parameters';
        error(msg);
        next(new Error(msg));
    }
    userInCourse.findOne({userId:details.userId,"messages._id":details.messageId },function(err,userInCourse){
        if (err){
            next(err);
        }else{
            if (!userInCourse){
                var msg = 'invalid user id or msg id';
                error(msg)
                next(new Error(msg))
            }else{
                console.log(userInCourse)
                res.locals.details=details;
                next();
            }
        }
    });

}


module.exports = {
    register,
    login,
    getMessages,
    readMessage
};