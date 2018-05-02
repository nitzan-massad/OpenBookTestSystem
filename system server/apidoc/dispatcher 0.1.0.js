/**
 * @api {post} v1/dispatcher/register
 * Register a new dispatcher
 * 
 * @apiVersion 0.1.0
 * @apiName Register 
 * @apiGroup Dispatcher
 * 
 * @apiDescription Register a new dispatcher </br>
 * 
 * @apiHeader {String} TruckNow-App-Auth Client authenticator. request header to authenticate API call
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "TruckNow-App-Auth": "HoJ20bK27$vj5WOmJ11hEy0400FC1988"
 *     }
 * 
 * 
 * * @apiParam ( Dispatcher) {String} contact_person_first_name
 * * @apiParam ( Dispatcher) {String} contact_person_last_name 
 * * @apiParam ( Dispatcher) {String} company 
 * * @apiParam ( Dispatcher) {String} company_logo_url link to company logo
 * * @apiParam ( Dispatcher) {String} phone 
 * * @apiParam ( Dispatcher) {String} fax 
 * * @apiParam ( Dispatcher) {String} email 
 * * @apiParam ( Dispatcher) {String} password plaintext
 * * @apiParam ( Dispatcher) {String} commodity 
 * * @apiParam ( Dispatcher) {String} company_number_business_id 
 * * @apiParam ( Dispatcher) {String} company_address 
 * 
 * 
 * @apiParamExample Request-Example:
 *     HTTP/1.1 200 OK
{
	"contact_person_first_name":"Chen",
	"contact_person_last_name":"Shavit",
	"company":"moveo",
	"company_logo_url":"www.link.to.firebase.storage.company.logo.com",
    "phone":"050-5569954",
    "fax":"03-4452763",
	"email":"chen3@moveo.co.il",
	
	"password":"1234",
	"commodity":"concrete",

	"company_number_business_id":"55455GGT6",
	"company_address":"Bar ilan 13, Tel aviv"
		
}
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "E11000 duplicate key error collection: TruckNow.dispatchers index: email_1 dup key: { : \"chen@moveo.co.il\" }"
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "dispatcher": {
        "__v": 0,
        "updatedAt": "2018-04-25T09:02:08.797Z",
        "createdAt": "2018-04-25T09:02:08.797Z",
        "contact_person_first_name": "Chen",
        "contact_person_last_name": "Shavit",
        "company": "moveo",
        "company_logo_url": "www.link.to.firebase.storage.company.logo.com",
        "phone": "050-5569954",
        "email": "chen@moveo.co.il",
        "password": "$2a$10$ogpLfN6ZmWZszg1kqwsBzuofw4cz0.gKmtQIl.CLsl89bmOCG5uGu",
        "commodity": "concrete",
        "company_address": "Bar ilan 13, Tel aviv",
        "_id": "5ae044107fbbd54c08a2a634",
        "status": "active"
    }
}
 * 
 * 
 * 
*/
/**
 * @api {post} v1/dispatcher/login
 * Login dispatcher
 * 
 * @apiVersion 0.1.0
 * @apiName Login 
 * @apiGroup Dispatcher
 * 
 * @apiDescription Login Dispatcher to the dashboard

 * * @apiParam ( Dispatcher) {String} email unique
 * * @apiParam ( Dispatcher) {String} password plaintext user password
 * 
 * @apiParamExample Request-Example:
 *     HTTP/1.1 200 OK
{
	"email":"chen@moveo.co.il",
	"password":"1234"
}
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "verification failed: wrong email or password"
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "dispatcher": {
        "_id": "5aac09b2315c010e3c45ce7a",
        "updatedAt": "2018-03-16T18:18:38.327Z",
        "createdAt": "2018-03-16T18:15:14.241Z",
        "contact_person_first_name": "Chen",
        "contact_person_last_name": "Shavit",
        "company": "moveo",
        "phone": "050-5569954",
        "email": "chen@moveo.co.il",
        "password": "$2a$10$shSTp1KcIVPZsOD64dEAd.l0RrKWdDt2ji0sY6pGaIVH/hOLBxM9G",
        "commodity": "concrete",
        "company_address": "Bar ilan 13, Tel aviv",
        "__v": 0,
        "last_login": "2018-03-16T18:18:38.327Z",
        "status": "active"
    }
}
 * 
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "invalid parameters"
}
 */


 

 
