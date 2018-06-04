
'use strict';

var debug = require('debug');
// var error = debug('truckModel:error');
// var log = debug('truckModel:log');

var mongoose = require('mongoose')

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var fileSchema=new Schema({
    fileName: String,
    fileLink:{type: String, unique:true}
},{_id:false});

var userInCourse = new Schema({
    userId: {type:ObjectId},
    courseId:{type:ObjectId, ref:'Course'},
    files: [
        // {
        //     fileName: String,
        //     fileLink:{type: String, unique:true}
            fileSchema
        // }
    ]

});


userInCourse.index({userId:1, courseId:1},{unique: true});

module.exports = mongoose.model('userInCourse', userInCourse);


