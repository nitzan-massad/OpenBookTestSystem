//
// 'use strict';
//
// var debug = require('debug');
// var error = debug('savedOfferModel:error');
// var log = debug('savedOfferModel:log');
//
// var mongoose = require('mongoose')
//
// var Schema = mongoose.Schema,
//     ObjectId = Schema.ObjectId;
//
// var SavedOffer = new Schema(
// {
//     offer_id : {
//         type: ObjectId,
//         ref: 'Offer',
//         required:true
//     },
//     driver_id : {
//         type: ObjectId,
//         ref: 'Driver',
//         required:true
//     },
//     status: {
//         type: String,
//         enum: ['active', 'deleted'],
//         default: 'active'
//     },
// },
// {
//
//     timestamps : true
// });
//
// module.exports = mongoose.model('SavedOffer', SavedOffer);
