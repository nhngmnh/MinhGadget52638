import commentModel from "../models/commentModel.js";

const createComment = async (req, res) => {
  try {
    const { userId, productId, text, rating = null } = req.body;

    // Kiểm tra xem người dùng đã bình luận sản phẩm này chưa
    const existingComment = await commentModel.findOne({ userId, productId });

    if (existingComment) {
      return res.status(400).json({ error: "You have already commented on this product. Please edit your comment instead." });
    }

    // Tạo bình luận mới với rating mặc định là null nếu không có
    const newComment = new commentModel({ userId, productId, text, rating });
    await newComment.save();

    res.status(201).json({ message: "Comment created successfully!", comment: newComment });
  } catch (error) {
    res.status(500).json({ error: "Failed to create comment!" });
  }
};
const getAllComments = async (req, res) => {
    try {
      const comments = await commentModel.find(); // Lấy tất cả bình luận từ database
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch comments!" });
    }
  };
  const getCommentsByUser = async (req, res) => {
    try {
      const { userId } = req.params; // Lấy userId từ URL
      const comments = await commentModel.find({ userId });
  
      if (!comments.length) {
        return res.status(404).json({ message: "No comments found for this user." });
      }
  
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch comments for user!" });
    }
  };
  const getCommentsByProduct = async (req, res) => {
    try {
      const { id } = req.params; // Lấy productId từ URL
      const comments = await commentModel.find({ id });
  
      if (!comments.length) {
        return res.status(404).json({ message: "No comments found for this product." });
      }
  
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch comments for product!" });
    }
  };
  
export {
    createComment,getAllComments,getCommentsByUser,getCommentsByProduct
}
