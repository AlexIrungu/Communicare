import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import diseaseService from '../../services/diseaseService';

// Async thunks
export const fetchDiseases = createAsyncThunk(
  'diseases/fetchDiseases',
  async (_, { rejectWithValue }) => {
    try {
      const response = await diseaseService.getAllDiseases();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllDiseases = createAsyncThunk(
  'diseases/fetchAllDiseases',
  async (_, { rejectWithValue }) => {
    try {
      const response = await diseaseService.getAllDiseases();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFeaturedDiseases = createAsyncThunk(
  'diseases/fetchFeaturedDiseases',
  async (_, { rejectWithValue }) => {
    try {
      const response = await diseaseService.getFeaturedDiseases();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
      return rejectWithValue(error.response.data);
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
      // Handle fetchDiseases
      .addCase(fetchDiseases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiseases.fulfilled, (state, action) => {
        state.loading = false;
        state.diseases = action.payload;
      })
      .addCase(fetchDiseases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch diseases';
      })
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
        state.error = action.payload || 'Failed to fetch all diseases';
      })
      // Handle fetchFeaturedDiseases
      .addCase(fetchFeaturedDiseases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedDiseases.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredDiseases = action.payload;
      })
      .addCase(fetchFeaturedDiseases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch featured diseases';
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
        state.error = action.payload || 'Failed to fetch disease details';
      });
  },
});

export const { clearError } = diseasesSlice.actions;
export default diseasesSlice.reducer;