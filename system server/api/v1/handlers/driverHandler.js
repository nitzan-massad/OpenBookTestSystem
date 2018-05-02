'use strict';

var debug = require('debug');
var error = debug('driverHandler:error');
var log = debug('driverHandler:log');

var mongoose = require('mongoose'),
    driver = require('../../../db/models/driver/driverModel'),
    dispatcher = require('../../../db/models/dispatcher/dispatcherModel'),
    geoTrack = require('../../../db/models/driver/geoTrackModel'),
    offer = require('../../../db/models/dispatcher/offerModel'),
    savedOffer = require('../../../db/models/driver/savedOfferModel');

var async = require('async');
var bcrypt = require('bcrypt');

const saltRounds = 10;
const month_back = 30;
const year_back = 365;

var jsUtils = require('../../../utils/jsUtils');
// var firebaseUtils = require("./../../../utils/firebaseUtils");


/**
 * register driver
 * 
 * @param {Object} driverDetails 
 * @param {*} cb (err, user)
 */
function register(driverDetails, cb) {
    
    var newDriver = new driver(driverDetails);
    newDriver.save(function (err, driver) {
        if (err) {
            console.log("error registering driver: " + err.message);
            return cb(err);
        } else {
            return cb(null, driver)
        }
    });
    
};

/**
 * Driver's login
 * 
 * @param {String} license_plate 
 * @param {String} password 
 * @param {String} token 
 * @param {*} cb (err, driver)
 */
function login(email, password, ios_token, android_token, cb){
    
    var hash = bcrypt.hashSync(password, saltRounds);

    driver.findOne({"email":email},function (err,driver){
        if (err){
            cb(err)
        }else if(!driver){
            var msg = 'verification failed: wrong email or password';
            error(msg);
            cb(new Error(msg));
        }else{

            var isCorrectPassword = bcrypt.compareSync(password, driver.password); // true
            if (isCorrectPassword){
                console.log("user: "+driver.full_name + " successfully logged in");
                
                pushDeviceTokenToDriver(driver._id, ios_token, android_token,function(err, doc){
                    if (err){
                        cb(err);
                    }else{
                        cb(null, doc);
                    }
                });
                //todo: successfully logged in. push device token to DB

            }else{
                var msg = 'verification failed: wrong license plate or password';
                error(msg);
                cb(new Error(msg));
            }
   
        }

    });
}



/**
 * logout drivers
 * 
 * @param {string} offer_id 
 * @param {*} cb (err, offers)
 */
function logout(driver_id, cb) {

    driver.findOneAndUpdate({ "_id": driver_id },
     { "$set": { "device_details.allow_push": false}}, {new: true})
     .exec(function(err, driver){
        if(err) {
            console.log(err);
            cb(err);
        } else 
        {
            cb(null, driver);
        }
     });
};




/**
 * Get driver - Driver
 * 
 * @param {string} driver_id 
 * @param {*} cb (err, offers)
 */
function get(driver_id, cb) {
    driver.findById(driver_id,function(err,driver){
        if (err){  
            log(err) 
            cb(err)
        }else{
            cb(null, driver)
        }
    });

};



/**
 * push to set
 * 
 * @param {Object} drivers_id drivers mongodb object id
 * @param {String} ios_token 
 * @param {String} android_token 
 * @param {*} cb  - callback function
 */

function pushDeviceTokenToDriver(drivers_id, ios_token, android_token, cb){
    var update;

    if (ios_token){
        update = {
            $addToSet: { "device_details.ios_tokens": ios_token }
        }
    }
    if (android_token){
        update = {
            $addToSet: { "device_details.android_tokens": android_token }
        }
    }

    driver.findOneAndUpdate({_id:drivers_id},update,{new:true},function(err,doc){
        if (err) console.log("error pushing token: " + err.message)
        console.log("token pushed successfully for user: "+drivers_id.toString());
        cb(null, doc)
    });
   

}

/**
 * find jobs - dispatchers offers
 * 
 * @param {object} filter_params - all filtering and sorting parameters. 
 * @param {*} cb (err, offers)
 */
