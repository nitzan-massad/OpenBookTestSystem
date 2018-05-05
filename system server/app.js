'use strict';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var mongo = require('./db/mongooseInit');
//var _elastic = require('./connection')
//var firebase = require('./utils/firebase/init');
var generalRoutes = require('./api/routes/generalRoutes');
var apiRoutes = require('./api/routes/apiRoutes');
var fs = require('fs');
var cors = require('cors');
var app = express();

var RateLimit = require('express-rate-limit');
var limiter = new RateLimit({
  windowMs: 15*60*1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
});
//app.use(limiter);

var AdminUser = require('./admin/models/adminUserModel');

var accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), {flags: 'a'});
app.use(logger('remote-addr - :remote-user [:date[clf]] \
":method :url HTTP/:http-version" :status :res[content-length] \
":referrer" ":user-agent" :response-time ms', {
  stream: accessLogStream,
  skip: function (req,res) {
    return req.url.startsWith('/test');
  }
}));

/* ELASTIC DEMO
_elastic.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('elasticsearch cluster is on');
  }
});

_elastic.cluster.health({},function(err,resp,status) {  
  console.log("-- Client Health --",resp);
});
*/

//enable CORS
app.use(cors());
//


app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));		
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");		
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");		
  next();		
});
// this line must be immediately after any of the bodyParser middlewares!
app.use(expressValidator()); 

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(__dirname + '/dist'));

app.use('/api/', express.static(__dirname + '/webApidoc')); 

app.use('/', generalRoutes);
app.use('/api/', apiRoutes);

app.engine('html', require('ejs').renderFile);		
app.set('view engine', 'html');		
app.use(express.static(__dirname+ '/public'));		
app.use('/static', express.static(__dirname + '/public'));		
app.use('/api', express.static(__dirname + '/apiweb'));


var admin = require('./admin/routes/routes');		
app.use("/admin/",admin);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {

  if (err)
  {
    var status = 400;
    if (err.status)
    {
      status = err.status;
    }
    res.status(status).json({error : err.message});
  }
});


module.exports = app;
