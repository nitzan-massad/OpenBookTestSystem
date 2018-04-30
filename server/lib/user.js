/**
 * Created by Liron on 16/04/2018
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema
var userSchema = new Schema({
    _id: String,
    firstName: String,
    lastName: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, required: true },
    email: String
});

// custom method to add string to end of name
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users
userSchema.methods.hashPassword = function() {
    // add some stuff to the users name
    this.password = this.password + '-will be hashed';

    return this.password;
};

userSchema.methods.login=function(){
    User.find({ username: 'Nitz', password:'password-will be hashed' }, function(err, user) {
        if (err) throw err;

        // object of the user
        console.log(user);
        return this.status;
    });

}
// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;