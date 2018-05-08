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
    studentHandler.register(res.locals.userDetails, function (err,student){
        if(err){
            next(err)
        }
        else{
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
    studentHandler.login(
        req.body.username,
        req.body.password,
        function (err, user){
            if(err){
                var errorJson= {
                    "succes":false
                }
                // next(errorJson)
                res.json(errorJson)
            }
            else{
                res.json(user)
            }
        });
}




module.exports =
    {
        register,
        login
    };

