import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1';

// Add request interceptor for logging
axios.interceptors.request.use(request => {
  console.log('Starting Request:', request.url);
  return request;
});

// Add response interceptor for logging
axios.interceptors.response.use(
  response => {
    console.log('Response:', response.status, response.data);
    return response;
  },
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

const authService = {
  login: async (credentials) => {
    try {
      console.log('Login attempt with:', { email: credentials.email, role: credentials.role });
      const response = await axios.post(`${API_URL}/login`, credentials);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        // Store user data in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  signup: async (userData) => {
    try {
      console.log('Signup attempt with:', userData);
      const response = await axios.post(`${API_URL}/signup`, userData);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${API_URL}/logout`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return response;
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local storage even if API call fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (!token) {
        return null;
      }

      // First try to get user from localStorage
      if (storedUser) {
        return { data: { user: JSON.parse(storedUser) } };
      }

      // If not in localStorage, fetch from API
      const response = await axios.get(`${API_URL}/current_user`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update localStorage with fresh user data
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response;
    } catch (error) {
      console.error('Get current user error:', error);
      // Clear storage if token is invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    }
  }
};

export default authService;