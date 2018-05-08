
'use strict';

var debug = require('debug');
// var error = debug('truckModel:error');
// var log = debug('truckModel:log');

var mongoose = require('mongoose')

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var userInCourse = new Schema({
    userId: {type:ObjectId,  unique: true},
    courseId:{type:ObjectId, unique: true},
    files: [{
        file:{
            fileName:String,
            fileLink:String
        }
    }]

});

module.exports = mongoose.model('userInCourse', userInCourse);


