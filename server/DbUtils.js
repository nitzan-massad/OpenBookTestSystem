// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://ec2-35-176-208-47.eu-west-2.compute.amazonaws.com:27017/openbooktestdb", function(err, db) {
    if(!err) {
        console.log("We are connected");
    }
    else{
        console.log("error" +err);
    }
});