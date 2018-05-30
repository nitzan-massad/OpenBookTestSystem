
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
                    files:{$each: details.files}
                }

        }, {new: true}, function (err, userInCourse) {
            if (err) {
                console.log("course handler: user in course error");
                cb(err)
            }
            else {
                cb(null, userInCourse)
            }

        });
}

function getFiles(details, cb) {
    // var conditions= {userId:details.userId, courseId:details.courseId}
    userInCourse.findOne({userId: details.userId, courseId: details.courseId},
       function (err, userInCourse) {
            if (err) {
                console.log("course handler: getting files of user in course");
                cb(err)
            }
            else {
                cb(null, userInCourse.files)
            }

        });
}

// function addFiles(details, cb) {
//     async.waterfall([
//         async.apply(checkIfCourseExist,details),
//         checkIfUserExist,
//         addFilesAfterCheck
//     ],function (err, result){
//         if (err){
//             cb(err);
//         }
//         else{
//             cb(null, result);
//         }
//     });
// }
//
//
// function checkIfCourseExist(details, cb) {
//     course.findOne({_id: details.courseId}, function (err, course) {
//         if (err) {
//             console.log("course handler: course error");
//             return cb(err)
//         }
//         else {
//             return cb(null, details)
//         }
//     });
// }
//
// function checkIfUserExist(details, cb) {
//     student.findOne({_id: details.userId}, function (err, student) {
//         if (err) {
//             console.log("course handler: student error");
//
//             return cb(err)
//         }
//         else {
//             return cb(null, details)
//         }
//     });
// }


module.exports = {
    addCourse,
    addFiles,
    addUserToCourse,
    getFiles

};