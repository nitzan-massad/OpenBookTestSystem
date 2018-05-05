/**
 * @api {post} v1/driver/register
 * Register a new driver
 * 
 * @apiVersion 0.1.0
 * @apiName Register 
 * @apiGroup Driver
 * 
 * @apiDescription Register a new driver </br>
 *  <b>Important ENUMS:</b> </br>
 *  <b>truck_weight_limit:</b> Integer </br>
 *  <b>media_desc"</b> ['driver_id','license'] default: driver_id</br>
 *  <b><u>Use those exact enum-strings</b></u>
 * @apiHeader {String} TruckNow-App-Auth Client authenticator. request header to authenticate API call
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "TruckNow-App-Auth": "HoJ20bK27$vj5WOmJ11hEy0400FC1988"
 *     }
 * 
 
 * * @apiParam ( Driver) {String} truck_id represent the truck object id which was recieved by the server for #/truck/register
 * * @apiParam ( Driver) {String} full_name 
 * * @apiParam ( Driver) {String} phone 
 * * @apiParam ( Driver) {String} email 
 * * @apiParam ( Driver) {String} password 
 * * @apiParam ( Driver) {Object} media Array of objects images/copies of documents. <b>see above ENUMS part</b>
 * * @apiParam ( Driver) {Boolean} has_hazardous_materials_permit 
 * 
 * 
 * @apiParamExample Request-Example:
 *     HTTP/1.1 200 OK
{
	"truck_id":"5ac3420d4313033b9c4312ba",
	
	
	"full_name":"yaron edry",
	"phone":"0544945787",
	"email":"yaron@moveo.co.il",
	"password":"1234",
	"media":[
		{

		"media_description":"license",
		"media_url":"www.someS3orGoogleFireBaseStroageLink1"
		},
		{
		"media_description":"driver_id",
		"media_url":"www.someS3orGoogleFireBaseStroageLink2"
		}
	],
	"has_hazardous_materials_permit":true,
	"android_token": "ofishAndroidsToken"
}
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "record 5ac3420d4314033b9c4312ba does not exists in trucks collection"
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "driver": {
        "__v": 0,
        "updatedAt": "2018-04-03T09:39:06.531Z",
        "createdAt": "2018-04-03T09:39:06.531Z",
        "full_name": "yaron edry",
        "phone": "0544945787",
        "email": "yaron@moveo.co.il",
        "password": "$2a$10$JvyQ.oSypRtpdmlO8a4DtumpuHjNJiL2eLKQDC9na0N5iPMdHz6am",

        "has_hazardous_materials_permit": true,
        "_id": "5ac34bbab89cdb15d812e15f",
        "status": "active",
        "device_details": {
            "allow_push": true,
            "ios_tokens": [],
            "android_tokens": [
                "ofishAndroidsToken"
            ]
        },
        "media": [
            {
                "media_description": "license",
                "media_url": "www.someS3orGoogleFireBaseStroageLink1",
                "_id": "5ac34bbab89cdb15d812e162",
                "status": "active"
            },
            {
                "media_description": "driver_id",
                "media_url": "www.someS3orGoogleFireBaseStroageLink2",
                "_id": "5ac34bbab89cdb15d812e161",
                "status": "active"
            }
        ],
        "truck_id": [
            "5ac3420d4313033b9c4312ba"
        ]
    }
}
 * 
 * 
 * 
*/
/**
 * @api {post} v1/driver/login
 * Login driver
 * 
 * @apiVersion 0.1.0
 * @apiName Login 
 * @apiGroup Driver
 * 
 * @apiDescription Login Driver to the app

 * 
 * * @apiParam ( Driver) {String} phone unique
 * * @apiParam ( Driver) {String} password plaintext user password
 * * @apiParam ( Driver) {String} ios_token optional. will be added to user tokens
 * * @apiParam ( Driver) {String} android_token optional. will be added to user tokens
 * 
 * @apiParamExample Request-Example:
 *     HTTP/1.1 200 OK
{
	"email":"noa@moveo.co.il",
	"password":"1234",
	"ios_token":"Noas_iOS_token"
}
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "verification failed: wrong license plate or password"
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "driver": {
        "_id": "5ac353b949f3a819a43923d5",
        "updatedAt": "2018-04-03T10:13:24.355Z",
        "createdAt": "2018-04-03T10:13:13.201Z",
        "full_name": "yaron edry",
        "phone": "0544945787",
        "email": "noa@moveo.co.il",
        "password": "$2a$10$pOz84QH1M1/PoVkI5j1puuR5vODL10MvG0wNuCPLc1MrgLNH43VjS",
        "truck_weight_limit": 20,
        "has_driver_assistance": false,
        "has_hazardous_materials_permit": true,
        "__v": 0,
        "status": "active",
        "device_details": {
            "allow_push": true,
            "ios_tokens": [
                "Noas_iOS_token"
            ],
            "android_tokens": [
                "ofishAndroidsToken"
            ]
        },
        "media": [
            {
                "media_description": "license",
                "media_url": "www.someS3orGoogleFireBaseStroageLink1",
                "_id": "5ac353b949f3a819a43923d8",
                "status": "active"
            },
            {
                "media_description": "driver_id",
                "media_url": "www.someS3orGoogleFireBaseStroageLink2",
                "_id": "5ac353b949f3a819a43923d7",
                "status": "active"
            },
            {
                "media_description": "property_insurance",
                "media_url": "www.someS3orGoogleFireBaseStroageLink27",
                "_id": "5ac353b949f3a819a43923d6",
                "status": "active"
            }
        ],
        "truck_type": "above_15",
        "truck_id": [
            "5ac3420d4313033b9c4312ba"
        ]
    }
}
 */


 
