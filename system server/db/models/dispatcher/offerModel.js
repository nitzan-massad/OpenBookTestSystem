
'use strict';

var debug = require('debug');
var error = debug('offerModel:error');
var log = debug('offerModel:log');

var mongoose = require('mongoose')

var Schema = mongoose.Schema,

    ObjectId = Schema.ObjectId;

var Offer = new Schema(
{
    dispatcher_id : {
        type: Schema.Types.ObjectId,
        ref: 'Disptacher',
        required:true
    },
    driver_id : {
        type: ObjectId
    },
    truck_id:{
        type: ObjectId
    },

    from:{
        description:String,
        location: [Number]
    },
    to: { 
        description: String,
        location: [Number]
    },

    quote:{
        type: Number
    },
    quote_currency: {
        type: String,
        enum: ['NIS', 'USD'],
        default: 'NIS'
    },

    pickup_time:{
        from:Date,
        to : Date,
    },

    drop_time:{
        from: Date,
        to: Date
    },
    weight: {
        type: Number,
    },
    commodity: {
        type: String
    },

    drops: [{
        description: String,
        location: [Number]
    }],
    route:[{
        point:Number,
        origin_geo: [String],
        origin_desription: String,
        destination_geo: [String],
        destination_desription:String,
        distance_str:String,
        distance_num:Number
    }],

    total_distance_num: Number,
    total_distance_str: String,
    
    number_of_pallets:{
        type:Number
    },
    hazardous_materials_permit:{
        type:Boolean
    },
    max_days_until_payout:Number,

    is_certificates_retrieval_required : Boolean,
    is_commodity_check: Boolean,
    is_unloading_for_client: Boolean,
    is_diversed_pallet: Boolean,


    status: {
        type: String,
        enum: ['confirmed', 'in_delivery','done','cancelled','published'],
        default: 'published'
    },
    stars: Number
}, 
{
    timestamps : true
});


module.exports = mongoose.model('Offer', Offer);


