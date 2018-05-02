'use strict';

var debug = require('debug');
var error = debug('globalHandler:error');
var log = debug('globalHandler:log');

var mongoose = require('mongoose'),
    driver = require('../../../db/models/driver/driverModel'),
    dispatcher = require('../../../db/models/dispatcher/dispatcherModel');

var async = require('async');
var bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * change password logic
 * @param {String} entity
 * @param {String} email
 * @param {String} old_password
 * @param {String} new_password
 * @param {*} cb (err, user)
 */
function changePassword(entity, email, old_password, new_password, cb) {
    var collection = capitalizeFirstLetter(entity);
    mongoose.model(collection).findOne({email:email},function (err, doc){
        if (err){
            var msg = "Error fetching email: "+email + " from collection: "+entity;
            error(msg);
            return cb(new Error(msg));
        }else{
            if (doc==null){
                var msg = "Email: " + email + " does not exist in collection : "+entity;
                error(msg);
                return cb(new Error(msg));
            }else{
                var isPasswordVerified = bcrypt.compareSync(old_password, doc.password);
                if (isPasswordVerified == true){
                    var hash = bcrypt.hashSync(new_password, saltRounds);
                    mongoose.model(collection).findByIdAndUpdate(doc._id,
                    {
                        $set:{
                            password:hash
                        }
                    },
                    {
                        new : true
                    }, function (err, updatedDoc){
                        if (err){
                            var msg = "Error changing password. collection: "+entity+ " email: " +email + " . with hash: " + hash;
                            error(msg);
                            return cb(new Error(msg));
                        }else{
                            log(entity + " "+updatedDoc.email+ " has changed his password successfully");
                            cb(null, updatedDoc);
                        }
                    });
                }else{
                    var msg = "Invalid password" ;
                    error(msg);
                    return cb(new Error(msg));
                }
            }
        }
    })

    
};

//dispatcher => Dispatcher (in order to use mongoose.model()...)
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


/**
 * Forgot Password - Reset Password to user and send new to email
 * 
 * @param {string} truck_id 
 * @param {*} cb (err, offers)
 */
function forgotPassword(truck_id, cb) {

    cb(null, "not implemented yet")
  

};



module.exports = {
    changePassword,
    forgotPassword
};