var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Favorite = new Schema({
    id_store:{type:Schema.Types.ObjectId, ref:"Store"},
    id_item:{type:Schema.Types.ObjectId, ref:"Item"},
    id_buyer:{type:Schema.Types.ObjectId, ref:"Buyer"},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now},
    review:{
      rating:{type:Number, min:1, max:5},
      description:{type:String}
    }
});
mongoose.model('Favorite', Favorite);
module.exports = mongoose.model('Favorite');
