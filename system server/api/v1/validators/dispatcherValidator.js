'use strict';

var debug = require('debug');
var error = debug('dispatcherValidator:error');
var log = debug('dispatcherValidator:log');

var mongoose = require('mongoose'),
    dispatcher = require('../../../db/models/dispatcher/dispatcherModel'),
    offer = require('../../../db/models/dispatcher/offerModel');


var bcrypt = require('bcrypt');
const saltRounds = 10;

function register(req, res, next)
{
    var dispatcherDetails= {};

    var contact_person_first_name = req.body.contact_person_first_name;
    var contact_person_last_name = req.body.contact_person_last_name;
    var company = req.body.company;
    var company_logo_url = req.body.company_logo_url;
    var phone = req.body.phone;
    var fax = req.body.fax;
    var email = req.body.email;
    
   
    var password = req.body.password;
    var commodity = req.body.commodity;
    var company_number_business_id = req.body.company_number_business_id;
    var company_address = req.body.company_address;
    
    //TODO: add validations to fields
    //1. valid email address

    dispatcherDetails["contact_person_first_name"] = contact_person_first_name;
    dispatcherDetails["contact_person_last_name"] = contact_person_last_name;
    dispatcherDetails["company"] = company;
    dispatcherDetails["company_logo_url"] = company_logo_url;
    dispatcherDetails["phone"] = phone;
    dispatcherDetails["fax"] = fax;
    dispatcherDetails["email"]=email.toLowerCase();
    
    var hash = bcrypt.hashSync(password, saltRounds);
    dispatcherDetails["password"] = hash;

    
    dispatcherDetails["commodity"] = commodity;
    dispatcherDetails["company_address"] = company_address;

    res.locals.dispatcherDetails = dispatcherDetails;
    next();


}

function login(req, res, next){
    
    if (!req.body.email || !(req.body.password)) {
        var msg = 'invalid parameters';
        error(msg);
        next(new Error(msg));
    }


    
    next()
}




function get(req, res, next){
    var dispatcher_id = req.params.dispatcher_id;

    if (!dispatcher_id) {
        var msg = 'invalid dispatcher_id';
        error(msg);
        next(new Error(msg));
    }

    //make sure driver is valid
    dispatcher.findOne({_id:dispatcher_id},function(err,doc){
        if (err){
            next(err);
        }else{
            if (!doc){
                var msg = 'invalid dispatcher_id';
                error(msg)
                next(new Error(msg))
            }else{
                next();
            }
        }
    });
}





function makeNewOffer(req, res, next){
    
    if (!req.body.dispatcher_id || !(req.body.from) || !(req.body.to)) {
        var msg = 'invalid parameters';
        error(msg);
        next(new Error(msg));
    }

    var offer={};
    
    var dispatcher_id = req.body.dispatcher_id;
    var from = req.body.from;
    var to = req.body.to;
    var quote = req.body.quote;
    var pickup_time = req.body.pickup_time;
    var drop_time = req.body.drop_time;
    var weight = req.body.weight;
    var commodity = req.body.commodity;
    var drops = req.body.drops;
    var number_of_pallets = req.body.number_of_pallets;
    var hazardous_materials_permit = req.body.hazardous_materials_permit;
    var max_days_until_payout = req.body.max_days_until_payout;

    var is_certificates_retrieval_required = req.body.is_certificates_retrieval_required;
    var is_commodity_check =  req.body.is_commodity_check;
    var is_unloading_for_client =  req.body.is_unloading_for_client;
    var is_diversed_pallet =  req.body.is_diversed_pallet;

    offer["dispatcher_id"] = dispatcher_id;
    offer["from"] = from;
    offer["to"] = to;
    offer["quote"] = quote;
    offer["pickup_time"] = pickup_time;
    offer["drop_time"] = drop_time;
    offer["weight"] = weight;
    offer["commodity"] = commodity;
    offer["drops"] = drops;
    offer["number_of_pallets"] = number_of_pallets;
    offer["hazardous_materials_permit"] = hazardous_materials_permit;
    offer["max_days_until_payout"] = max_days_until_payout;

    offer["is_certificates_retrieval_required"] = is_certificates_retrieval_required;
    offer["is_commodity_check"] = is_commodity_check;
    offer["is_unloading_for_client"] = is_unloading_for_client;
    offer["is_diversed_pallet"] = is_diversed_pallet;
    
    res.locals.offer = offer;
    dispatcher.findOne({_id: dispatcher_id},function(err,doc){
        if (err){
            next(err);
        }else{
            if (!doc){
                var msg = 'invalid dispatcher_id';
                error(msg)
                next(new Error(msg))
            }else{
                next();
            }
        }
    });
}



function myOffers(req, res, next){
    var dispatcher_id = req.params.dispatcher_id;
    if (!dispatcher_id) {
        var msg = 'invalid parameters';
        error(msg);
        next(new Error(msg));
    }

    //make sure dispatcher_id is valid
    dispatcher.findOne({_id: dispatcher_id},function(err,doc){
        if (err){
            next(err);
        }else{
            if (!doc){
                var msg = 'invalid dispatcher_id';
                error(msg)
                next(new Error(msg))
            }else{
                next();
            }
        }
    });
}





function offerInfo(req, res, next){
    
    var dispatcher_id = req.params.dispatcher_id;
    var offer_id = req.params.offer_id;
    dispatcherOfferValidator(dispatcher_id, offer_id, function (err, doc){
        if (err){
            next(err)
        }else{
            if (doc==null){
                next(err)
            }else{
                next(null, doc)
            }
        }
    });
    
}


function offerGeoTracks(req, res, next){
    
    var dispatcher_id = req.params.dispatcher_id;
    var offer_id = req.params.offer_id;
    dispatcherOfferValidator(dispatcher_id, offer_id, function (err, doc){
        if (err){
            next(err)
        }else{
            if (doc==null){
                next(err)
            }else{
                next(null, doc)
            }
        }
    });
    
}





/**
 * Validate input before continue to next middleware
 * 
 * @param {string} offer_id 
 * @param {string} driver_id 
 * @param {*} callback (err, doc)
 */
function dispatcherOfferValidator(dispatcher_id, offer_id, cb){

    if (!dispatcher_id) {
        var msg = 'invalid dispatcher_id';
        error(msg);
        return cb(new Error(msg));
    }

    if (!offer_id) {
        var msg = 'invalid offer_id';
        error(msg);
        return cb(new Error(msg));
    }

    offer.findOne({_id:offer_id , dispatcher_id:dispatcher_id},function (err,doc){
        if (err){
            var msg = 'invalid offer_id';
            error(msg);
            return cb(new Error(msg));
        }else{
            if (doc==null){
                var msg = 'dispatcher and offer mismatch';
                error(msg);
                return cb(new Error(msg));
            }else{
                cb(null, doc)
            }
        
        }
    });

}




module.exports = {
    register,
    login,
    get,
    makeNewOffer,
    myOffers,
    offerInfo,
    offerGeoTracks
};