import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../context/AdminContext';

const Comments = () => {
  const { aToken, comments, getComments, removeComment } = useContext(AdminContext);
  const [changeComment, setChangeComment] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      if (aToken) {
        try {
          await getComments();
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      }
    };
    fetchComments();
  }, [aToken, changeComment]);

  const handleDeleteClick = (comment) => {
    setSelectedComment(comment);
  };

  const confirmDelete = () => {
    if (selectedComment) {
      removeComment(selectedComment._id);
      setChangeComment(prev => !prev);
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
            
            {/* Delete Comment */}
            <img
              onClick={() => handleDeleteClick(comment)}
              className='w-10 cursor-pointer'
              src='' // Add trash icon here
              alt="Remove Comment"
            />
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {selectedComment && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-5 w-96">
            <h3 className="text-lg font-semibold text-gray-900">
              Delete comment from {selectedComment.user.name}?
            </h3>
            <p className="text-gray-700 mt-2">
              Are you sure you want to delete this comment?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedComment(null)}
                className="px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
