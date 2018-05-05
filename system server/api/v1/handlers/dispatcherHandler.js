'use strict';

var debug = require('debug');
var error = debug('dispatcherHandler:error');
var log = debug('dispatcherHandler:log');

var mongoose = require('mongoose'),
dispatcher = require('../../../db/models/dispatcher/dispatcherModel'),
offer = require('../../../db/models/dispatcher/offerModel'),
geoTrack = require('../../../db/models/driver/geoTrackModel');

var async = require('async');
var bcrypt = require('bcrypt');
const saltRounds = 10;

var jsUtils = require('../../../utils/jsUtils');
// var firebaseUtils = require("./../../../utils/firebaseUtils");

var googleDistance = require('google-distance-matrix');
// var GoogleMapAPIKey = require("config").get("GoogleMaps.API_KEY");
// googleDistance.key(GoogleMapAPIKey);

/**
 * register a dispatcher
 * 
 * @param {Object} dispatcherDetails 
 * @param {*} next (err, user)
 */
function register(dispatcherDetails, cb) {
    
    var newDispatcher = new dispatcher(dispatcherDetails);
    newDispatcher.save(function (err, dispatcher) {
        if (err) {
            console.log("error registering dispatcher: " + err.message);
            return cb(err);
        } else {
            return cb(null, dispatcher)
        }
    });
    
};

/**
 * dispatcher's login
 * 
 * @param {String} email 
 * @param {String} password 
 * @param {*} next (err, dispatcher)
 */
function login(email, password, cb){

    var msg = 'verification failed: wrong email or password'; 
    var hash = bcrypt.hashSync(password, saltRounds);

    dispatcher.findOne({"email":email},function (err, dispatcher){
        if (err){
            cb(err)
        }else if(!dispatcher){
            error(msg);
            cb(new Error(msg));
        }else{

            var isCorrectPassword = bcrypt.compareSync(password, dispatcher.password); // true
            if (isCorrectPassword){
                console.log("dispatcher: "+dispatcher.contact_person_first_name +" "+
                dispatcher.contact_person_last_name+ " successfully logged in");
                
                lastLogin(dispatcher._id,function(err, doc){
                    if (err){
                        cb(err);
                    }else{
                        cb(null, doc);
                    }
                });
                //todo: successfully logged in. push device token to DB

            }else{
                error(msg);
                cb(new Error(msg));
            }   
        }
    });
}




/**
 * Get dispatcher - dispatcher
 * 
 * @param {string} dispatcher_id 
 * @param {*} cb (err, offers)
 */
function get(dispatcher_id, cb) {
    dispatcher.findById(dispatcher_id,function(err, dispatcher){
        if (err){  
            log(err) 
            cb(err)
        }else{
            cb(null, dispatcher)
        }
    });

};


/**
 * dispatcher lastlogin update
 * 
 * @param {Object} dispatcher_id 
 * @param {*} cb  - callback function
 */

function lastLogin(dispatcher_id, cb){
    var update = {last_login: Date.now()};

    dispatcher.findOneAndUpdate({_id:dispatcher_id},update,{new:true},function(err,doc){
        if (err) console.log("error pushing token: " + err.message)
        console.log("last_login update successfully for user: "+dispatcher_id.toString());
        cb(null, doc)
    });
}


/**
 * sumbit a new dispatcher's offer
 * 
 * @param {Object} dispatcherOffer 
 * @param {*} next (err, offer)
 */
function makeNewOffer(dispatcherOffer, cb) {

    async.waterfall([
        async.apply(calcTotalDistance, dispatcherOffer),
        saveOfferToDB
    ], function (err, result) {
        if (err){
            cb(err);
        }else{
            //console.log(result);
            cb(null, result);
        }

    });
}
  
    function calcTotalDistance(dispatcherOffer, callback) {
        var from = dispatcherOffer.from;
        var to = dispatcherOffer.to;
        var drops =  dispatcherOffer.drops;
        //let cloned = Object.assign({}, drops);

        var pairs =jsUtils.generatePairs(from,to,drops); //move to googleMatrix geo format: eg '[23.2,22.4]'
        var total_route_sum=0;
        async.each(pairs, function(pair, callbackEach) {

            calcRouteDistanceBetweenTwoPoints(pair, function(err,updatedPair){
                if (err){
                    callbackEach(err)
                }else{
                    total_route_sum += parseFloat(updatedPair.distance_num);
                    callbackEach(null, updatedPair)
                }
            });

        }, function(err) {
            if( err ) {
              callback(err)
            } else {
                dispatcherOffer.route = pairs;
                dispatcherOffer.total_distance_num = total_route_sum;
                dispatcherOffer.total_distance_str = (total_route_sum+" km");
               callback(null, dispatcherOffer);
            }
        });
    }


    function saveOfferToDB(dispatcherOffer, cb){
        var newOffer = new offer(dispatcherOffer);
        newOffer.save(function (err, offer) {
            if (err) {
                console.log("error submitting dispatcher's offer, message: " + err.message);
                return cb(err);
            } else {
                //firebaseUtils.offerUpdate();
                return cb(null, offer)
            }
        });
    }
   


