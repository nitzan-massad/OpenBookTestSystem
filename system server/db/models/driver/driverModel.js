//
// 'use strict';
//
// var debug = require('debug');
// var error = debug('driverModel:error');
// var log = debug('driverModel:log');
//
// var mongoose = require('mongoose')
//
// var Schema = mongoose.Schema,
//     ObjectId = Schema.ObjectId;
//
// var Driver = new Schema(
// {
//     truck_id: [ObjectId],
//
//     // truck_type:{
//     //     type: String,
//     //     enum: ['above_12', 'above_15'],
//     //     default: 'above_12'
//
//     // },
//     full_name: {
//         type: String
//     },
//
//     phone:{
//         type:String,
//         unique:true
//     },
//
//     email:{
//         type: String,
//         unique:true
//     },
//
//     password: {
//         type: String
//     },
//
//     //profile_image_url:String,
//
//     media:[{
//        // media_type: String, //image, might be video/gif later...
//        media_description: {//license_copy/insurance_copy/truck_image
//             type: String,
//             enum: ['driver_id','license']
//         },
//         media_url: String,
//         status: {
//             type: String,
//             enum: ['active', 'deleted'],
//             default: 'active'
//         },
//     }],
//
//
//     //truck_weight_limit:Number,
//
//     has_hazardous_materials_permit : Boolean,
//
//     device_details:{
//         android_tokens: {type: [String]},
//         ios_tokens: {type: [String]},
//         badge_counter:{type: Number},
//         allow_push:{type: Boolean,default:true}
//     },
//
//     status: {
//         type: String,
//         enum: ['active', 'deleted'],
//         default: 'active'
//     },
//     last_login: Date
//
// },
// {
//     timestamps : true
// });
//
// module.exports = mongoose.model('Driver', Driver);
//
//
