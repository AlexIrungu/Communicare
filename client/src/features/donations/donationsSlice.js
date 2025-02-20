import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import donationService from '../../services/donationService';

// Async thunks
export const fetchRecentDonations = createAsyncThunk(
  'donations/fetchRecentDonations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await donationService.getRecentDonations();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch recent donations');
    }
  }
);

export const createDonation = createAsyncThunk(
  'donations/createDonation',
  async (donationData, { rejectWithValue }) => {
    try {
      const response = await donationService.createDonation(donationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create donation');
    }
  }
);

const donationsSlice = createSlice({
  name: 'donations',
  initialState: {
    recentDonations: [],
    totalDonations: 0,
    loading: false,
    error: null,
    donationSuccess: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetDonationSuccess: (state) => {
      state.donationSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchRecentDonations
      .addCase(fetchRecentDonations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecentDonations.fulfilled, (state, action) => {
        state.loading = false;
        state.recentDonations = action.payload.donations;
        state.totalDonations = action.payload.total || 0;
      })
      .addCase(fetchRecentDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle createDonation
      .addCase(createDonation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.donationSuccess = false;
      })
      .addCase(createDonation.fulfilled, (state, action) => {
        state.loading = false;
        state.recentDonations.unshift(action.payload);
        state.donationSuccess = true;
      })
      .addCase(createDonation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.donationSuccess = false;
      });
  },
});

export const { clearError, resetDonationSuccess } = donationsSlice.actions;
export default donationsSlice.reducer;