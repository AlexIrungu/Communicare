import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import diseaseService from '../../services/diseaseService';

export const fetchAllDiseases = createAsyncThunk(
  'diseases/fetchAllDiseases',
  async (_, { rejectWithValue }) => {
    try {
      const response = await diseaseService.getAllDiseases();
      console.log('All diseases API response:', response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch diseases');
    }
  }
);

export const fetchFeaturedDiseases = createAsyncThunk(
  'diseases/fetchFeaturedDiseases',
  async (_, { rejectWithValue }) => {
    try {
      const response = await diseaseService.getFeaturedDiseases();
      console.log('Featured diseases response:', response.data);
      return response.data; // Axios puts the response body in .data
    } catch (error) {
      console.error('Error fetching featured diseases:', error);
      return rejectWithValue(error.response?.data || 'Failed to fetch featured diseases');
    }
  }
);

export const fetchDiseaseById = createAsyncThunk(
  'diseases/fetchDiseaseById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await diseaseService.getDiseaseById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch disease details');
    }
  }
);

const diseasesSlice = createSlice({
  name: 'diseases',
  initialState: {
    diseases: [],
    featuredDiseases: [],
    currentDisease: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchAllDiseases
      .addCase(fetchAllDiseases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDiseases.fulfilled, (state, action) => {
        state.loading = false;
        state.diseases = action.payload;
      })
      .addCase(fetchAllDiseases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetchFeaturedDiseases
      .addCase(fetchFeaturedDiseases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedDiseases.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredDiseases = action.payload;
        console.log('Featured diseases updated in store:', action.payload);
      })
      .addCase(fetchFeaturedDiseases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetchDiseaseById
      .addCase(fetchDiseaseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiseaseById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDisease = action.payload;
      })
      .addCase(fetchDiseaseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = diseasesSlice.actions;
export default diseasesSlice.reducer;