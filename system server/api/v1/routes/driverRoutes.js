// /**
//  * This module routes any URL path that starts with: '.../api/v1/driver/'
//  */
//
// 'use strict';
//
// var debug = require('debug');
// var error = debug('driverRoutes:error');
// var log = debug('driverRoutes:log');
//
// var express = require('express');
// var router = express.Router();
//
// // controller
// var driverController = require('../controllers/driverController');
//
// // validator
// var driverValidator = require('../validators/driverValidator');
//
// router.route('/register')
// .post(
//     driverValidator.register,
//     driverController.register); // Register new driver
//
// router.route('/login')
// .post(
//     driverValidator.login,
//     driverController.login);
//
// router.route('/logout')
// .post(
//     driverValidator.logout,
//     driverController.logout);
//
// router.route('/:driver_id')
// .get(
//     driverValidator.get,
//     driverController.get);
//
//
// router.route('/:driver_id/offers')
// .get(
//     driverValidator.offers,
//     driverController.offers);
//
// router.route('/acquireOffer')
// .put(
//     driverValidator.acquireOffer,
//     driverController.acquireOffer);
//
// router.route('/:driver_id/myOffers')
// .get(
//     driverValidator.myOffers,
//     driverController.myOffers);
//
// router.route('/:driver_id/profile')
// .get(
//     driverValidator.profile,
//     driverController.profile);
//
// router.route('/saveOffer')
// .post(
//     driverValidator.saveOffer,
//     driverController.saveOffer);
//
// router.route('/unsaveOffer')
// .delete(
//     driverValidator.unsaveOffer,
//     driverController.unsaveOffer);
//
// router.route('/:driver_id/mySavedOffers')
// .get(
//     driverValidator.mySavedOffers,
//     driverController.mySavedOffers);
//
//
// router.route('/locationUpdate')
// .post(
//     driverValidator.locationUpdate,
//     driverController.locationUpdate);
//
// router.route('/cancelOffer')
// .put(
//     driverValidator.cancelOffer,
//     driverController.cancelOffer);
//
// router.route('/startJourney')
// .put(
//     driverValidator.startJourney,
//     driverController.startJourney);
//
//
//
//
// module.exports = router;
//
//
