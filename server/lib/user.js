/**
 * Created by Liron on 16/04/2018
 */

var mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/local');
var userSchema= new mongoose.Schema({
    full_name:{type:String},
    email_address:{type:String},
    password:{type:String},
    is_lecturer:{type:Boolean},
    is_admin:{type:Boolean}
});
var User= mongoose.model('myuser',userSchema);
module.exports=User;