function offers(filter_params, cb) {
    
    //filter_params contains all inputs from the user already validated
    var driver_id = filter_params.driver_id;
   
    var filterQuery = jsUtils.buildFilterQuery(filter_params.time, 
        filter_params.distance_lower_lim, filter_params.distance_upper_lim,
        filter_params.weight_lower_lim, filter_params.weight_upper_lim);

    var sortQuery = jsUtils.buildSortQuery(filter_params.lat, filter_params.lon, filter_params.sort);
    
    offer.find(filterQuery)
    .populate({path:'dispatcher_id', model:dispatcher})
    .lean()
    .sort(sortQuery)
    .skip(filter_params.offset)
    .limit(filter_params.limit)
    .exec(function(err, docs) {
        if(err){
            cb(err);
        }else{
            //add isSaved tag. and dispatchers details 
            //1.invoke myOffers with the requesting driver_id
            //2.map myoffers => to an array contain only the offers id.
            //3.for each offer check if the offer objectId is contained in myOffers array from 2.
            async.parallel({
                offers: async.apply(jsUtils.fixOffersArrayWithDisptacherDetails, docs),
                mySavedOffersArray: async.apply(mySavedOffers, driver_id)
            }, function(err, results) {
                    if (err){
                        console.log("error in async.parallel for method : offers");
                        cb(err);
                    }else{
                        var offers = results.offers;
                        var myOffers = results.mySavedOffersArray;

                        jsUtils.addIsSavedTag(offers, myOffers, function(err, offersWithSavedTag){
                            if (err){
                                cb(err)
                            }else{
                                cb(null, offersWithSavedTag);
                            }
                        }) 
                    }
            });

            // jsUtils.fixOffersArrayWithDisptacherDetails(docs, function (err, offers){
             
            //     if (err){
            //         cb(err);
            //     }else{
            //         cb(null, offers);
            //     }
            // });
        }
    });
};


/**
 * find jobs - dispatchers offers
 * 
 * @param {string} offer_id 
 * @param {string} driver_id 
 * @param {string} truck_id 
 * @param {*} cb (err, offers)
 */
function acquireOffer(offer_id, driver_id, truck_id, cb) {

    offer.findOneAndUpdate({ "_id": offer_id },
     { "$set": { "driver_id": driver_id,
     "truck_id": truck_id, "status": "confirmed"}}, {new: true})
     .populate({path:'dispatcher_id', model:dispatcher})
     .lean()
     .exec(function(err, updatedOffer){
        if(err) {
            console.log(err);
            cb(err);
        } else 
        {
           // firebaseUtils.offerUpdate();
            //updatedoffer inside array in order to work with fixOffersArray...
            jsUtils.fixOffersArrayWithDisptacherDetails([updatedOffer], function (err, offers){
                if (err){
                    cb(err);
                }else{
                    //return offers[0] because we've turn the offers into array with the '[]' above
                    cb(null, offers[0]);
                }
            });
        }
     });
};


/**
 * Get my Offers - Driver
 * 
 * @param {string} driver_id 
 * @param {*} cb (err, offers)
 */
function myOffers(driver_id, cb) {

    offer.find({"driver_id":driver_id})
    .populate({path:'dispatcher_id',model:dispatcher})
    .lean()
    .exec(function(err, docs) {
        if(err){
            cb(err);
        }else{
            jsUtils.fixOffersArrayWithDisptacherDetails(docs, function (err, offers){
                if (err){
                    cb(err);
                }else{
                    cb(null, offers);
                }
            });
        }
    });
};



/**
 * Get my Offers - Driver
 * 
 * @param {string} driver_id 
 * @param {*} cb (err, offers)
 */
function profile(driver_id, cb) {
    var profile = {};
    var last_month = {};
    var last_year = {};
    var stars;
    var details = {};
    var monthLowerAndUpperBounds = getMonthBounds();
    var yearLowerAndUpperBounds = getYearsBounds();

    async.parallel([
        async.apply(aggregateWithTimeRange, driver_id, monthLowerAndUpperBounds[0], monthLowerAndUpperBounds[1]),
        async.apply(aggregateWithTimeRange, driver_id, yearLowerAndUpperBounds[0], yearLowerAndUpperBounds[1]),
        async.apply(aggregateAvarageStarsForDriver, driver_id),
        async.apply(get, driver_id),//for personal details
        
        ], function(err, results) {
        
        if (err){
            cb(err)
        }else{
            last_month = results[0] == undefined ? {} : results[0];
            last_year = results[1] == undefined ? {} : results[1];
            stars = results[2] == undefined ? {} : results[2];
            //extract drivers personal details
            details["full_name"] = results[3].full_name;
            details["phone"] = results[3].phone;
            details["image_url"] = "www.todo.imageurl/HiGuys/";

            removeNullFields(last_month,last_year, stars);
         
            profile["last_month"] = last_month;
            profile["last_year"] = last_year;
            profile["stars"] = stars;
            profile["details"]=details;
         
            cb(null,profile)
        }
      
    });

};


