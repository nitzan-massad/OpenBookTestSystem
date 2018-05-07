'use strict';

var debug = require('debug');
var error = debug('driverValidator:error');
var log = debug('driverValidator:log');

var mongoose = require('mongoose'),
    driver = require('../../../db/models/driver/driverModel'),
    truck = require('../../../db/models/truck/truckModel'),
    offer = require('../../../db/models/dispatcher/offerModel'),
    savedOffer = require('../../../db/models/driver/savedOfferModel');

var async = require('async');
var bcrypt = require('bcrypt');
const saltRounds = 10;

//const isCoordinates = require('is-coordinates');

function register(req, res, next)
{

    var driverDetails= {};
    var device_details ={};
    var tokens = [];

    var truck_id = req.body.truck_id;

    //
    //check if truck_id exists and valid

    //

    var truck_type = req.body.truck_type;
    var full_name = req.body.full_name;
    var phone = req.body.phone;
    //var license_plate = req.body.license_plate;
    var email = req.body.email;
    var password = req.body.password;
   
    var truck_type = req.body.truck_type;
    var trunk_length = req.body.trunk_length;
    
    //booleans:
    //var has_electronic_jack = req.body.has_electronic_jack;
   
    //special attention: media should be sent from clients as in model
    var media = req.body.media;
    var truck_weight_limit = req.body.truck_weight_limit;

    var has_driver_assistance = req.body.has_driver_assistance;
    var has_hazardous_materials_permit = req.body.has_hazardous_materials_permit;

    




    driverDetails["truck_id"] = truck_id;
    driverDetails["truck_type"] = truck_type;
    
    driverDetails["full_name"] = full_name;
    driverDetails["phone"] = phone;
    //driverDetails["license_plate"] = license_plate;
    driverDetails["email"] = email.toLowerCase();

    
    var hash = bcrypt.hashSync(password, saltRounds);
    driverDetails["password"] = hash;

    driverDetails["media"] = media;
    driverDetails["truck_weight_limit"] = truck_weight_limit;
    driverDetails["truck_type"] = truck_type;

   
    driverDetails["has_driver_assistance"] = has_driver_assistance;
    
    driverDetails["has_hazardous_materials_permit"] = has_hazardous_materials_permit;

    if (!truck_id){
        var msg = 'invalid truck_id';
        error(msg);
        next(new Error(msg));
    }
    
    if (typeof req.body.ios_token !== 'undefined' && req.body.ios_token){
        tokens.push(req.body.ios_token);
        device_details["ios_tokens"] = tokens;
    }
    if (typeof req.body.android_token !== 'undefined' && req.body.android_token){
        tokens.push(req.body.android_token);
        device_details["android_tokens"] = tokens
    }

    driverDetails["device_details"] = device_details;
    //wrapper

    truck.findById(truck_id,function(err,doc){
        if (err) return next(err);
        if (!doc || doc==null) {
            var msg = 'record '+truck_id + ' does not exists in trucks collection';
            error(msg);
            next(new Error(msg));
        }else{
            res.locals.driverDetails = driverDetails;
            next();
        }
    });


}


// /**
//  * Get the truck by id
//  * 
//  * @param {String} truck_id 
//  * @param {*} cb (err, truck)
//  */
// function getTruckById(truck_id, cb){
//     truck.findById(truck_id, function(err,doc){
//         if (err) return next(err);
//         if (!doc || doc==null) {
//             var msg = 'record '+truck_id + ' does not exists in trucks collection';
//             error(msg);
//             cb(new Error(msg));
//         }else{
//             res.locals.driverDetails = driverDetails;
//             cb(null, doc);
//         }
//     });
// }

function login(req, res, next){
    
    if (
        !req.body.email || 
        !(req.body.password)) {
        var msg = 'invalid email or password';
        error(msg);
        next(new Error(msg));
    }
    if (!req.body.ios_token && !req.body.android_token){
        var msg = 'device token is missing or invalid, validate your input';
        error(msg);
        next(new Error(msg));
    }
    next()
}

function logout(req, res, next){
    
    if (!req.body.driver_id) {
        var msg = 'invalid driver_id';
        error(msg);
        next(new Error(msg));
    }
    next()
}



function get(req, res, next){
    var driver_id = req.params.driver_id;

    if (!driver_id) {
        var msg = 'invalid parameters';
        error(msg);
        next(new Error(msg));
    }

    //make sure driver is valid
    driver.findOne({_id:driver_id},function(err,doc){
        if (err){
            next(err);
        }else{
            if (!doc){
                var msg = 'invalid driver_id';
                error(msg)
                next(new Error(msg))
            }else{
                next();
            }
        }
    });
}