/**
 * @api {get} v1/driver/:driver_id
 *  Get Drivers details
 * 
 * @apiVersion 0.1.0
 * @apiName get 
 * @apiGroup Driver
 * 
 * @apiDescription Get driver's details

 * 
 * * @apiParam ( Driver) {String} driver driver's mongo's ObjectId

 * 
 * @apiParamExample Request-Example:
 *     HTTP/1.1 200 OK
/api/v1/driver/:5aabeffc7fb8ff27dc8ce851
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "verification failed: wrong input"
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "driver": {
        "_id": "5ac6426cae39e135740cd94b",
        "updatedAt": "2018-04-05T15:42:53.877Z",
        "createdAt": "2018-04-05T15:36:12.183Z",
        "full_name": "yaron edry",
        "phone": "0544945787000",
        "email": "yaron@moveo.co.il",
        "password": "$2a$10$UzINvrkiPFHs0ux8spmIX.fz22YRHMUNlqe9ikoU53MfElxLY7NjO",
        "has_hazardous_materials_permit": true,
        "truck_type": "above_15",
        "__v": 0,
        "status": "active",
        "device_details": {
            "allow_push": true,
            "ios_tokens": [
                "Noas_iOS_token",
                "Noas_iOS_token2"
            ],
            "android_tokens": [
                "ofishAndroidsToken"
            ]
        },
        "media": [
            {
                "media_description": "license",
                "media_url": "www.someS3orGoogleFireBaseStroageLink1",
                "_id": "5ac6426cae39e135740cd94e",
                "status": "active"
            },
            {
                "media_description": "driver_id",
                "media_url": "www.someS3orGoogleFireBaseStroageLink2",
                "_id": "5ac6426cae39e135740cd94d",
                "status": "active"
            }
        ],
        "truck_id": [
            "5ac6423bae39e135740cd944"
        ]
    }
}
 * 
 * 
 *  *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 {
    "error": "invalid driver_id"
}

 */




 
