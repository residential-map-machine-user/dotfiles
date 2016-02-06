var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Seller = new Schema({
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
    id_store:{type:Schema.Types.ObjectId, ref:'Store'}
});
mongoose.model('Seller', Seller);
module.exports = mongoose.model('Seller');
