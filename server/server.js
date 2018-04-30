var express = require('express');
var app = express();
var DbUtils = require("./DbUtils.js");
var server = require("./server.js");
var bodyParser = require('body-parser')
var index = require("./routes/index.js");

var User = require('./lib/user');


//
//
// app.listen(8000, () => {
//     console.log('Server started!');
//
//
// });

app.use(bodyParser.json);
app.use(index);

var chris = new User({
    firstName: 'Nitzan',
    lastName: 'Massad',
    email: 'nitzan@gmail.com',
    username: 'Nitz',
    password: 'password',
    status: 'student'
});

// chris.hashPassword(function(err, pass) {
//     if (err)
//         throw err;
// });

chris.login(function (err,status){
        if (err) throw err;
        console.log('User status is:'+ status);

});

// // call the built-in save method to save to the d atabase
// chris.save(function(err) {
//     if (err) throw err;
//     console.log('User saved successfully!');
// });


module.exports = app;
