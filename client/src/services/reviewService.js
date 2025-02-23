// src/services/reviewService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1';

const reviewService = {
  // Get statistics
  getStatistics: async () => {
    try {
      const response = await axios.get(`${API_URL}/statistics`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get community reviews
  getCommunityReviews: async (page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${API_URL}/reviews`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get health alerts
  getHealthAlerts: async () => {
    try {
      const response = await axios.get(`${API_URL}/health-alerts`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Approve a review
  approveReview: async (reviewId) => {
    try {
      const response = await axios.patch(`${API_URL}/reviews/${reviewId}/approve`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Reject a review
  rejectReview: async (reviewId) => {
    try {
      const response = await axios.patch(`${API_URL}/reviews/${reviewId}/reject`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default reviewService;