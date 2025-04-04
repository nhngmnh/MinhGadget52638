import commentModel from "../models/commentModel.js";
import replyModel from "../models/replyModel.js";
const replyComment = async(req,res)=>{
    try {
        const {commentId,text}= req.body
        if (!commentId) return res.status(400).json({success:false,message:"Can't get comment by comment id"})
        const commentData= await commentModel.findById(commentId);
        if (!commentData) return res.status(400).json({success:false,message:"Can't get comment by comment data"})
        const value= {
            commentId,
            commentData,
            text,
            createAt: Date.now()
    }
    const newReply= new replyModel(value);
    console.log(newReply);
    await newReply.save();
    return res.status(200).json({success:true,message:"Reply successfully"})
    
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