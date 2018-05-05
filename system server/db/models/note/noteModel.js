
'use strict';

var debug = require('debug');
var error = debug('noteModel:error');
var log = debug('noteModel:log');

var mongoose = require('mongoose')

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Note = new Schema(
{
    user_id:{
        type:ObjectId
    },
    place_id:{
        type:ObjectId
    },

    title :{
        type: String,
    },

    body :{
        type: String,
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

module.exports = mongoose.model('Note', Note);