/**
 * @api {get} v1/driver/:driver_id/offers?lat=&lon=&time=&distance_lower_lim=&distance_upper_lim=&weight_lower_lim=&weight_upper_lim&sort=&offset=&limit=
 * Get all offers
 * 
 * @apiVersion 0.1.0
 * @apiName offers 
 * @apiGroup Driver
 * 
 * @apiDescription Get all published offers/jobs for the driver to view<br></br>
 * <b>NOTICE:</b> all fields are a MUST. those you wish to neglect simply assign 'default' value.
 * </br>
 * <b>see both request examples</b>
 * 
 * <b>is_saved</b> flag in the response represents weather the offer is already saved in the driver's saved offers
 * 
 * * @apiParam ( Driver) {String} lat driver's geo-location. latitude component
 * * @apiParam ( Driver) {String} lon driver's geo-location. longitude component
 * * @apiParam ( Driver) {String} time in DAY's options: [0, 1, 7, 30]
 * * @apiParam ( Driver) {String} distance_lower_lim in KMs 
 * * @apiParam ( Driver) {String} distance_upper_lim in KMs
 * 
 * * @apiParam ( Driver) {String} weight_lower_lim in TONs
 * * @apiParam ( Driver) {String} weight_upper_lim in TONs
 * 
 * * @apiParam ( Driver) {String} sort options: [date, distance, company_name, quote]
 
 * * @apiParam ( Driver) {String} offset (enable paging) input number 
 * * @apiParam ( Driver) {String} limit (enable paging) input number
 * 
 * @apiParamExample Request-Example:
 *     HTTP/1.1 200 OK
/api/v1/driver/5aabeffc7fb8ff27dc8ce851/offers?lat=30.036786&lon=36.759108&time=7&distance_lower_lim=100&distance_upper_lim=450&weight_lower_lim=3&weight_upper_lim=9&sort=distance&offset=0&limit=30
 * 
 * @apiParamExample Request-Example:
 *     HTTP/1.1 200 OK
/api/v1/driver/5aabeffc7fb8ff27dc8ce851/offers?lat=30.036786&lon=36.759108&time=default&distance_lower_lim=default&distance_upper_lim=default&weight_lower_lim=default&weight_upper_lim=default&sort=default&offset=0&limit=30
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "verification failed: wrong input"
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "offers": [
        {
            "_id": "5ae47a5f0ca9073b4cb267ba",
            "updatedAt": "2018-04-28T13:42:55.391Z",
            "createdAt": "2018-04-28T13:42:55.391Z",
            "quote": 2250,
            "weight": 1700,
            "commodity": "concrete",
            "number_of_pallets": 13,
            "hazardous_materials_permit": true,
            "max_days_until_payout": 66,
            "is_certificates_retrieval_required": true,
            "is_commodity_check": false,
            "is_unloading_for_client": true,
            "is_diversed_pallet": false,
            "total_distance_num": 371.3,
            "total_distance_str": "371.3 km",
            "status": "published",
            "route": [
                {
                    "point": 0,
                    "origin_desription": "David Inter Continental, tel aviv",
                    "destination_desription": "unnamed road",
                    "distance_str": "3.9 km",
                    "distance_num": 3.9,
                    "_id": "5ae47a5f0ca9073b4cb267be",
                    "destination_geo": [
                        "32.036786,34.759108"
                    ],
                    "origin_geo": [
                        "32.065534,34.764808"
                    ]
                },
                {
                    "point": 1,
                    "distance_str": "14.4 km",
                    "distance_num": 14.4,
                    "_id": "5ae47a5f0ca9073b4cb267bd",
                    "destination_geo": [
                        "31.967018,34.839064"
                    ],
                    "origin_geo": [
                        "32.036786,34.759108"
                    ]
                },
                {
                    "point": 2,
                    "distance_str": "120 km",
                    "distance_num": 120,
                    "_id": "5ae47a5f0ca9073b4cb267bc",
                    "destination_geo": [
                        "32.819504,35.136353"
                    ],
                    "origin_geo": [
                        "31.967018,34.839064"
                    ]
                },
                {
                    "point": 3,
                    "distance_num": 233,
                    "distance_str": "233 km",
                    "_id": "5ae47a5f0ca9073b4cb267bb",
                    "destination_geo": [
                        "30.994188,34.769854"
                    ],
                    "origin_geo": [
                        "32.819504,35.136353"
                    ]
                }
            ],
            "drops": [
                {
                    "description": "unnamed road",
                    "_id": "5ae47a5f0ca9073b4cb267c1",
                    "location": [
                        32.036786,
                        34.759108
                    ]
                },
                {
                    "description": "Assaf Harofeh medical center",
                    "_id": "5ae47a5f0ca9073b4cb267c0",
                    "location": [
                        31.967018,
                        34.839064
                    ]
                },
                {
                    "description": "Kiryat Ata",
                    "_id": "5ae47a5f0ca9073b4cb267bf",
                    "location": [
                        32.819504,
                        35.136353
                    ]
                }
            ],
            "drop_time": {
                "from": "2018-04-27T12:28:57.000Z",
                "to": "2018-04-28T12:28:57.000Z"
            },
            "pickup_time": {
                "from": "2018-04-26T12:28:57.000Z",
                "to": "2018-04-27T12:28:57.000Z"
            },
            "quote_currency": "NIS",
            "to": {
                "description": "Animel zoo, Tlalim",
                "location": [
                    30.994188,
                    34.769854
                ]
            },
            "from": {
                "description": "David Inter Continental, tel aviv",
                "location": [
                    32.065534,
                    34.764808
                ]
            },
            "__v": 0,
            "dispatcher_details": {
                "dispatcher_id": "5ae4724ad2fe867c46ebe1ec",
                "company": "moveo",
                "name": "Chen Shavit",
                "phone": "050-5569954",
                "company_logo_url": "www.link.to.firebase.storage.company.logo.com"
            },
            "is_saved": false
        },
        {
            "_id": "5ae47a640ca9073b4cb267c2",
            "updatedAt": "2018-04-28T13:43:00.901Z",
            "createdAt": "2018-04-28T13:43:00.901Z",
            "quote": 2250,
            "weight": 1700,
            "commodity": "concrete",
            "number_of_pallets": 13,
            "hazardous_materials_permit": true,
            "max_days_until_payout": 66,
            "is_certificates_retrieval_required": true,
            "is_commodity_check": false,
            "is_unloading_for_client": true,
            "is_diversed_pallet": false,
            "total_distance_num": 371.29999999999995,
            "total_distance_str": "371.29999999999995 km",
            "status": "published",
            "route": [
                {
                    "point": 0,
                    "origin_desription": "David Inter Continental, tel aviv",
                    "destination_desription": "unnamed road",
                    "distance_str": "3.9 km",
                    "distance_num": 3.9,
                    "_id": "5ae47a640ca9073b4cb267c6",
                    "destination_geo": [
                        "32.036786,34.759108"
                    ],
                    "origin_geo": [
                        "32.065534,34.764808"
                    ]
                },
                {
                    "point": 1,
                    "distance_str": "14.4 km",
                    "distance_num": 14.4,
                    "_id": "5ae47a640ca9073b4cb267c5",
                    "destination_geo": [
                        "31.967018,34.839064"
                    ],
                    "origin_geo": [
                        "32.036786,34.759108"
                    ]
                },
                {
                    "point": 2,
                    "distance_str": "120 km",
                    "distance_num": 120,
                    "_id": "5ae47a640ca9073b4cb267c4",
                    "destination_geo": [
                        "32.819504,35.136353"
                    ],
                    "origin_geo": [
                        "31.967018,34.839064"
                    ]
                },
                {
                    "point": 3,
                    "distance_num": 233,
                    "distance_str": "233 km",
                    "_id": "5ae47a640ca9073b4cb267c3",
                    "destination_geo": [
                        "30.994188,34.769854"
                    ],
                    "origin_geo": [
                        "32.819504,35.136353"
                    ]
                }
            ],
            "drops": [
                {
                    "description": "unnamed road",
                    "_id": "5ae47a640ca9073b4cb267c9",
                    "location": [
                        32.036786,
                        34.759108
                    ]
                },
                {
                    "description": "Assaf Harofeh medical center",
                    "_id": "5ae47a640ca9073b4cb267c8",
                    "location": [
                        31.967018,
                        34.839064
                    ]
                },
                {
                    "description": "Kiryat Ata",
                    "_id": "5ae47a640ca9073b4cb267c7",
                    "location": [
                        32.819504,
                        35.136353
                    ]
                }
            ],
            "drop_time": {
                "from": "2018-04-27T12:28:57.000Z",
                "to": "2018-04-28T12:28:57.000Z"
            },
            "pickup_time": {
                "from": "2018-04-26T12:28:57.000Z",
                "to": "2018-04-27T12:28:57.000Z"
            },
            "quote_currency": "NIS",
            "to": {
                "description": "Animel zoo, Tlalim",
                "location": [
                    30.994188,
                    34.769854
                ]
            },
            "from": {
                "description": "David Inter Continental, tel aviv",
                "location": [
                    32.065534,
                    34.764808
                ]
            },
            "__v": 0,
            "dispatcher_details": {
                "dispatcher_id": "5ae4724ad2fe867c46ebe1ec",
                "company": "moveo",
                "name": "Chen Shavit",
                "phone": "050-5569954",
                "company_logo_url": "www.link.to.firebase.storage.company.logo.com"
            },
            "is_saved": false
        }
    ]
}
 * 
 * 
 *  *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 {
    "error": "invalid driver_id"
}
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "bad coordinates"
}
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "time argument can be a none-negative number or 'default'"
}
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "distance_lower_lim argument can be a none-negative number or 'default'"
}

 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "distance_upper_lim argument can be a none-negative number or 'default'"
}
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "distance_upper_lim argument can be a none-negative number or 'default'"
}
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "distance_upper_lim cannot be smaller than distance_smaller_lim"
}
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "weight_lower_lim argument can be a none-negative number or 'default'"
}
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "weight_upper_lim cannot be smaller than weight_lower_lim"
}
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "invalid sort value: distasnce . sort value can be either: 'date', 'distance', 'company_name', 'quote', or 'default' "
}
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "impossible weight range : 33 - default"
}

 */