/**
 * @api {get} v1/dispatcher/:dispatcher_id
 * Get Dispatcher details
 * 
 * @apiVersion 0.1.0
 * @apiName Details 
 * @apiGroup Dispatcher
 * 
 * @apiDescription Get dispatcher's details

 * 
 * * @apiParam ( Dispatcher) {String} dispatcher_id dispatcher_id's mongo's ObjectId

 * 
 * @apiParamExample Request-Example:
 *     HTTP/1.1 200 OK
/api/v1/dispatcher/:5aabeffc7fb8ff27dc8ce851
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "verification failed: wrong input"
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "dispatcher": {
        "_id": "5ad069bce05a643864332395",
        "updatedAt": "2018-04-13T08:26:36.025Z",
        "createdAt": "2018-04-13T08:26:36.025Z",
        "contact_person_first_name": "Chen",
        "contact_person_last_name": "Shavit",
        "company": "moveo",
        "email": "chen@moveo.co.il",
        "password": "$2a$10$VLb1J5H.wY8zAQAzvWyvMeyNDImgKew1wERtzJ4XNXkNZRFRAMjXC",
        "commodity": "concrete",
        "company_address": "Bar ilan 13, Tel aviv",
        "__v": 0,
        "status": "active"
    }
}
 * 
 * 
 *  *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "invalid dispatcher_id"
}

 */






 /**
 * @api {post} v1/dispatcher/makeNewOffer
 * Make New Offer
 * 
 * @apiVersion 0.1.0
 * @apiName Make Offer 
 * @apiGroup Dispatcher
 * 
 * @apiDescription Make a new Offer

 * * @apiParam ( Dispatcher) {String} dispatcher_id unique
 * * @apiParam ( Dispatcher) {Object} from source description and Geo location
 * * @apiParam ( Dispatcher) {Object} to destination description and Geo location
 * * @apiParam ( Dispatcher) {Number} quote offered quote
 * * @apiParam ( Dispatcher) {Object} pickup_time Date object - from & to
 * * @apiParam ( Dispatcher) {Date} drop_time Date object - from & to
 * * @apiParam ( Dispatcher) {Number} weight in KG
 * * @apiParam ( Dispatcher) {Object} drops array of objects (description and geoLocation)
 * * @apiParam ( Dispatcher) {Number} number_of_pallets 
 * * @apiParam ( Dispatcher) {Boolean} hazardous_materials_permit 
 * * @apiParam ( Dispatcher) {Boolean} max_days_until_payout 
 * * @apiParam ( Dispatcher) {Boolean} is_certificates_retrieval_required 
 * * @apiParam ( Dispatcher) {Boolean} is_commodity_check 
 * * @apiParam ( Dispatcher) {Boolean} is_unloading_for_client 
 * * @apiParam ( Dispatcher) {Boolean} is_diversed_pallet 
 * 
 * 
 * @apiParamExample Request-Example:
 *     HTTP/1.1 200 OK
{
	"dispatcher_id":"5adb528c42800c118867e4c5",
	"from":{
    "description": "David Inter Continental, tel aviv",
    "location":["32.065534","34.764808"]
},
	"to":{
    "description": "Animel zoo, Tlalim",
    "location":["30.994188","34.769854"]
},
	"quote":1,
	"pickup_time":{
		"from":"2018-04-26T12:28:57.000Z",
		"to":"2018-04-27T12:28:57.000Z"
	},
	"drop_time":{
		"from":"2018-04-27T12:28:57.000Z",
		"to":"2018-04-28T12:28:57.000Z"
	},
	"weight":"1700",
	"commodity":"concrete",

	"drops":[{
    "description": "unnamed road",
    "location":["32.036786","34.759108"]
},
{
    "description": "Assaf Harofeh medical center",
    "location":["31.967018","34.839064"]
},
{
    "description": "Kiryat Ata",
    "location":["32.819504","35.136353"]
}],
	
	"number_of_pallets":"13",
	"hazardous_materials_permit":true,
	"max_days_until_payout":66,
	"is_certificates_retrieval_required" : true,
    "is_commodity_check": false,
    "is_unloading_for_client": true,
    "is_diversed_pallet": false
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "offer": {
        "__v": 0,
        "updatedAt": "2018-04-23T12:38:15.454Z",
        "createdAt": "2018-04-23T12:38:15.454Z",
        "dispatcher_id": "5adb528c42800c118867e4c5",
        "quote": 200,
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
        "_id": "5addd3b791051f206c47125b",
        "status": "published",
        "route": [
            {
                "point": 0,
                "origin_desription": "David Inter Continental, tel aviv",
                "destination_desription": "unnamed road",
                "distance_str": "3.9 km",
                "distance_num": 3.9,
                "_id": "5addd3b791051f206c47125f",
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
                "_id": "5addd3b791051f206c47125e",
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
                "_id": "5addd3b791051f206c47125d",
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
                "_id": "5addd3b791051f206c47125c",
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
                "_id": "5addd3b791051f206c471262",
                "location": [
                    32.036786,
                    34.759108
                ]
            },
            {
                "description": "Assaf Harofeh medical center",
                "_id": "5addd3b791051f206c471261",
                "location": [
                    31.967018,
                    34.839064
                ]
            },
            {
                "description": "Kiryat Ata",
                "_id": "5addd3b791051f206c471260",
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
    "error": "invalid parameters"
}

*/



