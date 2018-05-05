'use strict';

var debug = require('debug');
var error = debug('studentValidator:error');
var log = debug('studentValidator:log');

var mongoose = require('mongoose'),

    driver = require('../../../db/models/driver/driverModel'),
    truck = require('../../../db/models/truck/truckModel'),
    offer = require('../../../db/models/dispatcher/offerModel'),
    savedOffer = require('../../../db/models/driver/savedOfferModel'),

    student = require ('../../../db/models/student/studentModel');

var async = require('async');
var bcrypt = require('bcrypt');
const saltRounds = 10;

function register(req, res, next)
{
    var userDetails={};
    userDetails["firstName"]=req.body.firstName;
    userDetails["lastName"]=req.body.lastName;
    userDetails["username"]=req.body.username;
    var password=req.body.password;
    var hashPassword= bcrypt.hashSync(password,saltRounds);
    userDetails["password"]=hashPassword;
    userDetails["status"]=req.body.status;
    userDetails["email"]=req.body.email;

    res.locals.userDetails=userDetails;
    next();
}



function login(req, res, next){
    if ((!req.body.username) || (!req.body.password)){
        var msg="invalid user name or password";
        error(msg);
        next(new Error(msg));
    }
    next()
}

module.exports = {
    register,
    login
};