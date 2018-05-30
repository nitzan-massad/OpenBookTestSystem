
'use strict';

var debug = require('debug');
// var error = debug('truckModel:error');
// var log = debug('truckModel:log');

var mongoose = require('mongoose')

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var userInCourse = new Schema({
    userId: {type:ObjectId},
    courseId:{type:ObjectId},
    files: [
        {
            fileName: String,
            fileLink:String
        }
    ]

});


userInCourse.index({userId:1, courseId:1},{unique: true});

module.exports = mongoose.model('userInCourse', userInCourse);


