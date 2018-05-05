'use strict';

var debug = require('debug');
var error = debug('dispatcherController:error');
var log = debug('dispatcherController:log');

var dispatcherHandler = require('../handlers/dispatcherHandler');
var dispatcherValidator = require('../validators/dispatcherValidator');


/**
 * Creates a new Dispatcher
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function register(req, res, next) {

   
    //1.validate request - validator
    //2.invoke handler - save to db
    //3.return ok
    dispatcherHandler.register(res.locals.dispatcherDetails, function(err, dispatcher){
        if(err){
            next(err)
        }else{
            res.json({dispatcher})
        }
    });


}

/**
 * Login a dispatcher
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function login(req, res, next) {

    dispatcherHandler.login(req.body.email.toLowerCase(), req.body.password
        , function(err,dispatcher){

        if (err){
            next(err)
        }else{
            res.json({dispatcher})
        }
    });

    
}




/**
 * Get dispatcher - Dispatcher
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function get(req, res, next) {

    var dispatcher_id = req.params.dispatcher_id;
    dispatcherHandler.get(dispatcher_id, function(err, dispatcher){
        if(err){
            next(err);
        }else{
            res.json({dispatcher});
        }
    });
}



/**
 * Make a new offer
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function makeNewOffer(req, res, next) {

    dispatcherHandler.makeNewOffer(res.locals.offer, function(err, offer){
        if(err){
            next(err)
        }else{
            res.json({offer})
        }
    });
}


/**
 * Get my Offers
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function myOffers(req, res, next) {

    var dispatcher_id = req.params.dispatcher_id;
    dispatcherHandler.myOffers(dispatcher_id,
        req.query.search_string, function(err, offers){
        if(err){
            next(err);
        }else{
            res.json({offers});
        }
    });
}



/**
 * Get an offers info
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function offerInfo(req, res, next) {

    var offer_id = req.params.offer_id;

    dispatcherHandler.offerInfo(offer_id, function(err, offer){
        if(err){
            next(err);
        }else{
            res.json({offer});
        }
    });
}



/**
 * Get offers geotrack
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function offerGeoTracks(req, res, next) {

    var offer_id = req.params.offer_id;
    dispatcherHandler.offerGeoTracks(offer_id, function(err, geoTracks){
        if(err){
            next(err);
        }else{
            res.json({geoTracks});
        }
    });
}




module.exports =
    {
        register,
        login,
        get,
        makeNewOffer,
        myOffers,
        offerInfo,
        offerGeoTracks
    };

