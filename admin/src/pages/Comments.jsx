import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../context/AdminContext';

const Comments = () => {
  const { aToken, comments, getComments, replyComment, editReply, deleteReply } = useContext(AdminContext);
  const [selectedComment, setSelectedComment] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [selectedReply, setSelectedReply] = useState(null); // Để quản lý reply được chọn cho edit/delete

  useEffect(() => {
    const fetchComments = async () => {
      if (aToken) {
        await getComments();
      }
    };
    fetchComments();
  }, [aToken, getComments]);

  const handleReplyClick = (comment) => {
    setSelectedComment(comment);
    setReplyText('');
  };

  const submitReply = async () => {
    if (selectedComment && replyText.trim()) {
      try {
        const result = await replyComment(selectedComment._id, replyText);
        if (result) {
          setReplyText('');
          setSelectedComment(null); // Đóng modal khi thành công
        }
      } catch (error) {
        console.error("Failed to reply:", error);
      }
    }
  };

  const handleEditReply = async (replyId, newText) => {
    try {
      const result = await editReply(replyId, newText);
      if (result) {
        setSelectedReply(null); // Đóng khi edit thành công
      }
    } catch (error) {
      console.error("Failed to edit reply:", error);
    }
  };

  const handleDeleteReply = async (replyId) => {
    try {
      const result = await deleteReply(replyId);
      if (result) {
        setSelectedReply(null); // Đóng sau khi xóa thành công
      }
    } catch (error) {
      console.error("Failed to delete reply:", error);
    }
  };

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Comments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        
        {/* Column Titles */}
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_3fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>User</p>
          <p>Comment</p>
          <p>Actions</p>
        </div>

        {/* Comments List */}
        {comments.map((comment, index) => (
          <div key={comment._id} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_3fr_1fr] items-center text-gray-800 py-3 px-6 border hover:bg-primary'>
            <p className='max-sm:hidden'>{index + 1}</p>
            
            {/* User Info */}
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full' src={comment.userData.image} alt="User Avatar" />
              <p>{comment.userData.name}</p>
            </div>
            
            {/* Comment Content */}
            <p className='truncate'>{comment.text}</p>
            
            {/* Reply Button */}
            <button
              onClick={() => handleReplyClick(comment)}
              className='px-3 py-1 bg-blue-600 text-white rounded text-sm'
            >
              Reply
            </button>

            {/* Toggle Replies */}
            <button
              onClick={() => setSelectedComment(selectedComment?._id === comment._id ? null : comment)}
              className='ml-3 text-sm text-gray-600'
            >
              {selectedComment?._id === comment._id ? "Hide Replies" : "Show Replies"}
            </button>
            
            {/* Display Replies */}
            {selectedComment?._id === comment._id && comment.replies && (
              <div className="ml-6 mt-2">
                {comment.replies.length > 0 ? (
                  <div>
                    {comment.replies.map((reply, idx) => (
                      <div key={idx} className="flex flex-col items-start gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <img className="w-6 h-6 rounded-full" src={reply.userData.image} alt="Reply User Avatar" />
                          <p className="text-gray-700">{reply.text}</p>
                        </div>

                        {/* Edit and Delete buttons for each reply */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedReply(reply._id)} // Set the reply to edit
                            className="text-sm text-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteReply(reply._id)}
                            className="text-sm text-red-600"
                          >
                            Delete
                          </button>
                        </div>

                        {/* Edit reply form */}
                        {selectedReply === reply._id && (
                          <div className="mt-2 w-full">
                            <textarea
                              className="w-full p-2 border rounded"
                              rows="2"
                              defaultValue={reply.text}
                              onChange={(e) => setReplyText(e.target.value)}
                            />
                            <button
                              onClick={() => handleEditReply(reply._id, replyText)}
                              className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
                            >
                              Save
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No replies yet.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Reply Input for creating a new reply */}
      {selectedComment && (
        <div className="ml-6 mt-3">
          <textarea
            className="w-full p-2 border rounded"
            rows="3"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={() => setSelectedComment(null)}
              className="px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded"
            >
              Cancel
            </button>
            <button
              onClick={submitReply}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Send Reply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
