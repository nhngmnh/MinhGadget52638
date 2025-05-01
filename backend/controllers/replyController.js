import axios from "axios";
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
           return res.status(200).json({success:true,replies:[]})
        }
        return res.status(200).json({success:true,replies:data})
    } catch (error) {
        console.log(error);
        return res.status(404).json({success:false,message:"Error server"})
    }
}
const getReplyByComment= async(req,res)=>{
    try {
        const commentId=req.body;
        const {data}=await replyModel.find({commentId:commentId});
        return res.status(200).json({success:true,data})
    } catch (error) {
        console.log(error);
        
        return res.status(404).json({success:false,message:"Server can't get reply of this comment"})
    }
};
const getReplyByUser = async (req, res) => {
    try {
        const { userId } = req.body;

        // Tìm tất cả comment của user
        const commentData = await commentModel.find({ userId });

        // Nếu không có comment nào thì không có reply tương ứng
        if (!commentData || commentData.length === 0) {
            return res.status(204).json({ success: true, message: "No comment and reply data yet" });
        }

        // Lấy danh sách các comment._id
        const commentIds = commentData.map(comment => comment._id);

        // Tìm các reply có commentId nằm trong danh sách commentIds
        const replyData = await replyModel.find({ commentId: { $in: commentIds } });

        // Trả về danh sách reply
        return res.status(200).json({
            success: true,
            replies:replyData
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
const editReply = async (req, res) => {
    try {
        const { replyId, text } = req.body;

        if (!replyId || !text) {
            return res.status(400).json({ success: false, message: "Missing replyId or text" });
        }

        const updatedReply = await replyModel.findByIdAndUpdate(
            replyId,
            { text },
            { new: true } // trả về document mới
        );

        if (!updatedReply) {
            return res.status(404).json({ success: false, message: "Reply not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Reply updated successfully",
            data: updatedReply, // tuỳ chọn gửi lại dữ liệu
        });
    } catch (error) {
        console.error("Error updating reply:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
const removeReply = async (req, res) => {
    try {
        const { replyId } = req.body;

        if (!replyId) {
            return res.status(400).json({ success: false, message: "Missing replyId" });
        }

        const deletedReply = await replyModel.findByIdAndDelete(replyId);

        if (!deletedReply) {
            return res.status(404).json({ success: false, message: "Reply not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Reply removed successfully",
            data: deletedReply, // optional: gửi lại dữ liệu đã xóa nếu cần
        });
    } catch (error) {
        console.error("Error removing reply:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export {
    replyComment,getAllReplies,getReplyByComment,getReplyByUser,editReply,removeReply
}