import commentModel from "../models/commentModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";
const createComment = async (req, res) => {
  try {
    const { userId, productId, text, rating = null } = req.body;

    // Kiểm tra xem người dùng đã bình luận sản phẩm này chưa
    const existingComment = await commentModel.findOne({ userId, productId });

    if (existingComment) {
      
      return res.status(400).json({ error: "You have already commented on this product. Please edit your comment instead." });
    }
    const productData= await productModel.findById(productId);
    const userData = await userModel.findById(userId).select('-password');
    if (!productData || !userData) return res.status(400).json({error:"User or Product not found"})
    // Tạo bình luận mới với rating mặc định là null nếu không có
    const newComment = new commentModel({ userId, productId, text, rating,userData, productData });
    await newComment.save();

    res.status(201).json({ message: "Comment created successfully!", comment: newComment });
  } catch (error) {
    res.status(500).json({ error: "Failed to create comment!" });
  }
};
const getAllComments = async (req, res) => {
    try {
      const comments = await commentModel.find(); // Lấy tất cả bình luận từ database
      res.status(200).json({success:true,comments:comments});
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch comments!" });
    }
  };
  const getCommentsByUser = async (req, res) => {
    try {
      const { userId } = req.body; // Lấy userId từ URL
      const comments = await commentModel.find({ userId });
  
      if (!comments.length) {
        return res.status(404).json({ message: "No comments found for this user." });
      }
  
      res.status(200).json({sucess:true,comments});
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch comments for user!" });
    }
  };
  const getCommentsByProduct = async (req, res) => {
    try {
      
      
      const { prID } = req.params; // Lấy productId từ URL
      if (!prID) res.status(404).json({error:'productId not found'});
      const comments = await commentModel.find({ productId:prID });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch comments for product!" });
    }
  };
  const updateComment = async (req, res) => {
    try {
      const { productId,userId,text } = req.body;
  
      if (!productId || !userId || !text.trim()) {
        return res.status(400).json({ message: 'Thiếu dữ liệu đầu vào' });
      }
  
      // Tìm bình luận của user cho sản phẩm này
      let comment = await commentModel.findOne({ productId, userId });
  
      if (comment) {
        // Nếu đã có bình luận, cập nhật nội dung mới
        comment.text = text;
        comment.updatedAt = new Date();
        await comment.save();
        return res.status(200).json({ message: 'Bình luận đã được cập nhật', comment });
      } else {
        // Nếu chưa có bình luận, tạo mới
        comment = new commentModel({ productId, userId, text });
        await comment.save();
        return res.status(201).json({ message: 'Bình luận đã được thêm', comment });
      }
    } catch (error) {
      console.error('Lỗi cập nhật bình luận:', error);
      res.status(500).json({ message: 'Lỗi server' });
    }
  };
  
export {
    createComment,getAllComments,getCommentsByUser,getCommentsByProduct,updateComment
}
