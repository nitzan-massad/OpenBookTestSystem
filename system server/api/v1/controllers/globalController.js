'use strict';

var debug = require('debug');
var error = debug('globalController:error');
var log = debug('globalController:log');

var globalHandler = require('../handlers/globalHandler');

var mongoose = require('mongoose'),
    driver = require('../../../db/models/driver/driverModel'),
    dispatcher = require('../../../db/models/dispatcher/dispatcherModel');


/**
 * Change Password
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function changePassword(req, res, next) {

    var entity = req.body.entity.toLowerCase();
    var email = req.body.email.toLowerCase();
    var old_password = req.body.old_password;
    var new_password = req.body.new_password;
   
    globalHandler.changePassword(entity, email, old_password, new_password, function(err, user){
        if(err){
            next(err);
        }else{
            res.json({user});
        }
    });
}

/**
 * Forgot Password
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function forgotPassword(req, res, next) {


    globalHandler.forgotPassword("details", function(err, user){
        if(err){
            next(err);
        }else{
            res.json({user});
        }
    });
}


module.exports =
    {
        changePassword,
        forgotPassword

    };

