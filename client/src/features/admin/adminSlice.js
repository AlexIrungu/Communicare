import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  fetchUsers, createUser, updateUser, deleteUser,
  fetchAreas, createArea, updateArea, deleteArea,
  fetchDiseases, createDisease, updateDisease, deleteDisease,
  fetchDonations, updateDonation, deleteDonation,
  fetchAdminStats
} from '../../services/adminService';

// User actions
export const loadUsers = createAsyncThunk('admin/loadUsers', async () => {
  const response = await fetchUsers();
  return response;
});

export const addUser = createAsyncThunk('admin/addUser', async (user) => {
  const response = await createUser(user);
  return response;
});

export const modifyUser = createAsyncThunk('admin/modifyUser', async (user) => {
  const response = await updateUser(user);
  return response;
});

export const removeUser = createAsyncThunk('admin/removeUser', async (userId) => {
  await deleteUser(userId);
  return userId;
});

// Area actions
export const loadAreas = createAsyncThunk('admin/loadAreas', async () => {
  const response = await fetchAreas();
  return response;
});

export const addArea = createAsyncThunk('admin/addArea', async (area) => {
  const response = await createArea(area);
  return response;
});

export const modifyArea = createAsyncThunk('admin/modifyArea', async (area) => {
  const response = await updateArea(area);
  return response;
});

export const removeArea = createAsyncThunk('admin/removeArea', async (areaId) => {
  await deleteArea(areaId);
  return areaId;
});

// Disease actions
export const loadDiseases = createAsyncThunk('admin/loadDiseases', async () => {
  const response = await fetchDiseases();
  return response;
});

export const addDisease = createAsyncThunk('admin/addDisease', async (disease) => {
  const response = await createDisease(disease);
  return response;
});

export const modifyDisease = createAsyncThunk('admin/modifyDisease', async (disease) => {
  const response = await updateDisease(disease);
  return response;
});

export const removeDisease = createAsyncThunk('admin/removeDisease', async (diseaseId) => {
  await deleteDisease(diseaseId);
  return diseaseId;
});

// Donation actions
export const loadDonations = createAsyncThunk('admin/loadDonations', async () => {
  const response = await fetchDonations();
  return response;
});

export const modifyDonation = createAsyncThunk('admin/modifyDonation', async (donation) => {
  const response = await updateDonation(donation);
  return response;
});

export const removeDonation = createAsyncThunk('admin/removeDonation', async (donationId) => {
  await deleteDonation(donationId);
  return donationId;
});

// Admin stats action
export const loadAdminStats = createAsyncThunk('admin/loadAdminStats', async () => {
  const response = await fetchAdminStats();
  return response;
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    areas: [],
    diseases: [],
    donations: [],
    stats: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // User reducers
      .addCase(loadUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(modifyUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        state.users[index] = action.payload;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      // Area reducers
      .addCase(loadAreas.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadAreas.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.areas = action.payload;
      })
      .addCase(loadAreas.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addArea.fulfilled, (state, action) => {
        state.areas.push(action.payload);
      })
      .addCase(modifyArea.fulfilled, (state, action) => {
        const index = state.areas.findIndex((area) => area.id === action.payload.id);
        state.areas[index] = action.payload;
      })
      .addCase(removeArea.fulfilled, (state, action) => {
        state.areas = state.areas.filter((area) => area.id !== action.payload);
      })
      // Disease reducers
      .addCase(loadDiseases.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadDiseases.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.diseases = action.payload;
      })
      .addCase(loadDiseases.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addDisease.fulfilled, (state, action) => {
        state.diseases.push(action.payload);
      })
      .addCase(modifyDisease.fulfilled, (state, action) => {
        const index = state.diseases.findIndex((disease) => disease.id === action.payload.id);
        state.diseases[index] = action.payload;
      })
      .addCase(removeDisease.fulfilled, (state, action) => {
        state.diseases = state.diseases.filter((disease) => disease.id !== action.payload);
      })
      // Donation reducers
      .addCase(loadDonations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadDonations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.donations = action.payload;
      })
      .addCase(loadDonations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(modifyDonation.fulfilled, (state, action) => {
        const index = state.donations.findIndex((donation) => donation.id === action.payload.id);
        state.donations[index] = action.payload;
      })
      .addCase(removeDonation.fulfilled, (state, action) => {
        state.donations = state.donations.filter((donation) => donation.id !== action.payload);
      })
      // Admin stats reducers
      .addCase(loadAdminStats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadAdminStats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stats = action.payload;
      })
      .addCase(loadAdminStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default adminSlice.reducer;