/**
 * @api {put} v1/driver/acquireOffer
 * Acquire Offer 
 * 
 * @apiVersion 0.1.0
 * @apiName acquireOffer 
 * @apiGroup Driver
 * 
 * @apiDescription Acquire a dispatcher offer. <b> Notice the "too late" Error</b>

 * 
 * * @apiParam ( Driver) {String} offer_id The offer/job you wish to acquire
 * * @apiParam ( Driver) {String} driver_id The Driver that is currently logged-in
 * * @apiParam ( Driver) {String} truck_id Truck_id $in driver's trucks array
 * 
 * @apiParamExample Request-Example:
 *     HTTP/1.1 200 OK
{
	"offer_id":"5abcf0fb82626e2f7439bf81",
	"driver_id":"5ac6426cae39e135740cd94b",
	"truck_id":"5ac3420d4313033b9c4312ba"
}
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "too late! Offer might have already been taken/cancelled"
}
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "driver 5ac6426cae39e135740cd94b cannot use truck 5ac3420d4313033b9c4312ba"
}


 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "offer": {
        "_id": "5adc6084de347a255c7f937e",
        "updatedAt": "2018-04-22T10:31:01.294Z",
        "createdAt": "2018-04-22T10:14:28.917Z",
        "quote": 22,
        "weight": 1700,
        "commodity": "concrete",
        "number_of_pallets": 13,
        "hazardous_materials_permit": true,
        "max_days_until_payout": 66,
        "total_distance_num": 371.3,
        "total_distance_str": "371.3 km",
        "status": "confirmed",
        "route": [
            {
                "point": 0,
                "origin_desription": "David Inter Continental, tel aviv",
                "destination_desription": "unnamed road",
                "distance_str": "3.9 km",
                "distance_num": 3.9,
                "_id": "5adc6084de347a255c7f9382",
                "destination_geo": [
                    "32.036786,34.759108"
                ],
                "origin_geo": [
                    "32.065534,34.764808"
                ]
            },
            {
                "point": 1,
                "distance_str": "14.4 km",
                "distance_num": 14.4,
                "_id": "5adc6084de347a255c7f9381",
                "destination_geo": [
                    "31.967018,34.839064"
                ],
                "origin_geo": [
                    "32.036786,34.759108"
                ]
            },
            {
                "point": 2,
                "distance_str": "120 km",
                "distance_num": 120,
                "_id": "5adc6084de347a255c7f9380",
                "destination_geo": [
                    "32.819504,35.136353"
                ],
                "origin_geo": [
                    "31.967018,34.839064"
                ]
            },
            {
                "point": 3,
                "distance_num": 233,
                "distance_str": "233 km",
                "_id": "5adc6084de347a255c7f937f",
                "destination_geo": [
                    "30.994188,34.769854"
                ],
                "origin_geo": [
                    "32.819504,35.136353"
                ]
            }
        ],
        "drops": [
            {
                "description": "unnamed road",
                "_id": "5adc6084de347a255c7f9385",
                "location": [
                    32.036786,
                    34.759108
                ]
            },
            {
                "description": "Assaf Harofeh medical center",
                "_id": "5adc6084de347a255c7f9384",
                "location": [
                    31.967018,
                    34.839064
                ]
            },
            {
                "description": "Kiryat Ata",
                "_id": "5adc6084de347a255c7f9383",
                "location": [
                    32.819504,
                    35.136353
                ]
            }
        ],
        "drop_time": {
            "from": "03/04/2017 19:00",
            "to": "03/04/2017 20:00"
        },
        "pickup_time": {
            "from": "03/04/2017 14:00",
            "to": "03/04/2017 15:00"
        },
        "to": {
            "description": "Animel zoo, Tlalim",
            "location": [
                30.994188,
                34.769854
            ]
        },
        "from": {
            "description": "David Inter Continental, tel aviv",
            "location": [
                32.065534,
                34.764808
            ]
        },
        "__v": 0,
        "truck_id": "5adb553b3fb15421cca8bde8",
        "driver_id": "5adb554b3fb15421cca8bdec",
        "dispatcher_details": {
            "dispatcher_id": "5aac09b2315c010e3c45ce7a",
            "company": "moveo",
            "name": "Chen Shavit",
            "phone": "050-5569954"
        }
    }
}
 * 
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "None existing offer/driver"
}
 */


 

