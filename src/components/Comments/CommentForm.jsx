import React, { useState } from 'react';
import { useAuth } from '../Auth/useAuth';
import authReq from '../../services/authReq'

const CommentForm = ({ articleId }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await authReq.post('/comments', { content, articleId });
      setContent('');
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 border rounded mb-2"
        rows="4"
        placeholder="Add a comment"
        required
      ></textarea>
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Post Comment</button>
    </form>
  );
};

export default CommentForm;
