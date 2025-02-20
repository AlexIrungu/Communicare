// src/services/areaService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1';

const areaService = {
  getAllAreas: async () => {
    const response = await axios.get(`${API_URL}/areas`);
    return response;
  },

  getHighRiskAreas: async () => {
    const response = await axios.get(`${API_URL}/areas/high_risk`);
    return response;
  },

  getAreaById: async (id) => {
    const response = await axios.get(`${API_URL}/areas/${id}`);
    return response;
  },
};

export default areaService;