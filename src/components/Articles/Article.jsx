import React, { useEffect, useState, useTransition } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import CommentForm from '../Comments/CommentForm';
import CommentList from '../Comments/CommentList';
import { useSocket } from '../../contexts/SocketContext';
import { useAuth } from '../Auth/useAuth';

const Article = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isPending, startTransition] = useTransition();
  const socket = useSocket();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get(`/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Failed to fetch article:', error);
      }
    };
    const fetchComments = async () => {
      try {
        const response = await api.get(`/articles/${id}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };

    fetchArticle();
    fetchComments();
  }, [id]);

  // socket update for comments change
  useEffect(() => {
    if (!socket) return;

    socket.on('newComment', (comment) => {
      startTransition(() => {
        setComments((prevComments) => [...prevComments, comment]);
      });
    });

    return () => {
      socket.off('newComment');
    };
  }, [socket, id]);

  return (
    <div>
      {article ? (
        <div className="max-w-4xl mx-auto p-4">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <p className="text-gray-700 mb-6">By {article.author.name}</p>
          <div className="prose mb-8">
            {article.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          <CommentList comments={comments} />
          {user && <CommentForm articleId={id} />}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Article;
