import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const Register = () => {
  const { register } = useAuth();
  const navigateTo = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    password: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(userData);
      navigateTo('/');
    } catch (error) {
      setError('Failed to register. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col items-center p-4">

      <form className="w-full max-w-sm mt-8" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input type="text" name="name" value={userData.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input type="password" name="password" value={userData.password} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Register</button>
        <br /><br />
        <p>Already have an account? <Link to="/login" className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
