import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { areaService } from '../../services/areaService';

// Async thunks
export const fetchAllAreas = createAsyncThunk(
  'areas/fetchAllAreas',
  async (_, { rejectWithValue }) => {
    try {
      const data = await areaService.getAllAreas(); 
      console.log("API response for getAllAreas:", data); // Just log the data
      return data; // Return the data as-is
    } catch (error) {
      console.error("Error fetching areas:", error);
      return rejectWithValue(error.response?.data || 'Failed to fetch areas');
    }
  }
);
  
  
  
export const fetchHighRiskAreas = createAsyncThunk(
  'areas/fetchHighRiskAreas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await areaService.getHighRiskAreas();
      return response.data;
    } catch (error) {
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
      areas: [], // ✅ Ensure initial state is an empty array, not undefined
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllAreas.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchAllAreas.fulfilled, (state, action) => {
          console.log("Fetched areas in reducer:", action.payload); // ✅ Debugging log
          state.loading = false;
          state.areas = action.payload; // ✅ Update state correctly
        })
        .addCase(fetchAllAreas.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
 
  
  

export const { clearError } = areasSlice.actions;
export default areasSlice.reducer;