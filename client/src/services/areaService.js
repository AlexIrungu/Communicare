import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/v1';

export const areaService = {
  getAllAreas: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/areas`);
      
      console.log("✅ Raw API response:", response.data);

      const formattedAreas = response.data.map(area => ({
        id: area.id,
        name: area.name,
        // Create coordinates array for mapping
        coordinates: [
          parseFloat(area.latitude) || 0,
          parseFloat(area.longitude) || 0
        ],
        // Keep original lat/long for other uses
        latitude: parseFloat(area.latitude) || 0,
        longitude: parseFloat(area.longitude) || 0,
        riskLevel: area.risk_level,
        diseases: area.communicable_diseases || [],
        // Add marker configuration
        markerConfig: {
          color: area.risk_level === 'high' ? 'red' : 
                 area.risk_level === 'medium' ? 'yellow' : 'green',
          radius: 8,
          fillOpacity: 0.7
        }
      }));

      console.log("✅ Formatted areas:", formattedAreas);
      return formattedAreas;
    } catch (error) {
      console.error("❌ API error in getAllAreas:", error);
      throw error;
    }
  },

  getHighRiskAreas: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/areas/high_risk`);
      
      console.log("✅ Raw high-risk areas response:", response.data);

      const formattedAreas = response.data.map(area => ({
        id: area.id,
        name: area.name,
        coordinates: [
          parseFloat(area.latitude) || 0,
          parseFloat(area.longitude) || 0
        ],
        latitude: parseFloat(area.latitude) || 0,
        longitude: parseFloat(area.longitude) || 0,
        riskLevel: area.risk_level,
        diseases: area.communicable_diseases || [],
        markerConfig: {
          color: 'red',
          radius: 8,
          fillOpacity: 0.7
        }
      }));

      console.log("✅ Formatted high-risk areas:", formattedAreas);
      return formattedAreas;
    } catch (error) {
      console.error('❌ Error fetching high-risk areas:', error);
      throw error;
    }
  },

  getAreaById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/areas/${id}`);
      
      const formattedArea = {
        id: response.data.id,
        name: response.data.name,
        coordinates: [
          parseFloat(response.data.latitude) || 0,
          parseFloat(response.data.longitude) || 0
        ],
        latitude: parseFloat(response.data.latitude) || 0,
        longitude: parseFloat(response.data.longitude) || 0,
        riskLevel: response.data.risk_level,
        diseases: response.data.communicable_diseases || [],
        markerConfig: {
          color: response.data.risk_level === 'high' ? 'red' : 
                 response.data.risk_level === 'medium' ? 'yellow' : 'green',
          radius: 8,
          fillOpacity: 0.7
        }
      };

      return formattedArea;
    } catch (error) {
      console.error('❌ Error fetching area details:', error);
      throw error;
    }
  }
};