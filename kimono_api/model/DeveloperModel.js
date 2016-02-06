var mongoose = require('mongoose');
var validate = require('./utils/validate');
var Schema = mongoose.Schema;
var Developer = new Schema({
    password:{type:String, required:true, validate:/[0-9a-zA-Z]/},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now},
    username:{type:String, required:true}
});

mongoose.model('Developer', Developer);
module.exports = mongoose.model('Developer');
