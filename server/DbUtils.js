// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/local", function(err, database) {
    if(!err) {
        console.log("We are connected");
    }
    else{
        console.log("error " +err);
    }
    const db = database.db('local')
    // db.collection('test', function(err, collection) {});

    // var collection = myAwesomeDB.collection('test');
    // var doc1 = {'hello':'doc1'};
    // collection.insert(doc1);
    db.collection('users').find(
        {'full_name':'student'},
        {$exists: true})
        .toArray(
            function(err, doc){
        if(doc) //if it does
        {
            console.log('in docs '+doc); // print out what it sends back
        }
        else  // if it does not
        {
            console.log("Not in docs");
        }
    });
});
