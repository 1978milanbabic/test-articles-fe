import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/Auth/useAuth';
import { SocketContextProvider } from './contexts/SocketContext.jsx';
import ArticleList from './components/Articles/ArticleList.jsx';
import Article from './components/Articles/Article.jsx';
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';
import Home from './components/Home/index.jsx';
import Header from './components/Header/index.jsx';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <SocketContextProvider>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route exact path="/articles" element={<ArticleList />} />
            <Route path="/article/:id" element={<Article />} />
          </Routes>
        </SocketContextProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
