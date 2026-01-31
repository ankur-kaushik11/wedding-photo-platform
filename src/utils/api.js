import axios from 'axios';

// Base API URL - adjust for your backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('wedding-user');
    if (user) {
      const userData = JSON.parse(user);
      if (userData.token) {
        config.headers.Authorization = `Bearer ${userData.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API methods
export const apiService = {
  // Auth
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Upload selfie
  uploadSelfie: (formData) => api.post('/upload/selfie', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  
  // Find photos by face
  findPhotos: (userId) => api.get(`/photos/find/${userId}`),
  
  // Admin: Upload photos
  uploadPhotos: (formData) => api.post('/admin/photos', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  
  // Admin: Get stats
  getStats: () => api.get('/admin/stats'),
  
  // Admin: Get activity logs
  getLogs: () => api.get('/admin/logs'),
};

export default api;
