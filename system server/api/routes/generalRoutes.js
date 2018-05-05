/**
 * This module routes any URL path that starts with: '.../'
 */

'use strict';

var debug = require('debug');
var error = debug('generalRoutes:error');
var log = debug('generalRoutes:log');

var express = require('express');
var router = express.Router();

router.all('/test/', function(req, res, next)
{
    res.send(res.statusCode=200);
}); 

module.exports = router;