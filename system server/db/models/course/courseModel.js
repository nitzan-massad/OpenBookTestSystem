
'use strict';

var debug = require('debug');
// var error = debug('truckModel:error');
// var log = debug('truckModel:log');

var mongoose = require('mongoose')

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Course = new Schema({
    // _id: String,
    courseName:{ type: String, required: true},
    courseNumber:  { type: String, required: true, unique: true },
    courseTestDateFirst: { type: Date, required: true},
    courseTestDateSecond: { type: Date, required: true }
});

module.exports = mongoose.model('Course', Course);