function offers(req, res, next){
    var driver_id = req.params.driver_id;

    var lat = parseFloat(req.query.lat);
    var lon = parseFloat(req.query.lon);
    //filtering
    var time = req.query.time;
    var distance_lower_lim = req.query.distance_lower_lim;
    var distance_upper_lim = req.query.distance_upper_lim;
    var weight_lower_lim = req.query.weight_lower_lim;
    var weight_upper_lim = req.query.weight_upper_lim;
    //sorting
    var sort = req.query.sort;
    
    //paging
    var offset = parseInt(req.query.offset);
    var limit = parseInt(req.query.limit);

    var paramsValidationSuccess = validateFilterParams(lat, lon,
        time, distance_lower_lim, distance_upper_lim, weight_lower_lim, weight_upper_lim,
        sort, offset, limit);

    if (!paramsValidationSuccess.success){
        var msg = paramsValidationSuccess.err;
        error(msg);
        return next(new Error(msg));
    }

    res.locals.params = paramsValidationSuccess.params;
    if (!driver_id) {
        var msg = 'invalid driver_id';
        error(msg);
        return next(new Error(msg));
    }
    driver.findOne({_id:driver_id}, function(err, doc){
        if (err){
            return next(err);
        }else{
            if (!doc){
                var msg = 'invalid driver_id';
                error(msg)
                return next(new Error(msg))
            }else{
                res.locals.params.driver_id = driver_id;
                return next();
            }
        }
    });
}


/**
 * Validate params in input-query from the user (for filtering, sorting and paging)
 * 
 * @param {string} time int represent number in days
 * @param {string} distance_lower_lim double represents number in KMs
 * @param {string} distance_upper_lim double represents number in KMs
 * @param {string} weight_lower_lim double represents number in TONs
 * @param {string} weight_upper_lim double represents number in TONs
 * @param {string} sort Enum represent value to sort by
 * @param {string} offset int enable pagings
 * @param {string} limit int enable pagings
 */
function validateFilterParams(lat, lon,
    time, distance_lower_lim, distance_upper_lim, weight_lower_lim, weight_upper_lim,
    sort, offset, limit){

        var params = {};
        var success_res={
            success:false,
            err:null,
            params:params
        }
        if (!isCoordinates([lat,lon])){
            success_res.err = "bad coordinates"
            return success_res;
        }
        success_res.params.lat = lat;
        success_res.params.lon = lon;
        
        //time - no validation for specific numbers, no need to limit the query for developers comforts
        //* * @apiParam ( Driver) {String} time in DAY's options: [0, 1, 7, 30]
        var time_int = parseInt(time)
        if ((isNaN(time_int) || time_int<0) && time != 'default'){
            success_res.err = "time argument can be a none-negative number or 'default'"
            return success_res;
        }
        success_res.params.time = isNaN(time_int) ? "default" : time_int;
        
        //distance
        var distance_lower_lim_float = parseFloat(distance_lower_lim)
        if ((isNaN(distance_lower_lim_float) && distance_lower_lim != 'default' || distance_lower_lim_float<0) ){
            success_res.err = "distance_lower_lim argument can be a none-negative number or 'default'"
            return success_res;
        }
       
        var distance_upper_lim_float = parseFloat(distance_upper_lim);
        if (isNaN(distance_upper_lim_float) && distance_upper_lim != 'default' || distance_upper_lim_float<0){
            success_res.err = "distance_upper_lim argument can be a none-negative number or 'default'"
            return success_res;
        }
        if (distance_upper_lim != 'default' && distance_lower_lim != 'default'){
            if (distance_upper_lim_float < distance_lower_lim_float){
                success_res.err = "distance_upper_lim cannot be smaller than distance_smaller_lim"
                return success_res;
            }
        }
////////////////////////////////////////////////////////////
        if (isImpossibleRange(distance_lower_lim,distance_lower_lim_float,
        distance_upper_lim,distance_upper_lim_float)){
            success_res.err = "impossible distance range : " + distance_lower_lim +" - "+distance_upper_lim;
            return success_res;
        }
       
        success_res.params.distance_lower_lim = isNaN(distance_lower_lim_float) ? "default" : distance_lower_lim_float;
        success_res.params.distance_upper_lim = isNaN(distance_upper_lim_float) ? "default" : distance_upper_lim_float;

        //weight 
        var weight_lower_lim_float = parseFloat(weight_lower_lim);
        if ((isNaN(weight_lower_lim_float) && weight_lower_lim != 'default' || weight_lower_lim_float<0) ){
            success_res.err = "weight_lower_lim argument can be a none-negative number or 'default'"
            return success_res;
        }
        var weight_upper_lim_float = parseFloat(weight_upper_lim);
        if ((isNaN(weight_upper_lim) && weight_upper_lim != 'default' || weight_upper_lim_float<0)){
            success_res.err = "weight_upper_lim argument can be a none-negative number or 'default'"
            return success_res;
        }
        if (weight_lower_lim != 'default' || weight_lower_lim != 'default'){
            if (weight_upper_lim_float < weight_lower_lim_float){
                success_res.err = "weight_upper_lim cannot be smaller than weight_lower_lim"
                return success_res;
            }
        }
        success_res.params.weight_lower_lim = isNaN(weight_lower_lim_float) ? "default" : weight_lower_lim_float;
        success_res.params.weight_upper_lim = isNaN(weight_upper_lim_float) ? "default" : weight_upper_lim_float;

        if (isImpossibleRange(weight_lower_lim,weight_lower_lim_float,
            weight_upper_lim,weight_upper_lim_float)){
                success_res.err = "impossible weight range : " + weight_lower_lim +" - "+weight_upper_lim;
                return success_res;
            }
        //* * @apiParam ( Driver) {String} sort options: [date, distance, company_name, quote]
        
        //sort
        if (sort != 'date' && sort != 'distance' && sort != 'company_name' && sort != 'quote' && sort !='default' ){
            success_res.err = "invalid sort value: " + sort+ " . sort value can be either: 'date', 'distance', 'company_name', 'quote', or 'default' ";
            return success_res;
        }

        success_res.params.sort = sort;

        if (isNaN(offset) || isNaN(limit)){
            success_res.err = "invalid paging argument. offset and limit must be a none-negative integers"
            return success_res;
        }
        success_res.params.offset = offset;
        success_res.params.limit = limit;
        
        //query validations success
        success_res.success = true;
        success_res.err = null;
        return success_res;

    }

