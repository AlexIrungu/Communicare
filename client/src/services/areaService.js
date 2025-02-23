import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/v1';

export const areaService = {
  getAllAreas: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/areas`);
      
      // ✅ Debugging to confirm correct data structure
      console.log("✅ Full API response:", response.data);

      // Ensure the returned data matches the expected format
      const formattedAreas = response.data.map(area => ({
        id: area.id,
        name: area.name,
        latitude: area.latitude ?? null,
        longitude: area.longitude ?? null,
        riskLevel: area.risk_level,  // Ensure correct naming
        diseases: area.communicable_diseases || [] // Handle missing diseases field
      }));

      return formattedAreas;
    } catch (error) {
      console.error("❌ API error in getAllAreas:", error);
      throw error;
    }
  },

  getHighRiskAreas: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/areas/high_risk`);
      
      console.log("✅ High-risk areas API response:", response.data);

      return response.data.map(area => ({
        id: area.id,
        name: area.name,
        latitude: area.latitude ?? null,
        longitude: area.longitude ?? null,
        riskLevel: area.risk_level,
        diseases: area.communicable_diseases || []
      }));
    } catch (error) {
      console.error('❌ Error fetching high-risk areas:', error);
      throw error;
    }
  }
};
