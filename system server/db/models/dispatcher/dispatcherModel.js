
'use strict';

var debug = require('debug');
var error = debug('dispatcherModel:error');
var log = debug('dispatcherModel:log');

var mongoose = require('mongoose')

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Dispatcher = new Schema(
{

    contact_person_first_name:{
        type: String
    },
    contact_person_last_name: { 
        type: String
    },

    company:{
        type: String
    },
    company_logo_url:{
        type:String
    },

    phone:{
        type: String
    },
    fax:{
        type: String
    },

    email:{
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    commodity: {
        type: String
    },

    company_number_business_id: {
        type: String
    },

    company_address: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'deleted'],
        default: 'active'
    },
    last_login: Date
    
}, 
{
    timestamps : true
});
//exports.schema = Dispatcher;
module.exports = mongoose.model('Dispatcher', Dispatcher);


