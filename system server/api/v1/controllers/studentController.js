'use strict';

var debug = require('debug');
// var error = debug('driverController:error');
// var log = debug('driverController:log');

var studentHandler = require('../handlers/studentHandler');
var stundetValidator = require('../validators/studentValidator');


/**
 * Creates new user/ now its student (signup)
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function register(req, res, next) {
    studentHandler.register(res.locals.userDetails, function (err, student) {
        if (err) {
            next(err)
        }
        else {
            res.json({student})
        }
    });
}

/**
 * Login driver
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function login(req, res, next) {

    //console.log("test 2 ")
    studentHandler.login(
        req.body.username,
        req.body.password,
        function (err, user) {
            if (err) {
                var errorJson = {
                    "succes": false
                }
                // next(errorJson)
                res.json(errorJson)
            }
            else {
                res.json(user)
            }
        });
}


function getMessages(req, res, next) {
    studentHandler.getMessages(res.locals.details, function (err, messages) {
        if (err) {
            next(err)
        }
        else {
            res.json({messages})
        }
    });

}

function readMessage(req,res,nexr){
    studentHandler.readMessage(res.locals.details, function (err, success) {
        if (err) {
            var errorJson = {
                "succes": false
            }
            // next(errorJson)
            res.json({"succes": false})
        }
        else {
            console.log(success)
            var correctJson = {
                "succes": true
            }
            res.json({"succes": true})
        }
    });
}

module.exports =
    {
        register,
        login,
        getMessages,
        readMessage
    };

