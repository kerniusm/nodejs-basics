var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');

//kaip atrodys musu user lentele duombazeje
var UserSchema = new Schema({
    username: String, //email
    password: String,
    name: String, //vartotojo vardas
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);