function isImpossibleRange(lower, lower_float, upper, upper_float){
    if (lower=="default" && upper != "default" || 
    lower != "default" && upper =="default"){
        return true;
    }
}
//http://trucknow-dev.moveodevelop.com/api/v1/driver/5adc3a8e464c573aa2b170fc/offers?lat=0&lon=0&time=default&distance_lower_lim=default&distance_upper_lim=default&weight_lower_lim=default&weight_upper_lim=default&sort=default&offset=0&limit=30
///api/v1/driver/5adb554b3fb15421cca8bdec/offers?lat=0&lon=0&time=default&distance_lower_lim=default&distance_upper_lim=default&weight_lower_lim=default&weight_upper_lim=default&sort=default&offset=0&limit=30
function acquireOffer(req, res, next){
    
   
    var offer_id = req.body.offer_id;
    var driver_id = req.body.driver_id;
    var truck_id = req.body.truck_id;
  
    if (!driver_id || !offer_id || !truck_id) {
        var msg = 'invalid driver_id/truck_id/offer_id';
        error(msg);
        next(new Error(msg));
    }

    validateData(offer_id, driver_id, truck_id, function(err,doc){
        if(err){
            next(err)
        }else{
            next();
        }
    });


}




/**
 * Validate input before continue to next middleware
 * 
 * @param {string} offer_id 
 * @param {string} driver_id 
 * @param {string} truck_id 
 * @param {*} callback (err, doc)
 */
function validateData (offer_id, driver_id, truck_id,  callback) {  
    async.parallel({
        fetchOffer: function (cb){ offer.findOne({_id:offer_id}).exec(cb); },
        fetchDriver: function (cb){ driver.findOne({_id:driver_id}).exec(cb); },
        fetchTruck: function (cb){ truck.findOne({_id:truck_id}).exec(cb); },
        isDriversTruck: function (cb){driver.findOne({_id:driver_id, truck_id: truck_id}).exec(cb);}
    }, function(err, results){
         var offerFetched = results.fetchOffer;
         var driverFetched = results.fetchDriver;
         var truckFetched = results.fetchTruck;
         var isDriversTruck = results.isDriversTruck;
         
         if (!offerFetched || !driverFetched || !truckFetched ){
            var msg = 'None existing offer/driver/truck';
            error(msg);
            return callback(new Error(msg));
         }
         if((offerFetched != undefined) && offerFetched.status !="published"){
            var msg = 'too late! Offer might have already been taken/cancelled';
            error(msg);
            return callback(new Error(msg));
         }
         
         //check that truck belong to driver
         if (!(isDriversTruck)){
            var msg = 'driver ' + driver_id + ' cannot use truck ' +truck_id;
            error(msg);
            return callback(new Error(msg));
         }

         callback();
    });
}



