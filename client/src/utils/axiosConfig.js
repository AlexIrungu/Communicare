// utils/axiosConfig.js
import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = 'http://your-backend-url/api'; // Update with your API URL

// Request interceptor for API calls
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized errors (token expired)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Here you could implement token refresh logic if your backend supports it
      // For now, just logging out the user
      localStorage.removeItem('token');
      window.location.href = '/landing'; // Redirect to login page
    }
    
    return Promise.reject(error);
  }
);

export default axios;