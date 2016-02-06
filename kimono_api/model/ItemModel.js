var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Item = new Schema({
    id_store:{type:Schema.Types.ObjectId, ref:"Store"},
    item_name:{type:String, required:true},
    description:{type:String, required:true},
    price:{
      retail_price:{type:String, min:0, max:10000000000},
      discount_price:{type:String, min:0, max:10000000000}
    },
    itme_status:{type:String, required:true, default:"00001"},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now},
    id_category:{type:Schema.Types.ObjectId, ref:"Category"}
});
mongoose.model('Item', Item);
module.exports = mongoose.model('Item');
