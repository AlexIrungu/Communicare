// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  withCredentials: true
});

export const getHighRiskAreas = () => {
  return api.get('/areas/high_risk')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching high risk areas:', error);
      throw error;
    });
};

export const getAllAreas = () => {
  return api.get('/areas')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching areas:', error);
      throw error;
    });
};