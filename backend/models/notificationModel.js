import mongoose from 'mongoose';
const notificationSchema = new mongoose.Schema({
  userId: {
    type :String,
    require:true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  isRead :{
    type: Boolean,
    required:true,
    default:false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const notificationModel = mongoose.models.notification || mongoose.model('notification', notificationSchema);
export default notificationModel;
