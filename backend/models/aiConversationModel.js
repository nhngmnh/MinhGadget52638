import mongoose from "mongoose";
const aiConversationSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    conversation: [Object],
    updatedAt: { type: Date, default: Date.now }
  });
const aiConversationModel=mongoose.models.aiConversation || mongoose.model('aiConversation',aiConversationSchema)
export default aiConversationModel