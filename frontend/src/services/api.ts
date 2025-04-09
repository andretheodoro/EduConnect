import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // URL base da sua API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token, se existir
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
