var express = require('express');
var app = express();
// let DbUtils = require("./DbUtils.js");
let server = require("./server.js");
var bodyParser = require('body-parser')
let index = require("./routes/index.js");

app.use(bodyParser.json);
app.use(index);


app.listen(8000, () => {
    console.log('Server started!');
});



// app.post('/LogIn',function (req,res,next) {
//     console.log('adasd');
//     if (!req.userloggedIn) {
//         console.log(req);
//         console.log(req.userloggedIn);
//         let UserName = req.body.UserName;
//         let Password = req.body.Password;
//         console.log(UserName+" "+Password);
//         logRequest(UserName, Password, res, req).then(function () {
//             GetLogInData(req).then(function (ans) {
//                 res.send({Status:true ,Data : ans})
//             })
//
//         }).catch(function (ans) {
//             ans={}
//             res.send({Status: false ,Data : ans})
//         })
//     }
//     else {
//         GetLogInData(req).then(function (ans) {
//             res.send({Status:true ,Data : ans});
//         })
//     }
// });
// // sets here the login if correct details and also set the cookie
// function logRequest(username, pswd ,res, req) {
//     return new Promise(function (resolve, reject) {
//         let ClientIDQuery = DbUtils.ClientIDLoginQuery(username,pswd);
//         DbUtils.Select(ClientIDQuery).then(function (ClientID) {
//             if (Object.keys(ClientID).length > 0) {
//                 if (ClientID[0].isADmin=='1') {
//                     server.createCookie(ClientID[0].ClientID, res, true,username);
//                     console.log("admin");
//                 }else {
//                     server.createCookie(ClientID[0].ClientID, res, false,username);
//                     console.log("not admin");
//                 }
//                 resolve();
//             }
//             else {
//                 reject();
//             }
//         }).catch(function () {
//
//             reject();
//         })
//     })
// }
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
//
// var index = require('./routes/index');
// var users = require('./routes/users');
//

//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
//
// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', index);
// app.use('/users', users);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
module.exports = app;
