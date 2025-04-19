import mongoose from "mongoose";
const conversationSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    conversation: [Object],
    updatedAt: { type: Date, default: Date.now }
  });
const conversationModel=mongoose.models.conversation || mongoose.model('conversation',conversationSchema)
export default conversationModel