function myOffers(req, res, next){
    var driver_id = req.params.driver_id;

    if (!driver_id) {
        var msg = 'invalid driver_id';
        error(msg);
        next(new Error(msg));
    }

    //make sure driver is valid
    driver.findOne({_id:driver_id},function(err,doc){
        if (err){
            next(err);
        }else{
            if (!doc){
                var msg = 'invalid driver_id';
                error(msg)
                next(new Error(msg))
            }else{
                next();
            }
        }
    });
}

function profile(req, res, next){
    var driver_id = req.params.driver_id;
    if (!driver_id) {
        var msg = 'invalid driver_id';
        error(msg);
        next(new Error(msg));
    }

    //make sure driver is valid
    driver.findOne({_id:driver_id},function(err,doc){
        if (err){
            next(err);
        }else{
            if (!doc){
                var msg = 'invalid driver_id';
                error(msg)
                next(new Error(msg))
            }else{
                next();
            }
        }
    });
}


function saveOffer(req,res,next){

    var offer_id = req.body.offer_id;
    var driver_id = req.body.driver_id;
    var truck_id = req.body.truck_id;

    if (!driver_id || !offer_id || !truck_id) {
        var msg = 'invalid driver_id/offer_id/truck_id';
        error(msg);
        next(new Error(msg));
    }

    validateData(offer_id, driver_id, truck_id, function(err,doc){
        if(err){
            next(err)
        }else{
            //todo: make sure the offer is not already in the driver's favorites
            savedOffer.findOne({ "offer_id": offer_id, "driver_id":driver_id, "status":"active"})
            .exec(function(err, savedOffer){
                if(err) {
                    console.log(err);
                    next(err);
                } else 
                {
                    if (savedOffer){
                        var msg = 'Offer '+offer_id + " is already in driver's "
                        + driver_id + " saved offers. see : "
                        + savedOffer._id +" in savedOffers collection" ;
                        error(msg);
                        next(new Error(msg));
                    }else{
                        //no document found. proceed to adding
                        next(null, savedOffer);
                    }
                    
                }
            });
        }
    });
}

function unsaveOffer(req,res,next){
    var offer_id = req.body.offer_id;
    var driver_id = req.body.driver_id;
    var truck_id = req.body.truck_id;

    if (!driver_id || !offer_id || !truck_id) {
        var msg = 'invalid driver_id/offer_id/truck_id';
        error(msg);
        next(new Error(msg));
    }

    validateData(offer_id, driver_id, truck_id, function(err,doc){
        if(err){
            next(err)
        }else{
             //todo: make sure the offer is not already deleted in the driver's favorites
             savedOffer.findOne({ "offer_id": offer_id, "driver_id":driver_id, "status":"active"})
             .exec(function(err, savedOffer){
                 if(err) {
                     console.log(err);
                     next(err);
                 } else 
                 {
                     if (savedOffer==null){
                         var msg = 'Offer '+offer_id + " for driver's "
                         + driver_id + " and status 'active' does not exists in \
                         savedOffers collection" ;
                         error(msg);
                         next(new Error(msg));
                     }else{
                         //no document found. proceed to adding
                         next(null, savedOffer);
                     }
                     
                 }
             });
        }
    });
}




function mySavedOffers(req, res, next){
    
    var driver_id = req.params.driver_id;
    if (!driver_id) {
        var msg = 'invalid driver_id';
        error(msg);
        next(new Error(msg));
    }

    //make sure driver is valid
    driver.findOne({_id:driver_id},function(err,doc){
        if (err){
            next(err);
        }else{
            if (!doc){
                var msg = 'invalid driver_id';
                error(msg)
                next(new Error(msg))
            }else{
                
                next();
            }
        }
    });
}




function locationUpdate(req, res, next){
    var offer_id = req.body.offer_id;
    var driver_id = req.body.driver_id;

    var location = req.body.location;
  
    if (!driver_id || !offer_id) {
        var msg = 'invalid driver_id/offer_id';
        error(msg);
        next(new Error(msg));
    }

    validateGeoUpdate(offer_id, driver_id, location, function(err,doc){
        if(err){
            next(err)
        }else{
            //todo: make sure the offer is not already in the driver's favorites
            next();
        }
    });
}



