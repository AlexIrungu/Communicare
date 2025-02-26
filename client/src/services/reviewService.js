import axios from 'axios';
import authService from './authService';

const API_URL = 'http://localhost:3001/api/v1';

const reviewService = {
  // Keep existing method
  getStatistics: async () => {
    try {
      if (!authService.isLoggedIn()) {
        console.error("User not logged in!");
        throw new Error("Unauthorized: User not logged in.");
      }
      
      const token = localStorage.getItem("token");
      console.log("Token found:", token ? "Yes" : "No");
      
      const response = await axios.get(`${API_URL}/statistics`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return response.data;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      throw error;
    }
  },
  
  // Update the endpoint path for community reviews
  getCommunityReviews: async (page) => {
    try {
      if (!authService.isLoggedIn()) {
        console.error("User not logged in!");
        throw new Error("Unauthorized: User not logged in.");
      }
      
      const token = localStorage.getItem("token");
      console.log("Fetching community reviews with token:", token ? "Yes" : "No");
      
      // Change the endpoint to match your backend API structure
      // This endpoint might need adjustment based on your Rails routes
      const response = await axios.get(`${API_URL}/reviews`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, type: 'community' }
      });

      console.log("Reviews fetched:", response.data);
      return response.data;
    } catch (error) {
      console.error("API Error in getCommunityReviews:", error.response?.data || error.message);
      throw error;
    }
  },
  
  approveReview: async (reviewId) => {
    try {
      if (!authService.isLoggedIn()) {
        throw new Error("Unauthorized: User not logged in.");
      }
      
      const token = localStorage.getItem("token");
      
      // Adjust this endpoint as needed
      const response = await axios.put(`${API_URL}/reviews/${reviewId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return response.data;
    } catch (error) {
      console.error("API Error in approveReview:", error.response?.data || error.message);
      throw error;
    }
  },
  
  rejectReview: async (reviewId) => {
    try {
      if (!authService.isLoggedIn()) {
        throw new Error("Unauthorized: User not logged in.");
      }
      
      const token = localStorage.getItem("token");
      
      // Adjust this endpoint as needed
      const response = await axios.put(`${API_URL}/reviews/${reviewId}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return response.data;
    } catch (error) {
      console.error("API Error in rejectReview:", error.response?.data || error.message);
      throw error;
    }
  }
};

export default reviewService;