/**
 * 
 * @param {string} driver_id 
 * @param {*} cb (err, offers)
 * @description Get last year bounds - Return array of two objects
 */
function getYearsBounds(){
    var today = new Date();
    var year = today.getUTCFullYear()-1;
    return [new Date(year + '-01-01T00:00:00'), new Date((year+1) + '-01-01T00:00:00')]
}

/**
 * Remove null key-value pairs from objects with null values
 * 
 * @param {string} driver_id 
 * @param {*} cb (err, offers)
 * @description remove all key-value pairs from object if values are null
 */
function removeNullFields(last_month, last_year, stars){
    Object.keys(last_month).forEach(k => (last_month[k] == null ) && delete last_month[k]);
    Object.keys(last_year).forEach(k => (last_year[k] == null ) && delete last_year[k]);
    Object.keys(stars).forEach(k => (stars[k] == null ) && delete stars[k]);
}

/**
 * Retrieve two dates , represent the last month date
 * 
 * @param {string} driver_id 
 * @param {*} cb (err, offers)
 * @description Retrieve two dates , represent the last month date
 */
function getMonthBounds(){
    var today = new Date();
    var todayMinus30Days = new Date();
    todayMinus30Days.setDate(today.getDate() - month_back);
    return [todayMinus30Days,today];
}

/**
 * generic function to aggergate drivers personal information
 * 
 * @param {string} driver_id 
 * @param {string} lowerBound  - a ISO date object represent the UPPER bound date
 * @param {string} upperBound  - a ISO date object represent the LOWER bound date
 * @param {*} callback (err, result)
 */
function aggregateWithTimeRange(driver_id, lowerBound, upperBound, callback){
    var driverObjectId= mongoose.Types.ObjectId(driver_id);
    offer.aggregate(
        [{
            $match : 
            {
                $and:[
                    {"driver_id":driverObjectId},
                    {"createdAt": {
                            $gt:lowerBound
                        }
                    },
                    {"createdAt": {
                        $lt:upperBound
                    }
                },
                    {"status":"done"}
                    ]
                
            }
        },
        {
            $group:
                {
                    _id: null,
                    total_offers: {$sum:1},
                    total_distance_num: {$sum:"$total_distance_num"},
                    total_weight: {$sum:"$weight"}                    
                }
    
        }]).exec(function (err, res) {
            if (err) return callback(err);
            if (res.length == 0){
                var emptyObj = {
                    total_offers:0,
                    total_distance_num:0,
                    total_weight:0
                };
                callback(null,emptyObj)
            }else{
                callback(null, res[0]);
            }        
            
          });
}


/**
 * generic function to aggergate drivers stars
 * 
 * @param {string} driver_id 
 * @param {*} callback (err, result)
 */
function aggregateAvarageStarsForDriver(driver_id, callback){
    var driverObjectId= mongoose.Types.ObjectId(driver_id);
    offer.aggregate(
        [{
            $match : 
            {
                $and:[
                    {"driver_id":driverObjectId},
                    //{"status":"done"}
                    ]
            }
        },
        {
            $group:
                {
                    _id: "$offer",
                    total_offers: {$sum:1},
                    avg_stars: {$avg:"$stars"}                  
                }
    
        }]).exec(function (err, res) {
            if (err) return callback(err);
            if (res.length == 0){
                var emptyObj = {
                    total_offers:0,
                    avg_stars:0
                };
                callback(null,emptyObj)
            }else{
                callback(null, res[0]);
            }        
            
          });
    
}

/**
 * save offer - add to favorites
 * 
 * @param {string} offer_id 
 * @param {string} driver_id 
 * @param {string} truck_id 
 * @param {*} cb (err, offers)
 */