/**
 * @api {get} v1/driver/:driver_id/myOffers
 * Get my Offers
 * 
 * @apiVersion 0.1.0
 * @apiName myOffers 
 * @apiGroup Driver
 * 
 * @apiDescription Get myOffers to the table display

 * 
 * * @apiParam ( Driver) {String} driver driver's mongo's ObjectId

 * 
 * @apiParamExample Request-Example:
 *     HTTP/1.1 200 OK
/api/v1/driver/5ac6426cae39e135740cd94b/myOffers
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "verification failed: wrong input"
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "offers": [
        {
            "_id": "5ae47a560ca9073b4cb267b2",
            "updatedAt": "2018-04-28T14:05:23.535Z",
            "createdAt": "2018-04-28T13:42:46.343Z",
            "quote": 2250,
            "weight": 1700,
            "commodity": "concrete",
            "number_of_pallets": 13,
            "hazardous_materials_permit": true,
            "max_days_until_payout": 66,
            "is_certificates_retrieval_required": true,
            "is_commodity_check": false,
            "is_unloading_for_client": true,
            "is_diversed_pallet": false,
            "total_distance_num": 371.3,
            "total_distance_str": "371.3 km",
            "status": "in_delivery",
            "route": [
                {
                    "point": 0,
                    "origin_desription": "David Inter Continental, tel aviv",
                    "destination_desription": "unnamed road",
                    "distance_str": "3.9 km",
                    "distance_num": 3.9,
                    "_id": "5ae47a560ca9073b4cb267b6",
                    "destination_geo": [
                        "32.036786,34.759108"
                    ],
                    "origin_geo": [
                        "32.065534,34.764808"
                    ]
                },
                {
                    "point": 1,
                    "distance_str": "14.4 km",
                    "distance_num": 14.4,
                    "_id": "5ae47a560ca9073b4cb267b5",
                    "destination_geo": [
                        "31.967018,34.839064"
                    ],
                    "origin_geo": [
                        "32.036786,34.759108"
                    ]
                },
                {
                    "point": 2,
                    "distance_str": "120 km",
                    "distance_num": 120,
                    "_id": "5ae47a560ca9073b4cb267b4",
                    "destination_geo": [
                        "32.819504,35.136353"
                    ],
                    "origin_geo": [
                        "31.967018,34.839064"
                    ]
                },
                {
                    "point": 3,
                    "distance_num": 233,
                    "distance_str": "233 km",
                    "_id": "5ae47a560ca9073b4cb267b3",
                    "destination_geo": [
                        "30.994188,34.769854"
                    ],
                    "origin_geo": [
                        "32.819504,35.136353"
                    ]
                }
            ],
            "drops": [
                {
                    "description": "unnamed road",
                    "_id": "5ae47a560ca9073b4cb267b9",
                    "location": [
                        32.036786,
                        34.759108
                    ]
                },
                {
                    "description": "Assaf Harofeh medical center",
                    "_id": "5ae47a560ca9073b4cb267b8",
                    "location": [
                        31.967018,
                        34.839064
                    ]
                },
                {
                    "description": "Kiryat Ata",
                    "_id": "5ae47a560ca9073b4cb267b7",
                    "location": [
                        32.819504,
                        35.136353
                    ]
                }
            ],
            "drop_time": {
                "from": "2018-04-27T12:28:57.000Z",
                "to": "2018-04-28T12:28:57.000Z"
            },
            "pickup_time": {
                "from": "2018-04-26T12:28:57.000Z",
                "to": "2018-04-27T12:28:57.000Z"
            },
            "quote_currency": "NIS",
            "to": {
                "description": "Animel zoo, Tlalim",
                "location": [
                    30.994188,
                    34.769854
                ]
            },
            "from": {
                "description": "David Inter Continental, tel aviv",
                "location": [
                    32.065534,
                    34.764808
                ]
            },
            "__v": 0,
            "truck_id": "5ae471a8d2fe867c46ebe1e5",
            "driver_id": "5ae471bbd2fe867c46ebe1e9",
            "dispatcher_details": {
                "dispatcher_id": "5ae4724ad2fe867c46ebe1ec",
                "company": "moveo",
                "name": "Chen Shavit",
                "phone": "050-5569954",
                "company_logo_url": "www.link.to.firebase.storage.company.logo.com"
            }
        }
    ]
}
 */


 

