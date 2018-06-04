'use strict';

var debug = require('debug');
var error = debug('mongooseInit:error');
var log = debug('mongooseInit:log');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//var manager = require('./init/manager');

//var dbConfig = require('config').get('MongoDB.Configurations');

var dbConfig ={

        "host": "localhost",
            "user": "",
            "password": "",
            "port": "27017",
            "database": "Wiser"
}
var user = dbConfig.user;
var pass = dbConfig.password;
if (!pass || pass.legnth <= 0)
{
    pass = '';
}
else
{
    pass = ':' + pass + '@';
}
mongoose.connect('mongodb://' + user + pass + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.database);  // connect to db

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function()
{
    // we're connected!
    log('DB connection success!');
    console.log('DB connection success!');

    // manager.start();

});


module.exports = {
};