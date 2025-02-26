import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for authentication
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Starting Request:', config.url);
    return config;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  response => {
    console.log('Response:', response.status, response.data);
    return response;
  },
  error => {
    // Handle 401 Unauthorized errors - clear auth data
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized: Logging out user.');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // You could redirect to login here if needed
      // window.location.href = '/login';
    }
    
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Auth service functions
const authService = {
  login: async (credentials) => {
    try {
      console.log('Login attempt with:', { email: credentials.email });
      const response = await api.post('/login', credentials);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  signup: async (userData) => {
    try {
      console.log('Signup attempt with:', userData);
      const response = await api.post('/signup', userData);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await api.delete('/logout');
      
      // Always clear local storage on logout attempt
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return response.data;
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails on server, clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (!token) return null;

      // Return cached user if available
      if (storedUser) {
        return { user: JSON.parse(storedUser) };
      }

      // Otherwise fetch from API
      const response = await api.get('/me');
      
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    }
  }
};

export default authService;
export { api };