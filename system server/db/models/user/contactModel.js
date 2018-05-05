
'use strict';

var debug = require('debug');
var error = debug('contactModel:error');
var log = debug('contactModel:log');

var mongoose = require('mongoose')
require('mongoose-type-url'); // for url types

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Contact = new Schema(
{
    user_id:{
        type:ObjectId
    },

    full_name: { 
        type: String
    },
    email: {
        type: String
    },
    message: {
        type: String,
    },
}, 
{
    timestamps : true
});

Contact.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email); 
 }, 'InValid Email address')

module.exports = mongoose.model('Contact', Contact);