/**
 * @api {get} v1/dispatcher/dispatcher_id/myOffers?search_string=your_search_string_here
 * Get myOffers page
 * 
 * @apiVersion 0.1.0
 * @apiName myOffers 
 * @apiGroup Dispatcher
 * 
 * @apiDescription Get myOffers to the table display. use empty search string to get all offers

 * 
 * * @apiParam ( Dispatcher) {String} dispatcher_id mongo's ObjectId
 * * @apiParam ( Dispatcher) {String} search_string free-text search string
 * 
 * @apiParamExample Request-Example:
 *     HTTP/1.1 200 OK
/api/v1/dispatcher/:5aac09b2315c010e3c45ce7a/myOffers?search_string=
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
            "_id": "5aaede9e29623c2c44e7443d",
            "updatedAt": "2018-03-18T21:48:14.514Z",
            "createdAt": "2018-03-18T21:48:14.514Z",
            "dispatcher_id": "5aac09b2315c010e3c45ce7a",
            "quote": 200,
            "pickup_time": "2017-03-04T12:00:00.000Z",
            "drop_time": "03/04/2017 19:00",
            "weight": "700KG",
            "commodity": "concrete",
            "number_of_pallets": 13,
            "hazardous_materials_permit": true,
            "__v": 0,
            "status": "published",
            "drops": [
                {
                    "description": "The Katamons, jrs",
                    "_id": "5aaede9e29623c2c44e7443f",
                    "location": [
                        -54.23,
                        123.32
                    ]
                },
                {
                    "description": "The Katamons, jrs",
                    "_id": "5aaede9e29623c2c44e7443e",
                    "location": [
                        -54.23,
                        123.32
                    ]
                }
            ],
            "to": {
                "description": "Weizman 22nd apt 5, Tel Aviv",
                "location": [
                    12.22,
                    103.32
                ]
            },
            "from": {
                "description": "The Katamons, jrs",
                "location": [
                    -54.23,
                    123.32
                ]
            }
        }
    ]
}
 * 
 * 
 *  *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 {
    "error": "invalid dispatcher_id"
}
 *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "invalid parameters"
}
 */


 
 
