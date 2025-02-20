// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1';

const authService = {
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response;
  },

  signup: async (userData) => {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response;
  },

  logout: async () => {
    const response = await axios.delete(`${API_URL}/logout`);
    localStorage.removeItem('token');
    return response;
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await axios.get(`${API_URL}/current_user`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response;
    }
    return null;
  }
};

export default authService;