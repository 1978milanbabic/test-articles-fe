import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await api.post('/users/login', credentials);
      setUser(response.data.token);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/users/signup', userData);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  // check if already logged in (local storage)
  useEffect(() => {
    let localUser = localStorage.getItem('token');
    if (localUser) setUser(localUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