/**
 * @api {get} v1/dispatcher/:dispatcher_id/offer/:offer_id/geoTracks
 *  Get Offer's GeoTracks
 * 
 * @apiVersion 0.1.0
 * @apiName get 
 * @apiGroup Dispatcher
 * 
 * @apiDescription Get dispatcher's geoTracks for an offer

 * 
 * * @apiParam ( Dispatcher) {String} dispatcher_id dispatcher_id's mongo's ObjectId
* * @apiParam ( Dispatcher) {String} offer_id offer_id's mongo's ObjectId
 * 
 * @apiParamExample Request-Example:
 *     HTTP/1.1 200 OK
/api/v1/dispatcher/5ad069bce05a643864332395/offer/5ad06db6dcccb148d8aceda8/geoTracks
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "dispatcher and offer mismatch"
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "geoTracks": [
        {
            "_id": "5ad3983644d40040e438ce08",
            "updatedAt": "2018-04-15T18:21:42.064Z",
            "createdAt": "2018-04-15T18:21:42.064Z",
            "offer_id": "5ad06db6dcccb148d8aceda8",
            "driver_id": "5ad0699ae05a643864332392",
            "__v": 0,
            "location": {
                "description": "Namir - Orlozorov junction",
                "coordinates": [
                    45.266486,
                    -72.147989
                ]
            }
        },
        {
            "_id": "5ad39a845c23783560a47e08",
            "updatedAt": "2018-04-15T18:31:32.391Z",
            "createdAt": "2018-04-15T18:31:32.391Z",
            "offer_id": "5ad06db6dcccb148d8aceda8",
            "driver_id": "5ad0699ae05a643864332392",
            "__v": 0,
            "location": {
                "description": "Hagonenim 5th, JRS",
                "coordinates": [
                    48.266486,
                    -32.147989
                ]
            }
        }
    ]
}
 * 
 * 
 *  *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 {
    "error": "invalid dispatcher_id"
}

 */


  
/**
 * @api {get} v1/dispatcher/:dispatcher_id/offer/:offer_id/info
 *  Get Dispatchers offer details
 * 
 * @apiVersion 0.1.0
 * @apiName info 
 * @apiGroup Dispatcher
 * 
 * @apiDescription Get dispatcher's geoTracks for an offer

 * 
 * * @apiParam ( Dispatcher) {String} dispatcher_id dispatcher_id's mongo's ObjectId
* * @apiParam ( Dispatcher) {String} offer_id offer_id's mongo's ObjectId
 * 
 * @apiParamExample Request-Example:
 *     HTTP/1.1 200 OK
api/v1/dispatcher/5ad06d98dcccb148d8aceda7/offer/5ad06db6dcccb148d8aceda8/info
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
{
    "error": "dispatcher and offer mismatch"
}
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "offer": {
        "_id": "5ad06db6dcccb148d8aceda8",
        "updatedAt": "2018-04-15T18:21:13.134Z",
        "createdAt": "2018-04-13T08:43:34.554Z",
        "dispatcher_id": "5ad06d98dcccb148d8aceda7",
        "quote": 300,
        "weight": 1700,
        "commodity": "concrete",
        "number_of_pallets": 13,
        "hazardous_materials_permit": true,
        "max_days_until_payout": 66,
        "total_distance_num": 371.3,
        "total_distance_str": "371.3 km",
        "__v": 0,
        "truck_id": "5ad06988e05a64386433238e",
        "driver_id": "5ad0699ae05a643864332392",
        "status": "in_delivery",
        "route": [
            {
                "point": 0,
                "origin_desription": "David Inter Continental, tel aviv",
                "destination_desription": "unnamed road",
                "distance_str": "3.9 km",
                "distance_num": 3.9,
                "_id": "5ad06db6dcccb148d8acedac",
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
                "_id": "5ad06db6dcccb148d8acedab",
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
                "_id": "5ad06db6dcccb148d8acedaa",
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
                "_id": "5ad06db6dcccb148d8aceda9",
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
                "_id": "5ad06db6dcccb148d8acedaf",
                "location": [
                    32.036786,
                    34.759108
                ]
            },
            {
                "description": "Assaf Harofeh medical center",
                "_id": "5ad06db6dcccb148d8acedae",
                "location": [
                    31.967018,
                    34.839064
                ]
            },
            {
                "description": "Kiryat Ata",
                "_id": "5ad06db6dcccb148d8acedad",
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
        }
    }
}
 * 
 * 
 *  *  * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 {
    "error": "invalid dispatcher_id"
}

 */

