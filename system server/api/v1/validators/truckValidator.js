
'use strict';

var debug = require('debug');
var error = debug('truckValidator:error');
var log = debug('truckValidator:log');

var mongoose = require('mongoose'),
    truck = require('../../../db/models/truck/truckModel');

var async = require('async');


function register(req, res, next)
{

    var truckDetails= {};
    var truck_ids = [];

    var license_plate = req.body.license_plate;
    var discharge_direction = req.body.discharge_direction;
  

    //special attention: media should be sent from clients as in model
    var media = req.body.media;
    var truck_weight_limit = req.body.truck_weight_limit;
    var truck_type = req.body.truck_type;
    var trunk_length = req.body.trunk_length;
    
    //booleans:
    var has_electronic_jack = req.body.has_electronic_jack;
    var has_driver_assistance = req.body.has_driver_assistance;
    var has_loading_ramp = req.body.has_loading_ramp;
    var has_hazardous_materials_permit = req.body.has_hazardous_materials_permit;


    
    truckDetails["license_plate"] = license_plate;
    truckDetails["discharge_direction"] = discharge_direction;
    truckDetails["media"] = media;

    truckDetails["truck_weight_limit"]=truck_weight_limit;
    truckDetails["truck_type"] = truck_type;
    truckDetails["trunk_length"] = trunk_length;

    truckDetails["has_electronic_jack"] = has_electronic_jack;
    truckDetails["has_driver_assistance"] = has_driver_assistance;
    truckDetails["has_loading_ramp"] = has_loading_ramp;
    truckDetails["has_hazardous_materials_permit"] = has_hazardous_materials_permit;

    
    // if ( typeof req.body.ios_token !== 'undefined' && req.body.ios_token ){
    //     tokens.push(req.body.ios_token);
    //     device_details["ios_tokens"] = tokens;
    // }
    // if ( typeof req.body.android_token !== 'undefined' && req.body.android_token ){
    //     tokens.push(req.body.android_token);
    //     device_details["android_tokens"] = tokens
    // }
    //wrapper

    res.locals.truckDetails = truckDetails;
    next();
}





function get(req, res, next){
    
    if (!req.query.truck_id) {
        var msg = 'invalid parameters';
        error(msg);
        next(new Error(msg));
    }

    //make sure driver is valid
    truck.findOne({_id:req.query.truck_id},function(err,doc){
        if (err){
            next(err);
        }else{
            if (!doc){
                var msg = 'invalid truck_id';
                error(msg)
                next(new Error(msg))
            }else{
                next();
            }
        }
    });
}




// /**
//  * validate get allTrucks request
//  * 
//  * @param {Object} driverDetails 
//  * @param {*} cb (err, user)
//  */
// function allTrucks(driverDetails, cb) {
    
//     var newDriver = new driver(driverDetails);
//     newDriver.save(function (err, driver) {
//         if (err) {
//             console.log("error registering driver: " + err.message);
//             return cb(err);
//         } else {
//             return cb(null, driver)
//         }
//     });
    
// };





module.exports = {
    register,
    get,
    //allTrucks
};