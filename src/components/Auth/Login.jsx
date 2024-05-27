import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const Login = () => {
  const { login } = useAuth();
  const navigateTo = useNavigate();
  const [credentials, setCredentials] = useState({
    name: '',
    password: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      navigateTo('/');
    } catch (error) {
      setError('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input type="text" name="name" value={credentials.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Login</button>
        <br /><br />
        <p>Don't have an account? <Link className='font-medium text-blue-600 dark:text-blue-500 hover:underline' to="/register">Create account</Link></p>
      </form>
    </div>
  );
};

export default Login;
