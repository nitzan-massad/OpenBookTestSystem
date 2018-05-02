

var debug = require('debug');
// var error = debug('truckHandler:error');
// var log = debug('truckHandler:log');

var mongoose = require('mongoose'),
    course = require('../../../db/models/course/courseModel');



function addCourse(userDetails, callback){
    var newCourse = new course(userDetails);
    newCourse.save(function (err, course){
        if(err){
            console.log("error adding course: "+ err.message);
            return callback(err);
        }
        else{
            return callback(null, course);
        }
    });
};


module.exports = {
    addCourse

};