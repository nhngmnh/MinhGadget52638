import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // ID người dùng (String)
  userData: {type:Object, required: true},
  productId: { type: String, required: true }, // ID sản phẩm (String)
  productData: {type: Object, required: true},
  rating: { type: Number, min: 1, max: 5, default:null }, // Đánh giá (1-5 sao)
  text: { type: String, required: true }, // Nội dung bình luận
  createdAt: { type: Date, default: Date.now }, // Ngày tạo
}, { 
  timestamps: true 
});

const commentModel = mongoose.models.comment || mongoose.model("comment", commentSchema);
export default commentModel;