/**
 * @api {get} v1/driver/:driver_id/profile
 * Get Drivers profile page
 * 
 * @apiVersion 0.1.0
 * @apiName profile 
 * @apiGroup Driver
 * 
 * @apiDescription Get driver's profile

 * 
 * * @apiParam ( Driver) {String} driver driver's mongo's ObjectId

 * 
 * @apiParamExample Request-Example:
 *     HTTP/1.1 200 OK
/api/v1/driver/:5aabeffc7fb8ff27dc8ce851/profile
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "verification failed: wrong input"
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "profile": {
        "last_month": {
            "total_offers": 0,
            "total_distance_num": 0,
            "total_weight": 0
        },
        "last_year": {
            "total_offers": 0,
            "total_distance_num": 0,
            "total_weight": 0
        },
        "stars": {
            "total_offers": 1
        },
        "details": {
            "full_name": "yaron edry",
            "phone": "05449457857000",
            "image_url": "www.todo.imageurl/HiGuys/"
        }
    }
}
 * 
 * 
 *  *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 {
    "error": "invalid driver_id"
}

 */


 
/**
 * @api {post} v1/driver/saveOffer
 * Save Offer 
 * 
 * @apiVersion 0.1.0
 * @apiName saveOffer 
 * @apiGroup Driver
 * 
 * @apiDescription save a dispatcher offer. adds to drivers favorites

 * 
 * * @apiParam ( Driver) {String} offer_id The offer/job you wish to save
 * * @apiParam ( Driver) {String} driver_id The Driver that is currently logged-in
 * * @apiParam ( Driver) {String} truck_id The truck id
 * 
 * @apiParamExample Request-Example:
 *     HTTP/1.1 200 OK
{
	"offer_id":"5ab13944517dac403cdd1b1b",
    "driver_id":"5aabeffc7fb8ff27dc8ce851",
    "truck_id" :"5ac3420d4313033b9c4312ba"
}
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "too late! Offer might have already been taken/cancelled"
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "savedOffer": {
        "__v": 0,
        "updatedAt": "2018-04-22T16:29:22.995Z",
        "createdAt": "2018-04-22T16:29:22.995Z",
        "offer_id": "5adc6084de347a255c7f937e",
        "driver_id": "5adb554b3fb15421cca8bdec",
        "_id": "5adcb862a5920f3718565e34",
        "status": "active"
    }
}
 * 
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "None existing offer/driver"
}
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "Offer 5adc6084de347a255c7f937e is already in driver's 5adb554b3fb15421cca8bdec saved offers. see :5adcb82ea5920f3718565e33 in savedOffers collection"
}
 */

  
/**
 * @api {delete} v1/driver/unsaveOffer
 * unSave Offer 
 * 
 * @apiVersion 0.1.0
 * @apiName unsaveOffer 
 * @apiGroup Driver
 * 
 * @apiDescription unsave a dispatcher offer. remove from drivers favorites

 * 
 * * @apiParam ( Driver) {String} offer_id The offer/job you wish to save
 * * @apiParam ( Driver) {String} driver_id The Driver that is currently logged-in
 * * @apiParam ( Driver) {String} truck_id The truck id
 * 
 * @apiParamExample Request-Example:
 *     HTTP/1.1 200 OK
{
	"offer_id":"5ab13944517dac403cdd1b1b",
    "driver_id":"5aabeffc7fb8ff27dc8ce851",
    "truck_id" :"5ac3420d4313033b9c4312ba"
}
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "too late! Offer might have already been taken/cancelled"
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "savedOffer": {
        "__v": 0,
        "updatedAt": "2018-04-22T16:29:22.995Z",
        "createdAt": "2018-04-22T16:29:22.995Z",
        "offer_id": "5adc6084de347a255c7f937e",
        "driver_id": "5adb554b3fb15421cca8bdec",
        "_id": "5adcb862a5920f3718565e34",
        "status": "active"
    }
}
 * 
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "None existing offer/driver"
}
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "Offer 5adc6084de347a255c7f937e for driver's 5adb554b3fb15421cca8bdec and status 'active' does not exists in                          savedOffers collection"
}
 */




