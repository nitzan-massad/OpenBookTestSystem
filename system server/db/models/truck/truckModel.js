
'use strict';

var debug = require('debug');
var error = debug('truckModel:error');
var log = debug('truckModel:log');

var mongoose = require('mongoose')

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Truck = new Schema(
{
    license_plate:{
        type: String,
        unique: true
    },

    discharge_direction: {
        type: String,
        enum: ['back', 'side','both'],
        default: 'back'
    },

    media:[{
       // media_type: String, //image, might be video/gif later...
        media_description: {//license_copy/insurance_copy/truck_image
            type: String,
            enum: ['insurance',
                   'comprehensive_insurance','third_party_insurance',
                   'property_insurance','truck'],
            default: 'license'
        }, 
        media_url: String,
        status: {
            type: String,
            enum: ['active', 'deleted'],
            default: 'active'
        },
    }],

    //license_image_url
    //insureacnec_image_url
    //truck_image_url

    truck_weight_limit:{
        type: Number

    },
    truck_type:{
        type: String,
        enum: ['above_12', 'above_15'],
        default: 'above_12'

    },
    trunk_length: Number,

    has_electronic_jack : Boolean,
    has_driver_assistance : Boolean,
    has_loading_ramp : Boolean,
    has_hazardous_materials_permit : Boolean,
    
    // device_details:{
    //     android_tokens: {type: [String]},
    //     ios_tokens: {type: [String]},
    //     badge_counter:{type: Number},
    //     allow_push:{type: Boolean,default:true}
    // },

    status: {
        type: String,
        enum: ['active', 'deleted'],
        default: 'active'
    },
    //last_login: Date
    
},
{
    timestamps : true
});

module.exports = mongoose.model('Truck', Truck);


