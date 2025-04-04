// areasSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { areaService } from '../../services/areaService';

export const fetchAllAreas = createAsyncThunk(
  'areas/fetchAllAreas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await areaService.getAllAreas();
      console.log('All areas API response:', response);
      return response; // response is already an array of areas
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch areas');
    }
  }
);


// areasSlice.js
export const fetchHighRiskAreas = createAsyncThunk(
  'areas/fetchHighRiskAreas',
  async (_, { rejectWithValue }) => {
    try {
      const highRiskAreas = await areaService.getHighRiskAreas();
      console.log('High risk areas response:', highRiskAreas); // Already formatted in service
      return highRiskAreas; // Service already formats the data
    } catch (error) {
      console.error('Error fetching high risk areas:', error);
      return rejectWithValue(error.response?.data || 'Failed to fetch high risk areas');
    }
  }
);

export const fetchAreaById = createAsyncThunk(
  'areas/fetchAreaById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await areaService.getAreaById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch area details');
    }
  }
);

const areasSlice = createSlice({
  name: 'areas',
  initialState: {
    areas: [],
    highRiskAreas: [],
    currentArea: null,
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
      // Handle fetchAllAreas
      .addCase(fetchAllAreas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAreas.fulfilled, (state, action) => {
        state.loading = false;
        state.areas = action.payload;
      })
      .addCase(fetchAllAreas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetchHighRiskAreas
      .addCase(fetchHighRiskAreas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHighRiskAreas.fulfilled, (state, action) => {
        state.loading = false;
        state.highRiskAreas = action.payload;
        console.log('High risk areas updated in store:', action.payload);
      })
      .addCase(fetchHighRiskAreas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetchAreaById
      .addCase(fetchAreaById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAreaById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentArea = action.payload;
      })
      .addCase(fetchAreaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = areasSlice.actions;
export default areasSlice.reducer;