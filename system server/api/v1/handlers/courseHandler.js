

var debug = require('debug');
// var error = debug('truckHandler:error');
// var log = debug('truckHandler:log');

var mongoose = require('mongoose'),
    course = require('../../../db/models/course/courseModel');
    userInCourse = require('../../../db/models/course/userInCourseModel');
    student = require('../../../db/models/student/studentModel');



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

function addUserToCourse(details,cb) {
    student.findOne({_id: details.userId}, function (err, student) {
        if (err) {
            callback(err)
        }
        else if (!student) {
            console.log("wrong student id");
        }
        else {
            var newUserInCourse = new userInCourse(details);
            newUserInCourse.save(function (err, userInCourse) {
                if (err) {
                    console.log("error adding user to: " + err.message);
                    return cb(err);
                }
                else {
                    return cb(null, userInCourse);
                }

            });
        }
    });
}

function addFiles(details, callback){
    // var userInCourse= new userInCourse(details);
    student.findOne({_id: details.userId},function(err, student) {
        if (err) {
            callback(err)
        }
        else if (!student) {
            console.log("wrong student id");
        }
        else{
            course.findOne({_id: details.courseId}, function (err, course) {
                if (course) {
                    // userInCourse.findOne({userId: details.userId}, function (err, userInCourse) {
                    // // userInCourse.findOne({userId:details.userId}, function (err, userInCourse) {
                    //     if (userInCourse) {
                    //         userInCourse.files.push(details.files);
                    userInCourse.findOneAndUpdate({userId: details.userId, courseId: details.courseId },{files:details.files},function(err,userInCourse){
                        if (userInCourse) {
                                console.log(userInCourse);
                        }
                        else if (err){
                            console.log(err.message);
                        }
                        else if(!userInCourse){
                            console.log("fghfgh");
                        }
                    });
                }
            });

        }


    });
}


module.exports = {
    addCourse,
    addFiles,
    addUserToCourse

};