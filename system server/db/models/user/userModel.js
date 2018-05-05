
'use strict';

var debug = require('debug');
var error = debug('userModel:error');
var log = debug('userModel:log');

var mongoose = require('mongoose')
require('mongoose-type-url'); // for url types

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


var User = new Schema(
{
    fb_id: {
        type: String,
        unique:true
    },

    full_name: { 
        type: String
    },
    phone: {
        type: String
    },
    image_url: {
        type: String,
    },

    device_details:{
        android_token: {type: [String]},
        ios_token: {type: [String]},
        badge_counter:{type: Number},
        allow_push:{type: Boolean,default:true}
    },

    status: {
        type: String,
        enum: ['active', 'deleted'],
        default: 'active'
    },
    
}, 
{
    timestamps : true
});

module.exports = mongoose.model('User', User);