/**
 * calculates the total route distance between 'pair.origin - pair.dest'
 * 
 * @param {Object} pair - contains origin_geo and dest_geo with comma seperated
 * @param {*} cb - callback (err, distance)
 */

function calcRouteDistanceBetweenTwoPoints(pair, cb) {

   // var origins = ['32.077352,34.774968']; //bar chocva
    //var destinations = ['33.061483,35.217852']; // kibuz eilon --> 142 km driving
    var origins  = pair.origin_geo;
    var destinations = pair.destination_geo;
    //var origins = ['San Francisco CA'];
    //var origins = ['41.8337349,-87.7321594'];
    //var destinations = ['41.8337329,-87.7321554'];
    googleDistance.matrix(origins, destinations, function (err, distances) {
        if (err) {
            var msg = 'error using googleDistance matrix';
            error(msg);
            return cb(new Error(msg));
        }
        if(!distances) {
            var msg = 'no distances';
            error(msg);
            return cb(new Error(msg));
        }
        if (distances.status == 'OK') {
            for (var i=0; i < origins.length; i++) {
                for (var j = 0; j < destinations.length; j++) {
                    var origin = distances.origin_addresses[i];
                    var destination = distances.destination_addresses[j];
                    if (distances.rows[0].elements[j].status == 'OK') {
                        var distance = distances.rows[i].elements[j].distance.text;
                        console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
                        pair.distance_str = distance;
                        pair.distance_num=distance.replace(/[^0-9\.]/g,'');
                        cb(null, pair);
                    } else {
                        console.log(destination + ' is not reachable by land from ' + origin);
                        var msg = destination + ' is not reachable by land from ' + origin;
                        var msg_hebrew = "לא ניתן להגיע אל היעד, בדוק את מקום ההתחלה ואת היעד שוב";
                        var message={
                            msg:msg,
                            msg_hebrew:msg_hebrew
                        }
                        error(message);
                        return cb(new Error(msg_hebrew));
                    }
                }
            }
        }
    });
};







/**
 * Get my Offers
 * 
 * @param {string} dispatcher_id 
 * @param {string} search_string 
 * @param {*} next (err, offers)
 */
function myOffers(dispatcher_id, search_string, cb) {
    
    var re = new RegExp(search_string, 'i');

    offer.find().or([
        { 'from.description': { $regex: re }},
        { 'to.description': { $regex: re }},
        //{ 'quote': { $regex: re }},
        //cannot user regex with Date
        //{ 'pickup_time': { $regex: re }},
        //{ 'drop_time': { $regex: re }},
        //{ 'weight': { $regex: re }},
        { 'status': { $regex: re }}
    ])
    .and({dispatcher_id:dispatcher_id})
    .exec(function(err, docs) {
        if(err){
            cb(err);
        }else{
            cb(null,docs);
        }
    });
};



// /**
//  * Get my Offers
//  * 
//  * @param {string} offer_id 
//  * @param {*} next (err, offer)
//  */
// function myOffers(offer_id, cb) {
    
//     offer.find({_id:offer_id})
//     //.and({_id:dispatcher_id})
//     .exec(function(err, doc) {
//         if(err){
//             cb(err);
//         }else{
//             cb(null, doc);
//         }
//     });
// };



/**
 * Get my Offers
 * 
 * @param {string} offer_id 
 * @param {*} next (err, offer)
 */
function offerInfo(offer_id, cb) {
    
    offer.findOne({_id:offer_id})
    //.and({_id:dispatcher_id})
    .exec(function(err, doc) {
        if(err){
            cb(err);
        }else{
            cb(null, doc);
        }
    });
};

/**
 * Get my Offers
 * 
 * @param {string} offer_id 
 * @param {*} next (err, offer)
 */
function offerGeoTracks(offer_id, cb) {
    var offer_objectId = mongoose.Types.ObjectId(offer_id);
   
    geoTrack.find({"offer_id":offer_objectId} ,function (err,docs){
        if (err){
            cb(err);
        }else{
            cb(null, docs);
        }
    })
   
};





module.exports = {
    register,
    login,
    get,
    makeNewOffer,
    myOffers,

    offerInfo,
    offerGeoTracks
};