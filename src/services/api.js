import axios from 'axios';

const baseURL = 'http://localhost:3500/api';

const api = axios.create({
  baseURL,
});

export default api;
