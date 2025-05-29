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
    getAllReplies,
    createReplyNotification
  } = useContext(AdminContext);

  const [commentBeingReplied, setCommentBeingReplied] = useState(null);
  const [commentWithRepliesShown, setCommentWithRepliesShown] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [selectedReply, setSelectedReply] = useState(null);

  const [loadingData, setLoadingData] = useState(false);
  const [replyLoading, setReplyLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (aToken) {
        setLoadingData(true);
        await getComments();
        await getAllReplies();
        setLoadingData(false);
      }
    };
    fetchData();
  }, [aToken]);

  const handleReplyClick = (comment) => {
    setCommentBeingReplied(comment);
    setReplyText('');
  };

  const submitReply = async () => {
    if (commentBeingReplied && replyText.trim()) {
      setReplyLoading(true);
      const result = await replyComment(commentBeingReplied._id, replyText);
      await createReplyNotification(
        commentBeingReplied.userId,
        replyText,
        commentBeingReplied.productData.name
      );
      if (result) {
        await getAllReplies();
        setReplyText('');
        setCommentBeingReplied(null);
      }
      setReplyLoading(false);
    }
  };

  const handleEditReply = async (replyId, newText) => {
    setEditLoading(true);
    const result = await editReply(replyId, newText);
    if (result) {
      await getAllReplies();
      setSelectedReply(null);
      setReplyText('');
    }
    setEditLoading(false);
  };

  const handleDeleteReply = async (replyId) => {
    setDeleteLoading(true);
    const result = await deleteReply(replyId);
    if (result) {
      await getAllReplies();
      setSelectedReply(null);
    }
    setDeleteLoading(false);
  };

  const filteredReplies = (commentId) =>
    replies.filter((r) => r.commentId === commentId);

  return (
    <div className="w-full max-w-6xl m-4 sm:m-8">
      <p className="mb-4 text-lg font-semibold">All Comments</p>

      <div className="bg-white border rounded shadow-sm text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_3fr_1fr] py-3 px-6 border-b bg-gray-100 font-semibold">
          <p>#</p>
          <p>User</p>
          <p>Comment</p>
          <p>Actions</p>
        </div>

        {loadingData ? (
          <div className="p-6 text-center text-gray-500">Loading comments...</div>
        ) : (
          comments.map((comment, index) => (
            <div
              key={comment._id}
              className="flex flex-col sm:grid sm:grid-cols-[0.5fr_2fr_3fr_1fr] gap-2 py-3 px-4 border-b"
            >
              <p className="hidden sm:block">{index + 1}</p>

              <div className="flex items-center gap-2">
                <img
                  className="w-8 h-8 rounded-full"
                  src={comment.userData.image}
                  alt="User Avatar"
                />
                <p className="text-sm font-medium">{comment.userData.name}</p>
              </div>

              <div className="text-sm">
                <p className="hidden sm:block">{comment.text}</p>
                <p className="block sm:hidden text-gray-600">
                  <span className="font-medium">{comment.userData.name}:</span> {comment.text}
                </p>
              </div>

              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => handleReplyClick(comment)}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                >
                  Reply
                </button>
                <button
                  onClick={() =>
                    setCommentWithRepliesShown(
                      commentWithRepliesShown?._id === comment._id ? null : comment
                    )
                  }
                  className="text-sm text-gray-600"
                >
                  {commentWithRepliesShown?._id === comment._id
                    ? 'Hide Replies'
                    : 'Show Replies'}
                </button>
              </div>

              {commentBeingReplied?._id === comment._id && (
                <div className="col-span-full mt-2">
                  <textarea
                    className="w-full p-2 border rounded"
                    rows="3"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write your reply..."
                  />
                  <div className="flex justify-end mt-2 gap-2">
                    <button
                      onClick={() => setCommentBeingReplied(null)}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={submitReply}
                      disabled={replyLoading}
                      className={`px-4 py-2 ${
                        replyLoading ? 'bg-gray-400' : 'bg-green-600'
                      } text-white rounded`}
                    >
                      {replyLoading ? 'Sending...' : 'Send Reply'}
                    </button>
                  </div>
                </div>
              )}

              {commentWithRepliesShown?._id === comment._id && (
                <div className="col-span-full mt-3 space-y-3">
                  {filteredReplies(comment._id).length > 0 ? (
                    filteredReplies(comment._id).map((reply) => (
                      <div
                        key={reply._id}
                        className="border rounded p-3 bg-gray-50 text-sm"
                      >
                        <div className="flex justify-between items-center">
                          <p className="text-gray-700">
                            <span className="font-medium">Admin:</span> {reply.text}
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setSelectedReply(reply._id);
                                setReplyText(reply.text);
                              }}
                              className="text-blue-600"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteReply(reply._id)}
                              disabled={deleteLoading}
                              className="text-red-600"
                            >
                              {deleteLoading && selectedReply === reply._id ? 'Deleting...' : 'Delete'}
                            </button>
                          </div>
                        </div>

                        {selectedReply === reply._id && (
                          <div className="mt-2">
                            <textarea
                              className="w-full p-2 border rounded"
                              rows="2"
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                            />
                            <button
                              onClick={() =>
                                handleEditReply(reply._id, replyText)
                              }
                              disabled={editLoading}
                              className={`mt-2 px-4 py-2 ${
                                editLoading ? 'bg-gray-400' : 'bg-green-600'
                              } text-white rounded`}
                            >
                              {editLoading ? 'Saving...' : 'Save'}
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No replies yet.</p>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
