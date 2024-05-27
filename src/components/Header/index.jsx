import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/useAuth';

const Header = () => {
  const { user, logout } = useAuth();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    logout();
    navigateTo('/');
  }

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold hover:text-gray-300 transition-colors">
        Home
      </Link>
      {user && (
        <button
          onClick={handleLogout}
          className="bg-red-500 py-2 px-4 rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
