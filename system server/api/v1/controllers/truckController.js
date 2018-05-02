'use strict';

var debug = require('debug');
var error = debug('truckController:error');
var log = debug('truckController:log');

var truckHandler = require('../handlers/truckHandler');
var truckValidator = require('../validators/truckValidator');
var mongoose = require('mongoose'),
    truck = require('../../../db/models/truck/truckModel');


/**
 * Creates new truck
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function register(req, res, next) {

    //if truck_plate already exists return the truck, else move to handler and register truck
    /*
    truck.findOne({"license_plate": res.locals.truckDetails.license_plate}, function (err, truck){
        if (err){
            next(err);
        }else{
            if (truck == null){
                truckHandler.register(res.locals.truckDetails, function(err, truck){
                    if(err){
                        next(err)
                    }else{
                        res.json({truck})
                    }
                });
            }else{
                return res.json({truck});
            }

        }
    });
*/
    truckHandler.register(res.locals.truckDetails, function(err, truck){
        if(err){
            next(err)
        }else{
            res.json({truck})
        }
    });
}

/**
 * Get truck - Truck
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function get(req, res, next) {

    truckHandler.get(req.query.truck_id, function(err, truck){
        if(err){
            next(err);
        }else{
            res.json({truck});
        }
    });
}


module.exports =
    {
        register,
        get

    };

