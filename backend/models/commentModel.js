import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // ID người dùng (String)
  productId: { type: String, required: true }, // ID sản phẩm (String)
  rating: { type: Number, min: 1, max: 5, default:null }, // Đánh giá (1-5 sao)
  text: { type: String, required: true }, // Nội dung bình luận
  createdAt: { type: Date, default: Date.now }, // Ngày tạo
}, { 
  timestamps: true 
});

// Đảm bảo một user chỉ có 1 đánh giá cho 1 sản phẩm
commentSchema.index({ userId: 1, productId: 1 }, { unique: true });

const commentModel = mongoose.model.comment || mongoose.model("comment", commentSchema);
export default commentModel;
