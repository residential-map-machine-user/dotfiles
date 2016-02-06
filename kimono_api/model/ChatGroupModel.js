var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//id_storeではなくid_buyerを使用したのはchatを分類するのにuser_idを使用するため
var ChatGroup = new Schema({
    createdAd:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now},
    id_seller:{type: Schema.Types.ObjectId, ref:"Store"},
    id_buyer: {type: Shcema.Types.ObjectId, ref:"Buyer"}
});
mongoose.model('ChatGroup', ChatGroup);
module.exports = mongoose.model('ChatGroup');
