// src/services/reviewService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1';

const reviewService = {
  getStatistics: async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token

      if (!token) {
        console.error("No auth token found!");
        throw new Error("Unauthorized: No token found.");
      }

      const response = await axios.get(`${API_URL}/statistics`, {
        headers: { Authorization: `Bearer ${token}` } // Include token in headers
      });

      return response.data;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default reviewService;
