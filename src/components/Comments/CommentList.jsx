import React from 'react';

const CommentList = ({ comments }) => {
  return (
    <div className='space-y-4'>
      {comments.map(comment => (
        <div key={comment._id} className="p-4 bg-gray-100 rounded">
          <p className="text-gray-800">{comment.content}</p>
          <p className="text-sm text-gray-600 mt-2">By: {comment.author.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
