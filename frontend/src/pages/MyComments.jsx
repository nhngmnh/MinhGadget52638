import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { MessageCircleReply } from 'lucide-react';

const MyComments = () => {
  const { token, comments, replies, getComments, getRepliesByUser } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (token) {
        setLoading(true);
        await getComments();
        await getRepliesByUser();
        setLoading(false);
      }
    })();
  }, [token]);

  if (loading) return <p className="text-center text-gray-600 text-lg mt-10">Loading comments...</p>;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">🗨️ Your Comments</h2>

      {comments.length === 0 ? (
        <p className="text-center text-gray-500">You haven't made any comments yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {comments.map((comment) => {
            const commentReplies = replies.filter(r => r.commentId === comment._id);

            return (
              <div
                key={comment._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={comment.userData.image}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                  />
                  <div>
                    <p className="text-sm text-gray-500">You commented on</p>
                    <p className="text-sm font-medium text-gray-700">{comment.productData.name}</p>
                  </div>
                </div>

                <p className="text-gray-800 mb-4 italic">"{comment.text}"</p>

                {commentReplies.length > 0 && (
                  <div className="mt-4 border-t pt-3 border-gray-200 space-y-2">
                    <p className="text-sm font-semibold text-gray-600 flex items-center gap-1">
                      <MessageCircleReply className="w-4 h-4" />
                      Replies from admin:
                    </p>
                    {commentReplies.map((reply) => (
                      <div
                        key={reply._id}
                        className="text-sm text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-200"
                      >
                        • {reply.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyComments;