/**
 * @api {get} v1/driver/:driver_id/mySavedOffers
 * Get my saved Offers
 * 
 * @apiVersion 0.1.0
 * @apiName mySavedOffers 
 * @apiGroup Driver
 * 
 * @apiDescription Get myOffers to the table display

 * 
 * * @apiParam ( Driver) {String} driver driver's mongo's ObjectId

 * 
 * @apiParamExample Request-Example:
 *     HTTP/1.1 200 OK
/api/v1/driver/5ac353b949f3a819a43923d5/mySavedOffers
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "invalid driver_id"
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "offers": []
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "offers": [
        {
            "_id": "5adc6084de347a255c7f937e",
            "updatedAt": "2018-04-22T11:09:54.142Z",
            "createdAt": "2018-04-22T10:14:28.917Z",
            "quote": "1 BT",
            "weight": 1700,
            "commodity": "concrete",
            "number_of_pallets": 13,
            "hazardous_materials_permit": true,
            "max_days_until_payout": 66,
            "total_distance_num": 371.3,
            "total_distance_str": "371.3 km",
            "status": "published",
            "route": [
                {
                    "point": 0,
                    "origin_desription": "David Inter Continental, tel aviv",
                    "destination_desription": "unnamed road",
                    "distance_str": "3.9 km",
                    "distance_num": 3.9,
                    "_id": "5adc6084de347a255c7f9382",
                    "destination_geo": [
                        "32.036786,34.759108"
                    ],
                    "origin_geo": [
                        "32.065534,34.764808"
                    ]
                },
                {
                    "point": 1,
                    "distance_str": "14.4 km",
                    "distance_num": 14.4,
                    "_id": "5adc6084de347a255c7f9381",
                    "destination_geo": [
                        "31.967018,34.839064"
                    ],
                    "origin_geo": [
                        "32.036786,34.759108"
                    ]
                },
                {
                    "point": 2,
                    "distance_str": "120 km",
                    "distance_num": 120,
                    "_id": "5adc6084de347a255c7f9380",
                    "destination_geo": [
                        "32.819504,35.136353"
                    ],
                    "origin_geo": [
                        "31.967018,34.839064"
                    ]
                },
                {
                    "point": 3,
                    "distance_num": 233,
                    "distance_str": "233 km",
                    "_id": "5adc6084de347a255c7f937f",
                    "destination_geo": [
                        "30.994188,34.769854"
                    ],
                    "origin_geo": [
                        "32.819504,35.136353"
                    ]
                }
            ],
            "drops": [
                {
                    "description": "unnamed road",
                    "_id": "5adc6084de347a255c7f9385",
                    "location": [
                        32.036786,
                        34.759108
                    ]
                },
                {
                    "description": "Assaf Harofeh medical center",
                    "_id": "5adc6084de347a255c7f9384",
                    "location": [
                        31.967018,
                        34.839064
                    ]
                },
                {
                    "description": "Kiryat Ata",
                    "_id": "5adc6084de347a255c7f9383",
                    "location": [
                        32.819504,
                        35.136353
                    ]
                }
            ],
            "drop_time": {
                "from": "03/04/2017 19:00",
                "to": "03/04/2017 20:00"
            },
            "pickup_time": {
                "from": "03/04/2017 14:00",
                "to": "03/04/2017 15:00"
            },
            "to": {
                "description": "Animel zoo, Tlalim",
                "location": [
                    30.994188,
                    34.769854
                ]
            },
            "from": {
                "description": "David Inter Continental, tel aviv",
                "location": [
                    32.065534,
                    34.764808
                ]
            },
            "__v": 0,
            "truck_id": "5adb553b3fb15421cca8bde8",
            "driver_id": "5adb554b3fb15421cca8bdec",
            "dispatcher_details": {
                "company": "moveo",
                "name": "Chen Shavit",
                "phone": "050-5569954"
            },
            "is_saved": true
        }
    ]
}
 * 
 *  *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 {
    "error": "invalid driver_id"
}
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "invalid parameters"
}
 */


  
/**
 * @api {post} v1/driver/locationUpdate
 * Location Update
 * 
 * @apiVersion 0.1.0
 * @apiName locationUpdate 
 * @apiGroup Driver
 * 
 * @apiDescription Driver's location live-update

 * 
 * * @apiParam ( Driver) {String} offer_id The offer/job related to this geo-location
 * * @apiParam ( Driver) {String} driver_id The Driver that is currently logged-in
 * * @apiParam ( Driver) {Object} location The Driver's location object
 * 
 * @apiParamExample Request-Example:
 *     HTTP/1.1 200 OK
{
	"offer_id":"5aba76c36e1ef444f415b5d6",
	"driver_id":"5aabeffc7fb8ff27dc8ce851",
	"location":{
		"description":"Namir - Orlozorov junction",
		"coordinates":[45.266486, -72.147989]
	}
}

 * @apiParamExample Request-Example:
 *     HTTP/1.1 200 OK
{
	"offer_id":"5aba76c36e1ef444f415b5d6",
	"driver_id":"5aabeffc7fb8ff27dc8ce851",
	"location":{
		"description":"BAD COORDIANTES ARRAY",
		"coordinates":[45.266486]
	}
}
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "Offer status is not 'in_delivery' therefore cannot update location"
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "geoTrack": {
        "__v": 0,
        "updatedAt": "2018-03-28T08:28:12.147Z",
        "createdAt": "2018-03-28T08:28:12.147Z",
        "offer_id": "5aba76c36e1ef444f415b5d6",
        "driver_id": "5aabeffc7fb8ff27dc8ce851",
        "_id": "5abb521c6e4f541f60a988bd",
        "location": {
            "description": "Namir - Orlozorov junction",
            "coordinates": [
                45.266486,
                -72.147989
            ]
        }
    }
}
 * 
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "None existing offer/driver"
}

 * 
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "invalid coordinates"
}
 */


