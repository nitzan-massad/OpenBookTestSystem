
'use strict';

var debug = require('debug');
// var error = debug('truckModel:error');
// var log = debug('truckModel:log');

var mongoose = require('mongoose')

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Student = new Schema({
        // _id: String,
        firstName: String,
        lastName: String,
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        status: { type: String, required: true },
        email: String
    });

module.exports = mongoose.model('Student', Student);


