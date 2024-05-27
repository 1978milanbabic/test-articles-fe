import axios from 'axios';

const authReq = axios.create({
  baseURL: 'http://localhost:3500/api',
});

authReq.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authReq;
