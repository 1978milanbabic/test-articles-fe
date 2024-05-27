import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map(article => (
        <div key={article._id} className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-2">{article.title}</h3>
          <p className="text-gray-700">By {article.author.name}</p>
          <p className="text-gray-600 mt-2">{article.content.substring(0, 100)}...</p>
          <Link to={`/article/${article._id}`} className="text-blue-500 mt-4 block">Read More</Link>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
