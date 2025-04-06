import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../context/AdminContext';

const Comments = () => {
  const {
    aToken,
    comments,
    replies,
    getComments,
    replyComment,
    editReply,
    deleteReply,
  } = useContext(AdminContext);

  const [selectedComment, setSelectedComment] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [selectedReply, setSelectedReply] = useState(null);

  useEffect(() => {
    if (aToken) {
      getComments();
    }
  }, [aToken, getComments]);

  const handleReplyClick = (comment) => {
    setSelectedComment(comment);
    setReplyText('');
  };

  const submitReply = async () => {
    if (selectedComment && replyText.trim()) {
      const result = await replyComment(selectedComment._id, replyText);
      if (result) {
        setReplyText('');
        setSelectedComment(null);
      }
    }
  };

  const handleEditReply = async (replyId, newText) => {
    const result = await editReply(replyId, newText);
    if (result) {
      setSelectedReply(null);
    }
  };

  const handleDeleteReply = async (replyId) => {
    const result = await deleteReply(replyId);
    if (result) {
      setSelectedReply(null);
    }
  };

  const filteredReplies = (commentId) =>
    replies.filter((r) => r.commentId === commentId);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Comments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* Header Row */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_3fr_1fr] py-3 px-6 border-b">
          <p>#</p>
          <p>User</p>
          <p>Comment</p>
          <p>Actions</p>
        </div>

        {/* Comment Rows */}
        {comments.map((comment, index) => (
          <div
            key={comment._id}
            className="flex flex-col sm:grid sm:grid-cols-[0.5fr_2fr_3fr_1fr] gap-2 items-start text-gray-800 py-3 px-6 border hover:bg-primary"
          >
            {/* Index */}
            <p className="hidden sm:block">{index + 1}</p>

            {/* User Info */}
            <div className="flex items-center gap-2">
              <img
                className="w-8 h-8 rounded-full"
                src={comment.userData.image}
                alt="User Avatar"
              />
              <p>{comment.userData.name}</p>
            </div>

            {/* Comment Text */}
            <p className="w-full">{comment.text}</p>

            {/* Actions */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleReplyClick(comment)}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
              >
                Reply
              </button>
              <button
                onClick={() =>
                  setSelectedComment(
                    selectedComment?._id === comment._id ? null : comment
                  )
                }
                className="text-sm text-gray-600"
              >
                {selectedComment?._id === comment._id
                  ? 'Hide Replies'
                  : 'Show Replies'}
              </button>
            </div>

            {/* Replies Section */}
            {selectedComment?._id === comment._id && (
              <div className="col-span-full ml-4 mt-2 w-full">
                {filteredReplies(comment._id).length > 0 ? (
                  filteredReplies(comment._id).map((reply) => (
                    <div
                      key={reply._id}
                      className="flex flex-col gap-2 mb-3 border rounded p-2 bg-gray-50"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          className="w-6 h-6 rounded-full"
                          src={reply.text}
                          alt="Reply User Avatar"
                        />
                        <p className="text-gray-700">{reply.text}</p>
                      </div>

                      {/* Edit/Delete buttons */}
                      <div className="flex gap-2 text-sm">
                        <button
                          onClick={() => setSelectedReply(reply._id)}
                          className="text-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteReply(reply._id)}
                          className="text-red-600"
                        >
                          Delete
                        </button>
                      </div>

                      {/* Edit Reply Input */}
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
                  ))
                ) : (
                  <p className="text-gray-500">No replies yet.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Reply Input */}
      {selectedComment && (
        <div className="ml-6 mt-3 w-full max-w-4xl">
          <textarea
            className="w-full p-2 border rounded"
            rows="3"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
          />
          <div className="flex justify-end mt-2 gap-2">
            <button
              onClick={() => setSelectedComment(null)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
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
