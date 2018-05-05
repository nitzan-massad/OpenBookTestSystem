/**
 * This module routes any URL path that starts with: '.../api/v1/dispatcher/'
 */

'use strict';

var debug = require('debug');
var error = debug('dispatcherRoutes:error');
var log = debug('dispatcherRoutes:log');

var express = require('express');
var router = express.Router();

// controller
var dispatcherController = require('../controllers/dispatcherController');

// validator
var dispatcherValidator = require('../validators/dispatcherValidator');

router.route('/register')
.post(
    dispatcherValidator.register,
    dispatcherController.register); // Register new driver
    
router.route('/login')
.post(
    dispatcherValidator.login,
    dispatcherController.login); // login to the dispatcher dashboard

    router.route('/:dispatcher_id')
.get(
    dispatcherValidator.get,
    dispatcherController.get); 


    router.route('/makeNewOffer')
.post(
    dispatcherValidator.makeNewOffer,
    dispatcherController.makeNewOffer); // Make a new offer

    router.route('/:dispatcher_id/myOffers')
.get(
    dispatcherValidator.myOffers,
    dispatcherController.myOffers); // Get myOffers


router.route('/:dispatcher_id/offer/:offer_id/info')
.get(
    dispatcherValidator.offerInfo,
    dispatcherController.offerInfo); // Get myOffers

router.route('/:dispatcher_id/offer/:offer_id/geoTracks')
.get(
    dispatcherValidator.offerGeoTracks,
    dispatcherController.offerGeoTracks); // Get myOffers


module.exports = router;