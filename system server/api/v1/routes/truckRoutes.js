/**
 * This module routes any URL path that starts with: '.../api/v1/driver/'
 */

'use strict';

var debug = require('debug');
var error = debug('truckRoutes:error');
var log = debug('truckRoutes:log');

var express = require('express');
var router = express.Router();

// controller
var truckController = require('../controllers/truckController');

// validator
var truckValidator = require('../validators/truckValidator');

router.route('/register')
.post(truckValidator.register,
    truckController.register); // Register new a new track


router.route('/get')
.get(
    truckValidator.get,
    truckController.get); 

        

// router.route('/allTrucks')
// .get(
//     truckValidator.allTrucks,
//     truckController.allTrucks); // Register new a new track





module.exports = router;