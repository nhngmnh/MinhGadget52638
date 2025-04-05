import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

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

  if (loading) return <p className="text-center">Loading comments...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Your Comments</h2>

      <div className="space-y-6">
        {comments.map((comment) => {
          const commentReplies = replies.filter(r => r.commentId === comment._id);

          return (
            <div key={comment._id} className="border p-4 rounded shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={comment.userData.image}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="font-medium">{comment.userData.name}</p>
              </div>
              <p className="mb-2">{comment.text}</p>

              {commentReplies.length > 0 && (
                <div className="mt-3 pl-4 border-l-2 border-gray-300 space-y-1">
                  {commentReplies.map((reply) => (
                    <div key={reply._id} className="text-sm text-gray-700">
                      • {reply.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyComments;
