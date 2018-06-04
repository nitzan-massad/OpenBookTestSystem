

'use strict';

var debug = require('debug');
// var error = debug('driverController:error');
// var log = debug('driverController:log');

var courseHandler = require('../handlers/courseHandler');
var courseValidator = require('../validators/courseValidator');


/**
 * Creates new course
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function addCourse(req, res, next) {
    courseHandler.addCourse(res.locals.courseDetails, function (err,course){
        if(err){
            next(err)
        }
        else{
            res.json({course})
        }
    });
}

function addUserToCourse(req,res,next){
    courseHandler.addUserToCourse(res.locals.details, function (err,userInCourse){
        if(err){
            next(err)
        }
        else{
            res.json({userInCourse})
        }
    });
}

function addFiles(req,res,next){
    courseHandler.addFiles(res.locals.details, function (err,userInCourse){
        if(err){
            next(err)
        }
        else{
            res.json({userInCourse})
        }
    });
}

function getFiles(req,res,next){
    courseHandler.getFiles(res.locals.details, function (err,files){
        if(err){
            next(err)
        }
        else{
            res.json({files})
        }
    });
}

function getCourses(req,res,next){
    courseHandler.getCourses(res.locals.details, function (err,courses){
        if(err){
            next(err)
        }
        else{
            res.json({courses})
        }
    });
}



module.exports =
    {
        addCourse,
        addFiles,
        addUserToCourse,
        getFiles,
        getCourses

    };



