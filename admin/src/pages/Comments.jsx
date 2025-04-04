import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../context/AdminContext';

const Comments = () => {
  const { aToken, comments, getComments, reply } = useContext(AdminContext);
  const [selectedComment, setSelectedComment] = useState(null);
  const [replyText, setReplyText] = useState('');
  useEffect(() => {
    if (aToken) {
      getComments();
    }
  }, [aToken]);

  const handleReplyClick = (comment) => {
    setSelectedComment(comment);
    setReplyText('');
  };

  const submitReply = () => {
    if (selectedComment && replyText.trim()) {
      replyToComment(selectedComment._id, replyText);
      setSelectedComment(null);
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
          </div>
        ))}
      </div>

      {/* Reply Modal */}
      {selectedComment && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-5 w-96">
            <h3 className="text-lg font-semibold text-gray-900">
              Reply to {selectedComment.text}:
            </h3>
            <textarea
              className="w-full mt-3 p-2 border rounded"
              rows="3"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply..."
            />
            <div className="flex justify-end mt-4">
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
        </div>
      )}
    </div>
  );
};

export default Comments;