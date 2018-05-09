

var debug = require('debug');
var error = debug('truckHandler:error');
var log = debug('truckHandler:log');

var mongoose = require('mongoose'),
    student = require('../../../db/models/student/studentModel');

var bcrypt = require('bcrypt');
var async = require('async');
const saltRounds = 10;

function register(userDetails, callback){
    var newUser = new student(userDetails);
    newUser.save(function (err, student){
        if(err){
            console.log("error registering user: "+ err.message);
            return callback(err);
        }
        else{
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
                var toReturn= {
                    "_id": student._id,
                    "firstName": student.firstName,
                    "lastName": student.lastName,
                    "username": student.username,
                    // "password": student.password,
                    "email": student.email,
                    "status": student.status,
                    "succes":true
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

module.exports = {
    register,
    login
};