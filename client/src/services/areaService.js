// src/services/areaService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/v1';

export const areaService = {
  getHighRiskAreas: async () => {
    try {
        const response = await axios.get("http://localhost:3001/api/v1/areas");
        return response.data;
      } catch (error) {
        console.error('Error fetching high risk areas:', error);
        throw error;
      }
  },

  getAllAreas: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/areas`);
      console.log("API response for getAllAreas:", response.data); // ✅ Debugging log
      return response.data; // ✅ Only return the actual data
    } catch (error) {
      console.error("API error in getAllAreas:", error);
      throw error;
    }
  }
  
  
  
};