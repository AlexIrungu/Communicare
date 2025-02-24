// src/services/diseaseService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1';

const diseaseService = {
  getAllDiseases: async () => {
    try {
      const response = await axios.get(`${API_URL}/diseases`);
      console.log("✅ All diseases API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching all diseases:", error);
      throw error;
    }
  },

  getFeaturedDiseases: async () => {
    try {
      const response = await axios.get(`${API_URL}/diseases/featured`);
      console.log("✅ Featured diseases API response:", response.data);
      
      // Format the response similar to areas service
      return response.data.map(disease => ({
        id: disease.id,
        name: disease.name,
        severity: disease.severity,
        shortDescription: disease.short_description,
        // Add any other fields you need
      }));
    } catch (error) {
      console.error("❌ Error fetching featured diseases:", error);
      throw error;
    }
  },

  getDiseaseById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/diseases/${id}`);
      console.log(`✅ Disease ${id} API response:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ Error fetching disease ${id}:`, error);
      throw error;
    }
  },
};

export default diseaseService;