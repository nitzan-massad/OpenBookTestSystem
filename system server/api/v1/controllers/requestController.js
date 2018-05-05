/**
 * Control the API requests
 */

'use strict';

var debug = require('debug');
var error = debug('requestController:error');
var log = debug('requestController:log');

// var headerConfig = require('config').get('Security.Request.Header');



/**
 * Verifies the headers are valid.
 * This call making sure that only the app send calls to the
 * server and not someone else.
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function verifyHeaders(req, res, next)
{
    log('start verifyHeaders');
    var authHeader = req.get(headerConfig.key);
    if (authHeader == headerConfig.value )
    {
        log('Header verified');
        next();
    }
    else
    {
        next(new Error('Auth failed'));
    }
};


module.exports = {
    verifyHeaders : verifyHeaders
};