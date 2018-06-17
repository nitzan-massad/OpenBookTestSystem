var debug = require('debug');
var error = debug('truckHandler:error');
var log = debug('truckHandler:log');

var mongoose = require('mongoose'),
    student = require('../../../db/models/student/studentModel'),
    userInCourse = require('../../../db/models/course/userInCourseModel');


var bcrypt = require('bcrypt');
var async = require('async');
const saltRounds = 10;

function register(userDetails, callback) {
    var newUser = new student(userDetails);
    newUser.save(function (err, student) {
        if (err) {
            console.log("error registering user: " + err.message);
            return callback(err);
        }
        else {
            return callback(null, student);
        }
    });
};

function login(username, password, callback) {
    // var hashPassword= bcrypt.hashSync(password, saltRounds);
    //console.log("test3");
    student.findOne({"username": username}, function (err, student) {
        if (err) {
            callback(err)
        }
        else if (!student) {
            var msg = 'verification failed: wrong username or password';
            error(msg);
            callback(new Error(msg));
        }
        else {
            var isCorrectPassword = bcrypt.compareSync(password, student.password);
            if (isCorrectPassword) {
                console.log("user: " + student.firstName + " " + student.lastName + " successfully logged in");
                var toReturn = {
                    "_id": student._id,
                    "firstName": student.firstName,
                    "lastName": student.lastName,
                    "username": student.username,
                    // "password": student.password,
                    "email": student.email,
                    "status": student.status,
                    "succes": true
                }
                return callback(null, toReturn);
            }
            else {
                var msg = 'verification failed: wrong username or password';
                error(msg);
                callback(new Error(msg));
            }
        }
    });
}

function getMessages(user, cb) {
    userInCourse.find({userId: user._id}).populate('courseId').lean().exec(
        function (err, userInCourse) {
            console.log(userInCourse)
            if (err) {
                console.log("student handler: getting messages failed");
                cb(err)
            }
            else {
                var reformat = userInCourse.map(i =>
                    ({
                        "course": i.courseId.courseName,
                        "messages": i.messages

                        // "userId": i.userId
                    }));
                console.log(reformat)
                console.log("********************************")
                var list = [];
                for (i=0;i<reformat.length;i++ ){
                    for (j=0;j<reformat[i].messages.length;j++ ) {
                        list.push({
                            course: reformat[i].course,
                            message: reformat[i].messages[j].message,
                            isRead:reformat[i].messages[j].isRead,
                            msgid: reformat[i].messages[j]._id
                        });
                    }
                }
                console.log(list)
                cb(null, list)
            }
        });
}
function readMessage(details,cb){
    userInCourse.update({userId:details.userId,"messages._id":details.messageId},
        {
            $set:
                {
                    "messages.$.isRead": true
                }

        }, {new: true}, function (err, userInCourse) {
            if (err) {
                console.log("course handler: user in course error failed");
                cb(err)
            }
            else {
                console.log("message "+ details.messageId+" marked as read");
                cb(null, userInCourse)
            }

        });
}

module.exports = {
    register,
    login,
    getMessages,
    readMessage
};