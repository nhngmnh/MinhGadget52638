import mongoose, { Mongoose } from "mongoose";
const replySchema = new mongoose.Schema({
    
        commentId:{type:String, required:true},
        commentData:{type:String,required:true},
        createAt:{type:Date,default: Date.now}
})
const replyModel= mongoose.models.reply || mongoose.model('reply',replySchema);
export default replyModel;