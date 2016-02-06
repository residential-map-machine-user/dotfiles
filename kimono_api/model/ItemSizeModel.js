var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ItemSize = new Schema({
    id_item:{type:Schema.Types.ObjectId, ref:"Item"},
    id_store:{type:Schema.Types.ObjectId, ref:"Store"},
    size:{type:String, trim:true, required:true}
});
mongoose.model('ItemSize', ItemSize);
module.exports = mongoose.model('ItemSize');
