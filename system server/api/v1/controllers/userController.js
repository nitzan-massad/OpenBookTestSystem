'use strict';

var debug = require('debug');
var error = debug('userController:error');
var log = debug('userController:log');

var userHandler = require('../handlers/userHandler');
var userModel = require('../../../db/models/user/userModel');

//var client = require('../../../connection');   elastic demo


/**
 * Creates new user (signup)
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function registerOrLogin(req, res, next) {

    var handleResponse = function (err, user) {
        if (err) {
            // if fb user exist --> perform login
            if (err.name === 'MongoError' && err.code == 11000 && req.body.fb_id) {
                //res.status(400).send(err.message)
            }
            return next(err);
        }else{
            res.json({user});

        }
    }



    userHandler.checkIfAlreadyRegistered( // if registered => commence login
        req.body.fb_id, req.body.device_details, req.body.full_name, req.body.image_url, function(err, isNew, doc){
            if (isNew){ //if new, register
                userHandler.register(
                    req.body.fb_id,
                    req.body.device_details,
                    req.body.full_name,
                    req.body.image_url,
                    //req.body.location,
                    handleResponse)
            }else{//update name, image, device details
                
                handleResponse(null, doc);

            }

        });


       
    };


/**
 * Login user
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function login(req, res, next) {

    if (!req.body.fb_id && !(req.body.email && req.body.password)) {
        var msg = 'invalid parameters';
        error(msg);
        next(new Error(msg));
        return;
    }

    log('loginUser started');

    
}



/**
 * Contact Us
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function contactUs(req, res, next) {
    
    if (!req.body.user_id && !(req.body.email && req.body.message)) {
        var msg = 'invalid/missing parameters';
        error(msg);
        next(new Error(msg));
        return;
    }

    var handleResponse = function (err, contactUs) {
        if (err) {
            return next(err);
        }else{
            res.json({contactUs});

        }
    }

    userHandler.contactUs( 
        req.body.user_id, 
        req.body.full_name, 
        req.body.email, 
        req.body.message, handleResponse);
    
        
}


/**
 * Logout
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function logout(req, res, next) {
    
    if (!req.body.user_id) {
        var msg = 'missing field: user_id';
        error(msg);
        next(new Error(msg));
        return;
    }
    if(!(req.body.ios_token) && !(req.body.android_token))
    {
        var msg = 'missing field: ios_token or android_token';
        error(msg);
        next(new Error(msg));
        return;
    }

    var handleResponse = function (err, user) {
        if (err) {
            return next(err);
        }else{
            res.json({user});

        }
    }

    userHandler.logout( req.body.android_token, req.body.ios_token, 
        req.body.user_id, handleResponse);
}





/**
 * Edit user details
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function edit(req, res, next) {

    console.log('edit user started');
    
    var handleResponse = function (err, user) {
        if (err) {
            return next(err);
        }else{
            res.json({user});

        }
    }
    userHandler.edit(
        req.body.user_id,
        req.body.full_name,
        req.body.image_url,
        handleResponse)
    
        };


/**
 * Forgot password. 
 * Send email with new generated password.
 * 
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function forgotPassword(req, res, next) {
    // var email = req.body.email;
    // userHandler.forgotPassword(email, function (err) {
    //     if (err) {
    //         return next(err);
    //     }

    //     res.json({});
    // });

}

function initBadge(req, res, next) {
    // var user = res.locals.user;

    // userHandler.initBadge(user, function (err) {
    //     if (err) {
    //         return next(err);
    //     }

    //     res.json({});
    // });
}

function getUser(req, res, next) {
    // userHandler.getUsers(req.body, function (err, users) {
    //     if(err){
    //         return next(err);
    //     }

    //     res.send(users);
    // })
}

/**
 * set notifications value
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function setNotifications(req, res, next) {

    console.log('change user notifications started');
    
    var handleResponse = function (err, user) {
        if (err) {
            return next(err);
        }else{
            res.json({user});

        }
    }
    userHandler.setNotifications(
        req.body.user_id, req.body.notifications,
        handleResponse)
    
        };

/**
 * set notifications value
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function getNotifications(req, res, next) {

    
    var handleResponse = function (err, allow_push) {
        if (err) {
            return next(err);
        }else{
            
            res.json({allow_push});

        }
    }
    userHandler.getNotifications(
        req.body.user_id,
        handleResponse)
    
        };

module.exports =
    {
        registerOrLogin,
        login,
        contactUs,
        logout,
        //getUser: getUser,
        edit,
        //initBadge: initBadge,
        setNotifications,
        getNotifications

    };

