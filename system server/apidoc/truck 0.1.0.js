/**
 * @api {post} v1/truck/register
 * Register a new truck
 * 
 * @apiVersion 0.1.0
 * @apiName Register 
 * @apiGroup Truck
 * 
 * @apiDescription Register a new truck </br>
 *  <b>Important ENUMS:</b> </br>
 *  <b>truck_weight_limit:</b> Integer </br>
 *  <b>media_desc"</b> ['driver_id','license', 'insurance',
                   'comprehensive_insurance','third_party_insurance',
                   'property_insurance','truck'] default: driver_id</br>
 *  <b><u>Use those exact enum-strings</b></u>
 * @apiHeader {String} TruckNow-App-Auth Client authenticator. request header to authenticate API call
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "TruckNow-App-Auth": "HoJ20bK27$vj5WOmJ11hEy0400FC1988"
 *     }
 * 
 * 

 * * @apiParam ( Truck) {Number} license_plate 
 * * @apiParam ( Truck) {String} discharge_direction enums["back","side","both"] - <b>see above</b>
 * * @apiParam ( Truck) {Object} media Array of objects images/copies of documents. <b>see above ENUMS part</b>
 * * @apiParam ( Truck) {String} truck_weight_limit Number in TONS
 * * @apiParam ( Truck) {String} truck_type enums["above_12","above_15"] - <b>see above</b>
 * * @apiParam ( Truck) {String} trunk_length Number in meters
 * 
 * * @apiParam ( Truck) {Boolean} has_electronic_jack 
 * * @apiParam ( Truck) {Boolean} has_driver_assistance 
 * * @apiParam ( Truck) {Boolean} has_loading_ramp 
 * * @apiParam ( Truck) {Boolean} has_hazardous_materials_permit 
 * 
 * 
 * @apiParamExample Request-Example:
 *     HTTP/1.1 200 OK
{
	"license_plate":66533421,
	"discharge_direction":"both",
	"media":[
		{
		"media_description":"truck",
		"media_url":"www.someS3orGoogleFireBaseStroageLink1"
		},
		{
		"media_description":"comprehensive_insurance",
		"media_url":"www.someS3orGoogleFireBaseStroageLink2"
		}
	],
	"truck_weight_limit":15,
	"truck_type":"above_15",
	"trunk_length":14,
		
	"has_electronic_jack":true,
	"has_driver_assistance":false,
	"has_loading_ramp":false,
	"has_hazardous_materials_permit":true	
}
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "E11000 duplicate key error collection: TruckNow.trucks index: license_plate_1 dup key: { : \"66533421\" }"
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "truck": {
        "__v": 0,
        "updatedAt": "2018-04-03T08:57:58.304Z",
        "createdAt": "2018-04-03T08:57:58.304Z",
        "license_plate": "66533421",
        "truck_weight_limit": 15,
        "trunk_length": 14,
        "has_electronic_jack": true,
        "has_driver_assistance": false,
        "has_loading_ramp": false,
        "has_hazardous_materials_permit": true,
        "_id": "5ac3420d4313033b9c4312ba",
        "status": "active",
        "truck_type": "above_15",
        "media": [
            {
                "media_url": "www.someS3orGoogleFireBaseStroageLink1",
                "_id": "5ac3420d4313033b9c4312bc",
                "status": "active",
                "media_description": "truck"
            },
            {
                "media_url": "www.someS3orGoogleFireBaseStroageLink2",
                "_id": "5ac3420d4313033b9c4312bb",
                "status": "active",
                "media_description": "comprehensive_insurance"
            }
        ],
        "discharge_direction": "both"
    }
}
 * 
 * 
 * 
*/


 
/**
 * @api {get} v1/truck/get?truck_id=truck_objectId
 * Get Truck details
 * 
 * @apiVersion 0.1.0
 * @apiName get 
 * @apiGroup Truck
 * 
 * @apiDescription Get Truck's details

 * 
 * * @apiParam ( Truck) {String} truck trucks's mongo's ObjectId

 * 
 * @apiParamExample Request-Example:
 *     HTTP/1.1 200 OK
/api/v1/truck/get?truck_id=5ac6423bae39e135740cd944
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "verification failed: wrong input"
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "truck": {
        "_id": "5ac6423bae39e135740cd944",
        "updatedAt": "2018-04-05T15:35:23.146Z",
        "createdAt": "2018-04-05T15:35:23.146Z",
        "license_plate": "665334212",
        "truck_weight_limit": 15,
        "trunk_length": 14,
        "has_electronic_jack": true,
        "has_driver_assistance": false,
        "has_loading_ramp": false,
        "has_hazardous_materials_permit": true,
        "__v": 0,
        "status": "active",
        "truck_type": "above_15",
        "media": [
            {
                "media_url": "www.someS3orGoogleFireBaseStroageLink1",
                "_id": "5ac6423bae39e135740cd946",
                "status": "active",
                "media_description": "truck"
            },
            {
                "media_url": "www.someS3orGoogleFireBaseStroageLink2",
                "_id": "5ac6423bae39e135740cd945",
                "status": "active",
                "media_description": "comprehensive_insurance"
            }
        ],
        "discharge_direction": "both"
    }
}
 * 
 * 
 *  *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 {
    "error": "invalid truck_id"
}

 */