function saveOffer(offer_id, driver_id, truck_id, cb) {

    var newSavedOffer = new savedOffer({
        offer_id : offer_id,
        driver_id: driver_id,
        truck_id : truck_id,
    });
    newSavedOffer.save(function (err, offer) {
        if (err) {
            console.log("error saving an offer for driver: "+driver_id+ " with error: " + err.message);
            return cb(err);
        } else {
            cb(null, offer);
        }
    });
};


/**
 * unsave offer - remove to favorites
 * 
 * @param {string} offer_id 
 * @param {string} driver_id 
 * @param {string} truck_id 
 * @param {*} cb (err, offers)
 */
function unsaveOffer(offer_id, driver_id, truck_id, cb) {

    savedOffer.findOneAndUpdate({ "offer_id": offer_id, "driver_id":driver_id, "status":"active"  },
    { "$set": 
    { 
        "status": "deleted"
    }
   }, {new: true})
    .exec(function(err, savedOffer){
       if(err) {
           console.log(err);
           cb(err);
       } else 
       {
           cb(null, savedOffer);
       }
    });
};




/**
 * Get my Offers - Driver
 * 
 * @param {string} driver_id 
 * @param {*} cb (err, offers)
 */
function mySavedOffers(driver_id, cb) {
  

    savedOffer.find({"driver_id":mongoose.Types.ObjectId(driver_id), status:"active"})
    .populate({
        path:'offer_id',
        model:offer,
        populate:{
            path:"dispatcher_id", 
            model:dispatcher}
    })
    .lean()
    .exec(function(err, docs) {
        if(err){
            cb(err);
        }else{
            var offer_ids = docs.map(docs => docs.offer_id);
            jsUtils.fixOffersArrayWithDisptacherDetails(offer_ids, function (err, offers){
                if (err){
                    cb(err);
                }else{
                    //add is_saved tag - all offers are saved offers
                    offers.forEach(function(obj) { obj.is_saved = true; });
                    cb(null, offers);
                }
            });
        }
    });
};


/**
 * save new geo-location to the DB
 * 
 * @param {string} offer_id OfferId mongodb's objectId
 * @param {string} driver_id DriversId mongodb's objectId
 * @param {Object} location location Json object (composes of a description(string) and coordinates (array))
 * @param {*} cb (err, offers)
 */
function locationUpdate(offer_id, driver_id, location, cb) {

    var newGeoTrack = new geoTrack({
        offer_id : offer_id,
        driver_id: driver_id,
        location : location
    });
    newGeoTrack.save(function (err, geoTrack) {
        if (err) {
            console.log("error saving geoTrack for driver: "+driver_id+ " with error: " + err.message);
            return cb(err);
        } else {
            return cb(null, geoTrack)
        }
    });
};


/**
 * cancel offer - update offer to status  published - and back to the offers pool
 * 
 * @param {string} offer_id 
 * @param {string} driver_id 
 * @param {string} truck_id 
 * @param {*} cb (err, offers)
 */
function cancelOffer(offer_id, driver_id, truck_id, cb) {

    offer.findOneAndUpdate({ "_id": offer_id },
     { "$set": { "driver_id": driver_id, "status": "published"}}, {new: true})
     .exec(function(err, updatedOffer){
        if(err) {
            console.log(err);
            cb(err);
        } else 
        {
            //todo: maybe update dispatcher (email notification??)
            firebaseUtils.offerUpdate();
            jsUtils.fixOffersArrayWithDisptacherDetails([updatedOffer], function (err, offers){
                if (err){
                    cb(err);
                }else{
                    //return offers[0] because we've turn the offers into array with the '[]' above
                    cb(null, offers[0]);
                }
            });
            
        }
     });
};


/**
 * cancel offer - update offer to status  in_delivery
 * 
 * @param {string} offer_id 
 * @param {string} driver_id 
 * @param {string} truck_id 
 * @param {*} cb (err, offers)
 */
function startJourney(offer_id, driver_id, truck_id, cb) {

    offer.findOneAndUpdate({ "_id": offer_id },
     { "$set": 
     { 
         "driver_id": driver_id,
         "truck_id":truck_id,
         "status": "in_delivery"
    }
    }, {new: true})
     .exec(function(err, updatedOffer){
        if(err) {
            console.log(err);
            cb(err);
        } else 
        {
            //todo: maybe update dispatcher (email notification??)
            //firebaseUtils.offerUpdate();
            cb(null, updatedOffer);
        }
     });
};

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