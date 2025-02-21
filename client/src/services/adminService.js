const API_URL = '/api/admin';

// Helper function for API requests
const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};

// User API calls
export const fetchUsers = () => fetchData(`${API_URL}/users`);
export const createUser = (user) => fetchData(`${API_URL}/users`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(user),
});
export const updateUser = (user) => fetchData(`${API_URL}/users/${user.id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(user),
});
export const deleteUser = (userId) => fetchData(`${API_URL}/users/${userId}`, { method: 'DELETE' });

// Area API calls
export const fetchAreas = () => fetchData(`${API_URL}/areas`);
export const createArea = (area) => fetchData(`${API_URL}/areas`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(area),
});
export const updateArea = (area) => fetchData(`${API_URL}/areas/${area.id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(area),
});
export const deleteArea = (areaId) => fetchData(`${API_URL}/areas/${areaId}`, { method: 'DELETE' });

// Disease API calls
export const fetchDiseases = () => fetchData(`${API_URL}/diseases`);
export const createDisease = (disease) => fetchData(`${API_URL}/diseases`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(disease),
});
export const updateDisease = (disease) => fetchData(`${API_URL}/diseases/${disease.id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(disease),
});
export const deleteDisease = (diseaseId) => fetchData(`${API_URL}/diseases/${diseaseId}`, { method: 'DELETE' });

// Donation API calls
export const fetchDonations = () => fetchData(`${API_URL}/donations`);
export const updateDonation = (donation) => fetchData(`${API_URL}/donations/${donation.id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(donation),
});
export const deleteDonation = (donationId) => fetchData(`${API_URL}/donations/${donationId}`, { method: 'DELETE' });

// Admin stats API call
export const fetchAdminStats = () => fetchData(`${API_URL}/stats`);
