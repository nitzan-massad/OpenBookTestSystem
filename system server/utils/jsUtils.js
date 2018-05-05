'use strict';

var debug = require('debug');
var error = debug('jsUtils:error');
var log = debug('jsUtils:log');

var async = require('async');
var from ={
    "description": "David Inter Continental, tel aviv",
    "location":["32.065534,34.764808"]
}
var to = {
    "description": "Animel zoo, Tlalim",
    "location":["30.994188,34.769854"]
}
var drops = [{
    "description": "unnamed road",
    "location":["32.036786,34.759108"]
},
{
    "description": "Assaf Harofeh medical center",
    "location":["31.967018,34.839064"]
},
{
    "description": "Kiryat Ata",
    "location":["32.819504,35.136353"]
}];
//console.log(generatePairs(from,to,drops));

/**
 * Generate Pairs
 * 
 * @param {Object} from 
 * @param {Object} to 
 * @param {Object} drops might be empty
 * @description returns an array of pairs-object with format ['33.22,22.334'] to calc distance
 */

function generatePairs(from, to, drops)
{
    var pairs = [];
    var firstPair = {};
    //check if drops array is empty - if so , only pair is 'from' and 'to' points
    if (drops.length==0){ 
        firstPair["point"] = 0;
        firstPair["origin_geo"] = [from.location.join(',')];
        firstPair["origin_desription"] = from.description;
        firstPair["destination_geo"] = [(to.location).join(',')];
        firstPair["destination_desription"] = to.description;
        firstPair["distance_str"] = -1;
        firstPair["distance_num"] = -1;
        pairs.push(firstPair);

    }else{
        for (let i=0 ; i < drops.length; i++){
            if (i == 0){
                firstPair["point"] = i;
                firstPair["origin_geo"] = [from.location.join(',')];
                firstPair["origin_desription"] = from.description;
                firstPair["destination_geo"] = [(drops[i].location).join(',')];
                firstPair["destination_desription"] = drops[i].description;
                firstPair["distance_str"] = -1;
                firstPair["distance_num"] = -1;
                pairs.push(firstPair);
                continue;
            }
            var tempPair ={};
            tempPair["point"] = i;
            tempPair["origin_geo"] = [(drops[i-1].location).join(',')];
            tempPair["origin_description"] = drops[i-1].description;
    
            tempPair["destination_geo"] = [(drops[i].location).join(',')];
            tempPair["destination_description"] = drops[i].description;
            tempPair["distance_str"] = -1;
            tempPair["distance_num"] = -1;
        
            pairs.push(tempPair);
            if (i == drops.length - 1 ){ // last one
                //console.log("last")
                var lastPair = {};
                lastPair["point"] = i+1;
                lastPair["origin_geo"] = [(drops[i].location).join(',')];
                lastPair["origin_description"] = drops[i].description;
    
                lastPair["destination_geo"] = [to.location.join(',')];
                lastPair["destination_description"] = to.description;
                lastPair["distance_num"] = -1;
                
                pairs.push(lastPair)
            }
        }
    }
   
    // console.log(pairs);
    return pairs;
}



function fixOffersArrayWithDisptacherDetails(offers, fixCB){
    // assuming openFiles is an array of file names
        var offers_with_dispatcher_details = [];
        async.each(offers, function(offer, callback) {
    
            if ( offer.dispatcher_id != null){
    
                var dispatcher_details={};
                dispatcher_details["dispatcher_id"] = offer.dispatcher_id._id.toString();
                dispatcher_details["company"] = offer.dispatcher_id.company;
                dispatcher_details["name"] = offer.dispatcher_id.contact_person_first_name +" "+ offer.dispatcher_id.contact_person_last_name;
                dispatcher_details["phone"] = offer.dispatcher_id.phone;
                //dispatcher_details["email"] = offer.dispatcher_id.email;
                dispatcher_details["company_logo_url"] = offer.dispatcher_id.company_logo_url;
                offer["dispatcher_details"] = dispatcher_details;
                delete offer["dispatcher_id"];
                offers_with_dispatcher_details.push(offer)
                //console.log(offer)
            }
            callback();
            
    
        }, function(err) {
            if( err ) {
            // One of the iterations produced an error.
            // All processing will now stop.
                fixCB(err)
            } else {
                console.log('All offers have been processed successfully');
                fixCB(null, offers_with_dispatcher_details);
            }
        });
    }



    
function addIsSavedTag(offers, myOffers, cb){
    // assuming openFiles is an array of file names
        var offers_with_isSavedTag = [];
        var myOffersIdArray = myOffers.map(offers => offers._id.toString());
        async.each(offers, function(offer, callback) {
            //console.log(offer._id.toString())
        if ( myOffersIdArray.includes(offer._id.toString())){
            offer["is_saved"] = true;
        }else{
            offer["is_saved"] = false;
        }
        offers_with_isSavedTag.push(offer);
        callback();
            
    
        }, function(err) {
            
            if( err ) {
            // One of the iterations produced an error.
            // All processing will now stop.
                cb(err)
            } else {
                console.log('is_saved tag was added to offers successfully');
                cb(null, offers_with_isSavedTag);
            }
        });
    }

   // lat=30.036786&lon=36.759108&time=9&distance_lower_lim=222&distance_upper_lim=450&
    //weight_lower_lim=default&weight_upper_lim=default&sort=distance&offset=0&limit=30
/**
 * Build filter query to Offers Mongo query
 * 
 * @param {Number} time time in Days
 * @param {Number} distance_lower_lim in kms
 * @param {Number} distance_upper_lim in kms
 * @param {Number} weight_lower_lim in TONs
 * @param {Number} weight_upper_lim in TONs
 */
function buildFilterQuery(time, distance_lower_lim, distance_upper_lim,
                            weight_lower_lim, weight_upper_lim){
    var query = {status:"published"};


    return query;
}


/**
 * Build sort query to Offers Mongo query
 * All offers sorted with location
 * sort parameter is optional and can have more sort dimension
 * offers can be sorted by : [date] [distance] [company_name] [quote]
 * 
 * @param {Number} lat geo location latitude component
 * @param {Number} lon geo location longitude component
 * @param {Number} sort 
 */

function buildSortQuery(lat, lon, sort){
    var query ={};

    return query;
}


// var y ={
// };

// var k = undefined;
// y.z.g = undefined;
// // var b=Object.assign({}, a);;
// // a["key"]="value"
//  console.log(y)


module.exports = {
    generatePairs,
    fixOffersArrayWithDisptacherDetails,
    addIsSavedTag,
    buildFilterQuery,
    buildSortQuery
};