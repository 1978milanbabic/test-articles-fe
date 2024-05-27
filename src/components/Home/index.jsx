import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/useAuth';
import { jwtDecode } from 'jwt-decode';
import { useSocket } from '../../contexts/SocketContext.jsx';
import api from '../../services/api';
import ArticleList from '../Articles/ArticleList';

const Main = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState();
  const [articles, setArticles] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    if (user) {
      setUserData(jwtDecode(user));
    }
  }, [user])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get('/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('articleCreated', (newArticle) => {
        setArticles(prevArticles => [newArticle, ...prevArticles]);
      });
    }

    return () => {
      if (socket) {
        socket.off('articleCreated');
      }
    };
  }, [socket]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome{user && userData ? `, ${userData.name}` : ''}! </h1>

      {user ? (
        <div>
          <h2 className="text-2xl font-bold mt-4">Articles</h2>
          <br />
          <ArticleList articles={articles} />
        </div>
      ) : (
        <p>Please <Link to="/login" className="text-blue-500">login</Link> or <Link to="/register" className="text-blue-500">register</Link> to continue.</p>
      )}
    </div>
  );
};

export default Main;