/**
 * Validate input before continue to next middleware
 * 
 * @param {string} offer_id 
 * @param {string} driver_id 
 * @param {Object} location 
 * @param {*} callback (err, doc)
 */
function validateGeoUpdate (offer_id, driver_id, location, callback) {  
    async.parallel({
        fetchOffer: function (cb){ offer.find({_id:offer_id}).exec(cb); },
        fetchDriver: function (cb){ driver.find({_id:driver_id}).exec(cb); }
    }, function(err, results){
         var offerFetched = results.fetchOffer;
         var driverFetched = results.fetchDriver;

         if (!offerFetched || !driverFetched ||
              offerFetched.length ==0 || driverFetched.length == 0 ){
            var msg = 'None existing offer/driver';
            error(msg);
            return callback(new Error(msg));
         }
         if((offerFetched != undefined) && offerFetched[0].status !="in_delivery"){
            var msg = "Offer status is not 'in_delivery' therefore cannot update location";
            error(msg);
            return callback(new Error(msg));
         }
         //validate geo-coordinates
         if (!(isCoordinates(location.coordinates))){
            var msg = "invalid coordinates";
            error(msg);
            return callback(new Error(msg));
         }
         callback();
    });
}


function cancelOffer(req, res, next){
    
   
    var offer_id = req.body.offer_id;
    var driver_id = req.body.driver_id;
    var truck_id = req.body.truck_id;
  
    if (!driver_id || !offer_id || !truck_id) {
        var msg = 'invalid driver_id/offer_id/truck_id';
        error(msg);
        next(new Error(msg));
    }

    hasDriverOfferCorrolation(offer_id, driver_id, function(err,doc){
        if(err){
            next(err)
        }else{
            if (doc.status != "confirmed"){
                var msg = "cannot cancel offer, offer status is " + doc.status;
                error(msg);
                return next(new Error(msg));
            }else{
                return next();
            }
        }
    });


}




/**
 * Validate that a corrolation exists between offer and driver
 * 
 * @param {string} offer_id 
 * @param {string} driver_id 
 * @param {*} callback (err, doc)
 */
function hasDriverOfferCorrolation (offer_id, driver_id, callback) {  
    async.parallel({
        fetchOffer: function (cb){ offer.findOne({_id:offer_id}).exec(cb); },
        fetchDriver: function (cb){ driver.findOne({_id:driver_id}).exec(cb); }
    }, function(err, results){
         var offerFetched = results.fetchOffer;
         var driverFetched = results.fetchDriver;

         if (!offerFetched || !driverFetched ){
            var msg = 'None existing offer/driver';
            error(msg);
            return callback(new Error(msg));
         }
         if((offerFetched != undefined) && offerFetched.driver_id !=driverFetched._id.toString()){
            var msg = 'The Driver did not own this offer';
            error(msg);
            return callback(new Error(msg));
         }
         callback(null, offerFetched);
    });
}


function startJourney(req, res, next){
    
   
    var offer_id = req.body.offer_id;
    var driver_id = req.body.driver_id;
    var truck_id = req.body.truck_id;
  
    if (!driver_id || !offer_id || !truck_id) {
        var msg = 'invalid driver_id/offer_id/truck_id';
        error(msg);
        next(new Error(msg));
    }

    hasDriverOfferCorrolation(offer_id, driver_id, function(err,doc){
        if(err){
            next(err)
        }else{

            if (doc.status != "confirmed"){
                var msg = "cannot start journey, offer status is " + doc.status;
                error(msg);
                return next(new Error(msg));
            }else{
                return next();
            }
            /*
            switch (doc.status){
                case "in_delivery":
                var msg = "cannot start journey, offer status is 'in_delivery'";
                error(msg);
                return next(new Error(msg));
                // break;
                case "cancelled":
                var msg = "cannot start journey, offer status is 'cancelled'";
                error(msg);
                return next(new Error(msg));
                // break;
                case "done":
                var msg = "cannot start journey, offer status is 'done'";
                error(msg);
                return next(new Error(msg));
                // break;
                case "published":
                var msg = "cannot start journey, offer status is 'published'";
                error(msg);
                return next(new Error(msg));
                // break;
            }
         */
        }
    });


}
module.exports = {
    register,
    login,
    logout,
    get,
    offers,
    acquireOffer,
    myOffers,
    profile,
    saveOffer,
    unsaveOffer,
    mySavedOffers,
    locationUpdate,
    cancelOffer,
    startJourney
};