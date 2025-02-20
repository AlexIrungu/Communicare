// src/services/diseaseService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1';

const diseaseService = {
  getAllDiseases: async () => {
    const response = await axios.get(`${API_URL}/diseases`);
    return response;
  },

  getFeaturedDiseases: async () => {
    const response = await axios.get(`${API_URL}/diseases/featured`);
    return response;
  },

  getDiseaseById: async (id) => {
    const response = await axios.get(`${API_URL}/diseases/${id}`);
    return response;
  },
};

export default diseaseService;