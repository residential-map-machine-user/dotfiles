var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Chat = new Schema({
    message:{type:String, trim:true},
    content_type:{type:String, defalut:"text"},
    image_url:{type:String},
    id_chat_group:{type:Schema.Type.ObjectId, ref:"ChatGroup"},
    id_user:{type:Schema.Types.ObjectId, ref:"User"},
    cd_chat_status:String,
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now}
});
mongoose.model('Chat', Chat);
module.exports = mongoose.model('Chat');
