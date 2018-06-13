// 'use strict';
//
// var debug = require('debug');
// var error = debug('driverController:error');
// var log = debug('driverController:log');
//
// var driverHandler = require('../handlers/driverHandler');
// var driverValidator = require('../validators/driverValidator');
//
//
// /**
//  * Creates new driver (signup)
//  *
//  * @param {*} req
//  * @param {*} res
//  * @param {*} next
//  */
// function register(req, res, next) {
//
//     driverHandler.register(res.locals.driverDetails, function(err, driver){
//         if(err){
//             next(err)
//         }else{
//             res.json({driver})
//         }
//     });
// }
//
// /**
//  * Login driver
//  *
//  * @param {*} req
//  * @param {*} res
//  * @param {*} next
//  */
// function login(req, res, next) {
//
//     driverHandler.login(req.body.email, req.body.password,
//          req.body.ios_token, req.body.android_token, function(err, driver){
//
//         if (err){
//             next(err)
//         }else{
//             res.json({driver})
//         }
//     });
// }
//
// /**
//  * logout driver
//  *
//  * @param {*} req
//  * @param {*} res
//  * @param {*} next
//  */
// function logout(req, res, next) {
//
//     driverHandler.logout(req.body.driver_id, function(err,driver){
//
//         if (err){
//             next(err)
//         }else{
//             res.json({driver})
//         }
//     });
// }
//
//
//
//
// /**
//  * Get driver - Driver
//  *
//  * @param {*} req
//  * @param {*} res
//  * @param {*} next
//  */
// function get(req, res, next) {
//
//     driverHandler.get(req.params.driver_id, function(err, driver){
//         if(err){
//             next(err);
//         }else{
//             res.json({driver});
//         }
//     });
// }
//
//
//
//
// /**
//  * Find jobs - dispatcher offers
//  *
//  * @param {*} req
//  * @param {*} res
//  * @param {*} next
//  */
// function offers(req, res, next) {
//
//     var filter_params = res.locals.params; //already validated in the Validator
//     driverHandler.offers(filter_params, function(err, offers){
//         if(err){
//             next(err);
//         }else{
//             res.json({offers});
//         }
//     });
// }
//
// /**
//  * Acquire an offer - match Driver to Offer
//  *
//  * @param {*} req
//  * @param {*} res
//  * @param {*} next
//  */
// function acquireOffer(req, res, next) {
//
//    //manage request response
//    driverHandler.acquireOffer(req.body.offer_id, req.body.driver_id, req.body.truck_id, function (err,offer){
//        if(err){
//            next(err);
//        }else{
//            res.json({offer});
//        }
//    });
// }
//
//
// /**
//  * Get my Offers - Driver
//  *
//  * @param {*} req
//  * @param {*} res
//  * @param {*} next
//  */
// function myOffers(req, res, next) {
//     var driver_id = req.params.driver_id;
//     driverHandler.myOffers(driver_id, function(err, offers){
//         if(err){
//             next(err);
//         }else{
//             res.json({offers});
//         }
//     });
// }
//
//
// /**
//  * Get profile - Driver
//  *
//  * @param {*} req
//  * @param {*} res
//  * @param {*} next
//  */
// function profile(req, res, next) {
//
//     var driver_id = req.params.driver_id;
//
//     driverHandler.profile(driver_id, function(err, profile){
//         if(err){
//             next(err);
//         }else{
//             res.json({profile});
//         }
//     });
// }
//
//
//
//
// /**
//  * Save offer - add offer to favorites
//  *
//  * @param {*} req
//  * @param {*} res
//  * @param {*} next
//  */
// function saveOffer(req, res, next) {
//
//     //manage request response
//     driverHandler.saveOffer(req.body.offer_id, req.body.driver_id, req.body.truck_id, function (err,savedOffer){
//         if(err){
//             next(err);
//         }else{
//             res.json({savedOffer});
//         }
//     });
//  }
//
//
//  /**
//  * unSave offer - remove offer to favorites
//  *
//  * @param {*} req
//  * @param {*} res
//  * @param {*} next
//  */
// function unsaveOffer(req, res, next) {
//
//     //manage request response
//     driverHandler.unsaveOffer(req.body.offer_id, req.body.driver_id, req.body.truck_id, function (err,savedOffer){
//         if(err){
//             next(err);
//         }else{
//             res.json({savedOffer});
//         }
//     });
//  }
//
//
//
//  /**
//  * Get my Offers - Driver
//  *
//  * @param {*} req
//  * @param {*} res
//  * @param {*} next
//  */
// function mySavedOffers(req, res, next) {
//
//     driverHandler.mySavedOffers(req.params.driver_id, function(err, offers){
//         if(err){
//             next(err);
//         }else{
//             res.json({offers});
//         }
//     });
// }
//
//
//
// // /**
// //  * Save offer - add offer to favorites
// //  *
// //  * @param {*} req
// //  * @param {*} res
// //  * @param {*} next
// //  */
// // function saveOffer(req, res, next) {
//
// //     //manage request response
// //     driverHandler.saveOffer(req.body.offer_id, req.body.driver_id, req.body.truck_id, function (err,savedOffer){
// //         if(err){
// //             next(err);
// //         }else{
// //             res.json({savedOffer});
// //         }
// //     });
// //  }
//
//
//
// /**
//  * Driver update his truck geo-location for an in-progress offer
//  *
//  * @param {*} req
//  * @param {*} res
//  * @param {*} next
//  */
//
// function locationUpdate(req, res, next) {
//
//     //manage request response
//     driverHandler.locationUpdate(req.body.offer_id,
//         req.body.driver_id, req.body.location, function (err, geoTrack){
//         if(err){
//             next(err);
//         }else{
//             res.json({geoTrack});
//         }
//     });
//  }
//
//
// /**
//  * Cancel an offer - cancel drivers job
//  *
//  * @param {*} req
//  * @param {*} res
//  * @param {*} next
//  */
// function cancelOffer(req, res, next) {
//
//     //manage request response
//     driverHandler.cancelOffer(req.body.offer_id, req.body.driver_id, req.body.truck_id, function (err,offer){
//         if(err){
//             next(err);
//         }else{
//             res.json({offer});
//         }
//     });
//  }
//
// /**
//  * startJourney - drivers initiate his journey
//  *
//  * @param {*} req
//  * @param {*} res
//  * @param {*} next
//  */
// function startJourney(req, res, next) {
//
//     //manage request response
//     driverHandler.startJourney(req.body.offer_id, req.body.driver_id, req.body.truck_id, function (err,offer){
//         if(err){
//             next(err);
//         }else{
//             res.json({offer});
//         }
//     });
//  }
//
//
//
// module.exports =
//     {
//         register,
//         login,
//         logout,
//         get,
//         offers,
//         acquireOffer,
//         myOffers,
//         profile,
//         saveOffer,
//         unsaveOffer,
//         mySavedOffers,
//         locationUpdate,
//         cancelOffer,
//         startJourney
//
//     };
//
