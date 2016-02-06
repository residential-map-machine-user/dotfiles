var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Store = new Schema({
    id_seller:{type:Schema.Types.ObjectId, ref:"Store"},
    store_name:{type:String, ref:"Item"},
    description:{type:String, ref:"Buyer"},
    fg_delete:{type:Boolean, default:false},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now},
    address:{
      zipcode:{type:String},
      address1:{type:String},
      address2:{type:String},
    },
    ssm_id:{type:String},
    business_number:{type:String},
    store_pics_url:[{type:String}]
});
mongoose.model('Store', Store);
module.exports = mongoose.model('Store');
