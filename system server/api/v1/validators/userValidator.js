// 'use strict';

// var debug = require('debug');
// var error = debug('userValidator:error');
// var log = debug('userValidator:log');

// /**
//  * Validates user registeration
//  * @param {*} req 
//  * @param {*} res 
//  * @param {*} next 
//  */
// function register(req, res, next)
// {
//     req.checkBody(
//     {
//         'fb_id': {      
//             optional: {
//                 options: { checkFalsy: true }
//             },
//             errorMessage: 'Invalid fb_id'
//         }
//     });

//     req.getValidationResult().then(function(result) 
//     {
//         if(!result.isEmpty())
//         {
//             var resMsg = result.useFirstErrorOnly().array()[0].msg;
//             var msg = 'Validation error: ' + resMsg;
//             error(msg);
//             return next(new Error(resMsg));
//         }
//         next();
//     });
// }


// /**
//  * Validates user forgot password.
//  * 
//  * @param {*} req 
//  * @param {*} res 
//  * @param {*} next 
//  */
// function forgotPassword(req, res, next)
// {
//     req.checkBody(
//     {
//         'email': {
//             notEmpty: true,
//             isEmail: {
//                 errorMessage: 'Invalid email'
//             }
//         }
//     });

//     req.getValidationResult().then(function(result) 
//     {
//         if(!result.isEmpty())
//         {
//             var resMsg = result.useFirstErrorOnly().array()[0].msg;
//             var msg = 'Validation error: ' + resMsg;
//             error(msg);
//             return next(new Error(resMsg));
//         }
//         next();
//     });
// }

// module.exports = {
//     register : register,
//     forgotPassword : forgotPassword
// };