var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ItemColor = new Schema({
    id_item:{type:Schema.Types.ObjectId, ref:"Item"},
    id_store:{type:Schema.Types.ObjectId, ref:"Store"},
    color:{type:String, trim:true, required:true}
});
mongoose.model('ItemColor', ItemColor);
module.exports = mongoose.model('ItemColor');
