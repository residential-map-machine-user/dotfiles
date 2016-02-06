var mongoose = require('mongoose');
var validate = require('./utils/validate');
var Schema = mongoose.Schema;
var User = new Schema({
    password:{type:String, required:true, validate:/[0-9a-zA-Z]/},
    cd_types:{type:String, required:true, default:"00001"},
    mail:{type:String, required:true},
    fg_delete:{type:Boolean, defalut:false},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now},
    tel:{type:String, required:true},
    birthday:{type:String },
    sex:{type:String},
    address:{
      zipcode:{type:String},
      address1:{type:String},
      address2:{type:String}
    },
    name: {
      first_name:{type:String},
      last_name: {type:String}
    },
    fg_mail_auth:{type:String, default:false},
});

// User.path('password').validate(validate.validatePassword, "password length is not valid");
mongoose.model('User', User);
module.exports = mongoose.model('User');
