/**
 * @api {put} v1/global/changePassword
 * Change password
 * 
 * @apiVersion 0.1.0
 * @apiName Change Password 
 * @apiGroup Global
 * 
 * @apiDescription Change Password
 * @apiHeader {String} TruckNow-App-Auth Client authenticator. request header to authenticate API call
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "TruckNow-App-Auth": "HoJ20bK27$vj5WOmJ11hEy0400FC1988"
 *     }
 * 
 * * @apiParam ( Global) {String} entity is either <b>Dispatcher</b> or <b>Driver</b>
 * * @apiParam ( Global) {String} email drivers/dispatchers email adderss
 * * @apiParam ( Global) {String} old_password plaintext 
 * * @apiParam ( Global) {String} new_password plaintext
 * 
 * @apiParamExample Request-Example:
 *     HTTP/1.1 200 OK
{
	"entity":"dispatcher",
	"email":"chen3@moveo.co.il",
	"old_password":"1234",
	"new_password":"12345"
}
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "Invalid email/password, check your input"
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "user": {
        "_id": "5adb528c42800c118867e4c5",
        "updatedAt": "2018-04-21T15:04:05.153Z",
        "createdAt": "2018-04-21T15:02:36.949Z",
        "contact_person_first_name": "Chen",
        "contact_person_last_name": "Shavit",
        "company": "moveo",
        "phone": "050-5569954",
        "email": "chen3@moveo.co.il",
        "password": "$2a$10$BHYv7HHB3HSSyysfkmvcY.8qoxIyDyF/ZcSEGu8iKsKRPmoo0r02O",
        "commodity": "concrete",
        "company_address": "Bar ilan 13, Tel aviv",
        "__v": 0,
        "status": "active"
    }
}

 * 
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "Invalid password"
}
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "Email: che4n3@moveo.co.il does not exist in collection : dispatcher"
}
*/

/**
 * @api {put} v1/global/forgotPassword
 * Forgot password
 * 
 * @apiVersion 0.1.0
 * @apiName Forgot Password 
 * @apiGroup Global
 * 
 * @apiDescription Forgot Password - reset and send email with new password to user's email address

 * * @apiParam ( Global) {String} entity is either <b>Dispatcher</b> or <b>Driver</b>
 * * @apiParam ( Global) {String} email drivers/dispatchers email adderss
 * 
 * @apiParamExample Request-Example:
 *     HTTP/1.1 200 OK
{
	"entity":"driver",
	"email":"liron@moveo.co.il",
	
}
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "Invalid email/password, check your input"
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "user": "not implemented yet"
}

 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "Email: liron@moveo.co.il does not exist in collection : drivers"
}
*/


