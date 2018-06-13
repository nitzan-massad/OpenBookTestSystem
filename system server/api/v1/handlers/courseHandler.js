
var debug = require('debug');
// var error = debug('truckHandler:error');
// var log = debug('truckHandler:log');

var mongoose = require('mongoose'),
    course = require('../../../db/models/course/courseModel');
userInCourse = require('../../../db/models/course/userInCourseModel');
student = require('../../../db/models/student/studentModel');

var async = require('async');


function addCourse(userDetails, callback) {
    var newCourse = new course(userDetails);
    newCourse.save(function (err, course) {
        if (err) {
            console.log("error adding course: " + err.message);
            return callback(err);
        }
        else {
            return callback(null, course);
        }
    });
};

function addUserToCourse(details, cb) {
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


function addFiles(details, cb) {
    userInCourse.findOneAndUpdate({userId: details.userId, courseId: details.courseId},
        {
            $addToSet:
                {
                    files: {$each: details.files}
                }

        }, {new: true}, function (err, userInCourse) {
            if (err) {
                console.log("course handler: user in course error failed");
                cb(err)
            }
            else {
                cb(null, userInCourse)
            }

        });
}

function getFiles(details, cb) {
    userInCourse.findOne({userId: details.userId, courseId: details.courseId},
       function (err, userInCourse) {
            if (err) {
                console.log("course handler: getting files of user in course failed");
                cb(err)
            }
            else {
                cb(null, userInCourse.files)
            }

        });
}

function getCourses(user,cb){
    userInCourse.find({userId: user._id}).populate('courseId').lean().exec(
        function (err, courses) {
            if (err) {
                console.log("course handler: getting files of user in course");
                cb(err)
            }
            else {
               // delete courses[0].files;
                var reformat = courses.map(i=>({
                    // _id:i._id,
                        "courseId":i.courseId
                        // "userId":i.userId
                }));
                cb(null, reformat)
            }
        });
}

function sendMessageToCourse(details,cb){
    userInCourse.updateMany(
        {courseId: details.courseId},
        {$push:
                {
                    messages:{message : details.message}
                }
        },function(err, succes){
            if (err){
                console.log("course handler: sending to course message failed");
                cb(err);
            }
            else{
                console.log("course handler: success sending message to course");
                cb(null, succes);
            }
        }
    );
}




module.exports = {
    addCourse,
    addFiles,
    addUserToCourse,
    getFiles,
    getCourses,
    sendMessageToCourse

};