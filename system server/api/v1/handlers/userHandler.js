'use strict';

var debug = require('debug');
var error = debug('userHandler:error');
var log = debug('userHandler:log');

var mongoose = require('mongoose'),
    user = require('../../../db/models/user/userModel'),
    contact = require('../../../db/models/user/contactModel');

var async = require('async');


var jsUtils = require('../../../utils/jsUtils');


/**
 * check if already Registered
 * 
 * @param {String} fbId 
 * @param {*} next (err, user)
 */
function checkIfAlreadyRegistered(fb_id, device_details, full_name, image_url, next) {
    if (!fb_id || !next) {
        var msg = 'invalid input';
        error(msg);
        next(new Error(msg));
        return;
    }
    //req.body.fb_id, req.body.device_details, req.body.full_name, req.body.image_url,
    user.findOne({ fb_id: fb_id }, function (err, doc) {
        var isNew = false;
        if (err) {
            console.log("error with fb_id: " + fb_id + " : " + "error: " + err.message);
            return next(err);
        } else {
            if (doc == null) {
                isNew = true;
                console.log("user with fb_id: " + fb_id + " : " + "does not exist");
                console.log("moving on to Registering user");
                return next(null, isNew, doc)
            } else {
                console.log("update fields")
                var deviceDetailsObj = {};
                deviceDetailsObj["allow_push"] = true;

                var update;
                if (device_details.android_token) {
                    deviceDetailsObj["android_token"] = device_details.android_token;
                    update = 
                    {
                        $addToSet: {
                            "device_details.android_token" : device_details.android_token,
                        },
                        $set: {
                            "device_details.allow_push" : deviceDetailsObj["allow_push"]
                        },
                        $setOnInsert: {
                            full_name: full_name,
                            image_url: image_url
                        }
                    }
                } else {
                    deviceDetailsObj["ios_token"] = device_details.ios_token;
                    update = {
                        $addToSet: {
                            "device_details.ios_token" : deviceDetailsObj["ios_token"],
                        },
                        $set: {
                            "device_details.allow_push" : deviceDetailsObj["allow_push"]
                        },
                        $setOnInsert: {
                            full_name: full_name,
                            image_url: image_url
                        }
                    }
                }
                user.findOneAndUpdate({ fb_id: fb_id }, 
                update,
                { new: true }, function (err, user) {
                    if (err) {
                        return next(err)
                    } else {
                        return next(null, isNew, user)
                    }
                })
            }
        }
    });

};




/**
 * Creates new fb user.
 * 
 * @param {String} fbId 
 * @param {*} userDetails should contain user details as in the user schema
 * @param {*} deviceDetails should contain device details as in the user schema
 * @param {*} next (err, user)
 */
function register(fb_id, device_details, full_name, image_url, next) {
    if (!fb_id || !next) {
        var msg = 'invalid input';
        error(msg);
        next(new Error(msg));
        return;
    }

    log('createNewFBUser started');

    var newUser = new user({
        fb_id: fb_id,
        device_details: device_details,
        full_name: full_name,
        image_url: image_url
    });

    newUser.save(function (err, savedUser) {
        if (err) {
            console.log("error registering user: " + err.message);
            return next(err);
        } else {
            return next(null, savedUser)
        }
    });

};

/**
 * contact us
 * 
 * @param {String} user_id user_id
 * @param {String} full_name full_name
 * @param {String} email email address
 * @param {String} message message
 * @param {*} next 
 */
function contactUs(user_id, full_name, email, message, next) {

    var newContact = new contact({
        user_id: user_id,
        full_name: full_name,
        email: email,
        message: message
    });

    newContact.save(function (err, savedContactUs) {
        if (err) {
            console.log("error saving contactUs form in DB for user: " + user_id + "message: " + err.message);
            return next(err);
        } else {
            return next(null, savedContactUs)
        }
    });

}



/**
 * log out
 * @param {String} android_token token for push notifications
 * @param {String} ios_token  token for push notifications
 * @param {String} user_id 
 * @param {*} next (err, user)
 */
function logout(android_token, ios_token, user_id, next) {

    var token;
    var update;
    if(android_token)
    {
        update = {$pull: {"device_details.android_token" : android_token}};
    }else
    {
        update = {$pull: {"device_details.ios_token" : ios_token}};
    }
    var userObj = mongoose.Types.ObjectId(user_id);
    var conditions = { _id: user_id }
        , options = { multi: false, new: true };

    user.findOneAndUpdate(conditions, update, options, function (err, user) {
        if (err) {
            console.log("error updating user: " + user_id + " and with allow_push to true");
            next(err);
        } else {
            next(null, user);
        }
    })

};



/**
 * edit user
 * 
 * @param {String} user_id user_id
 * @param {String} full_name full_name
 * @param {String} image_url image url
 * @param {*} next 
 */
function edit(user_id, full_name, image_url, next) {

    var conditions = { _id: user_id };

    var update = { $set: { full_name: full_name, image_url: image_url } }

    var options = { multi: false, new: true };

    user.findOneAndUpdate(conditions, update, options, function (err, doc) {
        if (err) {
            console.log("error editing  user: " + user_id);
            console.log(err.message);
            next(err);
        } else {
            next(null, doc);
        }
    });
}

/**
 * edit user
 * 
 * @param {String} user_id user_id
 * @param {Boolean} notifications the value for notifications
 * @param {*} next 
 */
function setNotifications(user_id, notifications, next) {

    var conditions = { _id: user_id };

    var update = { $set: { "device_details.allow_push": notifications } };

    var options = { multi: false, new: true };

    user.findOneAndUpdate(conditions, update, options, function (err, doc) {
        if (err) {
            console.log("error editing notifications for user: " + user_id);
            console.log(err.message);
            next(err);
        } else {
            next(null, doc);
        }
    });
}

function getNotifications(user_id, next)
{
    var conditions = { _id: user_id };

    user.findOne(conditions, function(err,doc) { 
        if(err) {
            console.log("error getting notifications setting for user: " + user_id);
            console.log(err.message);
            next(err);
        } else {
            var allow_push = doc.device_details._doc.device_details.allow_push
            next(null,allow_push);
        }
    })
}


/**
 * init iOS badge
 * 
 * @param {Object} user ObjectId of user 
 * @param {*} next 
 */
function initBadge(userId, next) {

    // var userId = userId._id.toString();

    // var updateBadge = {

    //     'device_details.badgeCounter': 0
    // };

    // user.findByIdAndUpdate(userId, updateBadge, { new: true }, next);

}


function getUser(usersIds, next) {
    // user.find({ _id: { $in: usersIds } }, function (err, usersDb) {
    //     if (err) {
    //         return next(err);
    //     }

    //     async.map(usersDb, getUserJsonLimited, next);
    // })
}

module.exports = {
    checkIfAlreadyRegistered,
    register,
    contactUs,
    logout,
    //initBadge: initBadge,
    //getUser: getUser,
    edit,
    setNotifications,
    getNotifications
};