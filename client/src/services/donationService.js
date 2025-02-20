// src/services/donationService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1';

const donationService = {
  getRecentDonations: async () => {
    const response = await axios.get(`${API_URL}/donations/recent`);
    return response;
  },

  createDonation: async (donationData) => {
    const response = await axios.post(`${API_URL}/donations`, donationData);
    return response;
  },

  // Additional methods as needed
  getDonationsByArea: async (areaId) => {
    const response = await axios.get(`${API_URL}/areas/${areaId}/donations`);
    return response;
  },
};

export default donationService;