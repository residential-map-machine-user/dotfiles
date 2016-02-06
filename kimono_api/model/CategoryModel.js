var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Category = new Schema({
    id_item:{type:Shcema.Types.ObjectId, ref:"Item"},
    category:{type:String, required:true}
});
var TargetCategory = new Schema({
    target:{type:String, required:true},
    category:Category
})
mongoose.model('Category', Category);
mongoose.model('TargetCategory', TargetCategory);

var modelSet = {};
modelSet.TargetCategory = mongoose.model('TargetCategory')
modelSet.Catgory = mongoose.model('Catgory')
module.exports = modelSet;
