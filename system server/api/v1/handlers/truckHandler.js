'use strict';

var debug = require('debug');
var error = debug('truckHandler:error');
var log = debug('truckHandler:log');

var mongoose = require('mongoose'),
    truck = require('../../../db/models/truck/truckModel');

var async = require('async');

//var firebaseUtils = require("./../../../utils/firebaseUtils");


/**
 * register truck
 * 
 * @param {Object} truckDetails 
 * @param {*} cb (err, user)
 */
function register(truckDetails, cb) {
    
    var newTruck = new truck(truckDetails);
    newTruck.save(function (err, truck) {
        if (err) {
            console.log("error registering truck: " + err.message);
            return cb(err);
        } else {
            return cb(null, truck)
        }
    });
    
};



/**
 * Get truck - Truck
 * 
 * @param {string} truck_id 
 * @param {*} cb (err, offers)
 */
function get(truck_id, cb) {
    truck.findById(truck_id,function(err,truck){
        if (err){  
            log(err) 
            cb(err)
        }else{
            cb(null, truck)
        }
    });

};



module.exports = {
    register,
    get
};