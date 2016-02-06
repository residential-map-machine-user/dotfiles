var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AccessToken = new Schema({
    access_token:{type:String, required:true},
    token_type:{type:String, required:true},
    expire_in:{type:Date},
    refresh_token:{type:String}
});

mongoose.model('AccessToken', AccessToken);
module.exports = mongoose.model('AccessToken');
