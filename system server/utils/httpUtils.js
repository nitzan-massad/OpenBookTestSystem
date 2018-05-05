'use strict';

var debug = require('debug');
var error = debug('httpUtils:error');
var log = debug('httpUtils:log');
var util = require('util');
var request = require('request');



function handleResponse(err, res, body) {
    var result = {
        err: null,
        body: null
    };
    if (err) {
        result.err = err;

        return result;
    }

    if (res.statusCode >= 400) {
        result.err = new Error(util.format("request faild with status code %s, message: %s", res.statusCode, body));
        return result;
    }

    result.body = JSON.parse(body);

    return result;

}


function handleResponseAsync(err, res, body, cb) {
    var result = handleResponse(err, res, body);

    cb(result.err, result.body);
}

function get(options, cb) {
    if(typeof options == 'string'){
        options = {url:options};
    }
    request.get(options, function (err, res, body) {
        handleResponseAsync(err, res, body, cb);
    });
}

function cleanUrl(url) {
    if(!url || typeof url != 'string'){
        return url;
    }   

    //remove double slash
    url = url.replace(/\/{1,}/g,'/');

    return url;
}



module.exports = {
    get:get,
    cleanUrl:cleanUrl,

};