/**
 * @api {put} v1/driver/cancelOffer
 * Cancel Offer 
 * 
 * @apiVersion 0.1.0
 * @apiName CancelOffer 
 * @apiGroup Driver
 * 
 * @apiDescription Cancel a dispatcher offer. <b> update the offer status back to 'published' and back to the offer's pool</b>

 * 
 * * @apiParam ( Driver) {String} offer_id The offer/job you wish to cancel
 * * @apiParam ( Driver) {String} driver_id The Driver that is currently logged-in
 * * @apiParam ( Driver) {String} truck_id The truck id
 * 
 * @apiParamExample Request-Example:
 *     HTTP/1.1 200 OK
{
	"offer_id":"5abcf0fb82626e2f7439bf81",
	"driver_id":"5ac6426cae39e135740cd94b",
	"truck_id":"5ac6423bae39e135740cd944"
}
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "The Driver did not own this offer"
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "offer": {
        "_id": "5abcf0fb82626e2f7439bf81",
        "updatedAt": "2018-04-05T16:07:38.158Z",
        "createdAt": "2018-03-29T13:58:19.421Z",
        "dispatcher_details": {
            "dispatcher_id": "5aac09b2315c010e3c45ce7a",
            "company": "moveo",
            "name": "Chen Shavit",
            "phone": "050-5569954"
        }
        "quote": 2000,
        "weight": 1700,
        "commodity": "concrete",
        "number_of_pallets": 13,
        "hazardous_materials_permit": true,
        "max_days_until_payout": 66,
        "total_distance_num": 139,
        "total_distance_str": "139 km",
        "__v": 0,
        "driver_id": "5ac6426cae39e135740cd94b",
        "truck_id": "5ac6423bae39e135740cd944",
        "status": "published",
        "route": [
            {
                "point": 0,
                "origin_desription": "David Inter Continental, tel aviv",
                "destination_desription": "Animel zoo, Tlalim",
                "distance_str": "139 km",
                "distance_num": 139,
                "_id": "5abcf0fb82626e2f7439bf82",
                "destination_geo": [
                    "30.994188,34.769854"
                ],
                "origin_geo": [
                    "32.065534,34.764808"
                ]
            }
        ],
        "drops": [],
        "drop_time": {
            "from": "03/04/2017 19:00",
            "to": "03/04/2017 20:00"
        },
        "pickup_time": {
            "from": "03/04/2017 14:00",
            "to": "03/04/2017 15:00"
        },
        "to": {
            "description": "Animel zoo, Tlalim",
            "location": [
                30.994188,
                34.769854
            ]
        },
        "from": {
            "description": "David Inter Continental, tel aviv",
            "location": [
                32.065534,
                34.764808
            ]
        }
    }
}
 * 
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "None existing offer/driver"
}
 */



 
/**
 * @api {put} v1/driver/startJourney
 * Start journey 
 * 
 * @apiVersion 0.1.0
 * @apiName StartJourney 
 * @apiGroup Driver
 * 
 * @apiDescription update the offer status to "in_delivery"

 * 
 * * @apiParam ( Driver) {String} offer_id The offer/job you wish to start
 * * @apiParam ( Driver) {String} driver_id The Driver that is currently logged-in
 * 
 * @apiParamExample Request-Example:
 *     HTTP/1.1 200 OK
{
	"offer_id":"5abcf0fb82626e2f7439bf81",
	"driver_id":"5ac6426cae39e135740cd94b",
	"truck_id":"5ac6423bae39e135740cd944"
}
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "The Driver did not own this offer"
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "offer": {
        "_id": "5abcf0fb82626e2f7439bf81",
        "updatedAt": "2018-04-05T16:09:01.940Z",
        "createdAt": "2018-03-29T13:58:19.421Z",
        "dispatcher_id": "5aac09b2315c010e3c45ce7a",
        "quote": 3000,
        "weight": 1700,
        "commodity": "concrete",
        "number_of_pallets": 13,
        "hazardous_materials_permit": true,
        "max_days_until_payout": 66,
        "total_distance_num": 139,
        "total_distance_str": "139 km",
        "__v": 0,
        "driver_id": "5ac6426cae39e135740cd94b",
        "truck_id": "5ac6423bae39e135740cd944",
        "status": "in_delivery",
        "route": [
            {
                "point": 0,
                "origin_desription": "David Inter Continental, tel aviv",
                "destination_desription": "Animel zoo, Tlalim",
                "distance_str": "139 km",
                "distance_num": 139,
                "_id": "5abcf0fb82626e2f7439bf82",
                "destination_geo": [
                    "30.994188,34.769854"
                ],
                "origin_geo": [
                    "32.065534,34.764808"
                ]
            }
        ],
        "drops": [],
        "drop_time": {
            "from": "03/04/2017 19:00",
            "to": "03/04/2017 20:00"
        },
        "pickup_time": {
            "from": "03/04/2017 14:00",
            "to": "03/04/2017 15:00"
        },
        "to": {
            "description": "Animel zoo, Tlalim",
            "location": [
                30.994188,
                34.769854
            ]
        },
        "from": {
            "description": "David Inter Continental, tel aviv",
            "location": [
                32.065534,
                34.764808
            ]
        }
    }
}
 * 
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "None existing offer/driver"
}

 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "cannot start journey, offer status is published"
}
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "cannot start journey, offer status is cancelled"
}

 */

