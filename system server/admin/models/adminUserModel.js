'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userAdminSchema = new Schema({
  userName: String,
  password: String,
  role: String,
  teams: [String]
});


exports.schema = userAdminSchema;
module.exports = mongoose.model('AdminUser', userAdminSchema); // adminUsers collection
