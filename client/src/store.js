// store.js
import { configureStore } from '@reduxjs/toolkit';
import diseasesReducer from './features/diseases/diseasesSlice';
import areasReducer from './features/areas/areasSlice';
import reviewsReducer from './features/reviews/reviewsSlice';
import donationsReducer from './features/donations/donationsSlice';
import adminReducer from './features/admin/adminSlice';
import authReducer from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    diseases: diseasesReducer,
    areas: areasReducer,
    reviews: reviewsReducer,
    donations: donationsReducer,
    admin: adminReducer,
    auth: authReducer,
  },
});

// diseasesSlice.js example
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import diseaseService from '../../services/diseaseService';

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
    currentDisease: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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

export default diseasesSlice.reducer;