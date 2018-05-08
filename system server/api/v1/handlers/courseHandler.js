

var debug = require('debug');
// var error = debug('truckHandler:error');
// var log = debug('truckHandler:log');

var mongoose = require('mongoose'),
    course = require('../../../db/models/course/courseModel');
    userInCourse = require('../../../db/models/course/userInCourseModel');



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

function addFiles(details, callback){
    // var userInCourse= new userInCourse(details);
    userInCourse.findOne
            ({"user_id":details.courseId
            ,"course_id":details.userId},function (err, userInCourse){
                if (err){
                    callback(err)
                }
                else if (!userInCourse){
                    var msg = "no such course or user id";
                    error(msg);
                    callback(new Error(msg));
                }
                }
                else{
                userInCourse
    })

}


module.exports = {
    addCourse,
    addFiles

};