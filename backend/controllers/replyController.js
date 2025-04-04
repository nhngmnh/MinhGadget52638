import commentModel from "../models/commentModel.js";
import replyModel from "../models/replyModel.js";
const replyComment = async(req,res)=>{
    try {
        const {commentId,text}= req.body
        if (!commentId) res.status(400).json({success:false,message:"Can't get comment by comment id"})
        const commentData= await commentModel.findById(commentId);
        if (!commentData) res.status(400).json({success:false,message:"Can't get comment by comment data"})
        const value= {
            commentId,
            commentData,
            createAt: Date.now()
    }
    const newReply= new replyModel(value);
    await newReply.save();
    } catch (error) {
        console.log(error);
        return res.status(404).json({success:false,message:"Error reply"})
    }
}
const getAllReplies = async(req,res)=>{
    try {
        const data= await replyModel.find({});
        if (!data) {
            toast.warn("No comment yet");
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }
}
export {
    replyComment,getAllReplies
}