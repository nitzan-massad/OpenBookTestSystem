
'use strict';

var debug = require('debug');
var error = debug('globalValidator:error');
var log = debug('globalValidator:log');

var mongoose = require('mongoose'),
    truck = require('../../../db/models/truck/truckModel');

var async = require('async');


function changePassword(req, res, next)
{
    var entity = req.body.entity ? req.body.entity.toLowerCase() : req.body.entity;
    var email = req.body.email ? req.body.email.toLowerCase(): req.body.email;
    var old_password = req.body.old_password;
    var new_password = req.body.new_password;

    if (!entity || (entity=!'driver' && entity!='dispatcher')){
        var msg = "invalid entity: " + entity +". can be either Driver or Dispatcher";
        error(msg);
        return next(new Error(msg));
    }

    if (!email || !old_password || !new_password){
        var msg = "Invalid email/password, check your input";
        error(msg);
        return next(new Error(msg));
    }
    next();
}



function forgotPassword(req, res, next){
    
    next();
}






module.exports = {
    changePassword,
    forgotPassword
};