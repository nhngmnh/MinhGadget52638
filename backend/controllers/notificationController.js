import notificationModel from "../models/notificationModel.js";

const createNotification = async(req,res)=>{
    try {
        const {userId,text} = req.body;
        if (!userId || !text) return res.status(400).json({success:false,message:"Can't create notification. Please try later!"})
        const data = {
            userId,
            text,
            createAt:Date.now(),
            isRead:false,
    }
        const newData = new notificationModel(data);
        await newData.save();
        return res.status(200).json({success:true,data:newData})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({success:false,message:"Server error"});
        
    }
}
const deleteNotification = async(req,res) =>{
    try {
        const {notificationId} = req.body;
        if (!notificationId) return res.status(400).json({success:false,message:"Can't find notification. Please try later!"})
        await notificationModel.findByIdAndDelete(notificationId);
        return res.status(200).json({success:true,message:"Delete notification successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Server error"});
    }
}
const getNewNotification = async (req, res) => {
    try {
      const { userId } = req.body;
  
      const notifications = await notificationModel.find({ userId })
        .sort({ createdAt: -1 }) // Mới nhất trước
        .limit(10);
  
      return res.status(200).json({success:true, data:notifications});
    } catch (error) {
      console.error('Error getting notifications:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  const markOneAsRead = async (req, res) => {
    try {
      const { notificationId } = req.body;
  
      const updated = await notificationModel.findByIdAndUpdate(
        notificationId,
        { isRead: true },
        { new: true }
      );
  
      if (!updated) {
        return res.status(404).json({ success:false, message: 'Notification not found' });
      }
  
      return res.status(200).json({ success:true,data:updated });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return res.status(500).json({ success:false,message: 'Internal server error' });
    }
  };
  const markAllAsRead = async (req, res) => {
    try {
      const { userId } = req.body;
  
      const result = await notificationModel.updateMany(
        { userId, isRead: false },
        { isRead: true }
      );
  
      return res.status(200).json({ success:true,
        message: 'All notifications marked as read',
      });
    } catch (error) {
      console.error('Error marking all as read:', error);
      return res.status(500).json({ success:false, message: 'Internal server error' });
    }
  };
export {
    createNotification, deleteNotification,getNewNotification,markOneAsRead,markAllAsRead
}