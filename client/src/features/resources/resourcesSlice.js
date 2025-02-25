// src/features/resources/resourcesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchResources = createAsyncThunk(
  'resources/fetchResources',
  async (diseaseId, { rejectWithValue }) => {
    try {
      // If diseaseId is provided, fetch resources for that disease
      // Otherwise, fetch all resources
      const url = diseaseId ? `/api/resources/disease/${diseaseId}` : '/api/resources';
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addResource = createAsyncThunk(
  'resources/addResource',
  async (resourceData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/resources', resourceData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateResource = createAsyncThunk(
  'resources/updateResource',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/resources/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteResource = createAsyncThunk(
  'resources/deleteResource',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/resources/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const resourcesSlice = createSlice({
  name: 'resources',
  initialState: {
    resources: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResources.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchResources.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.resources = action.payload;
      })
      .addCase(fetchResources.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch resources';
      })
      .addCase(addResource.fulfilled, (state, action) => {
        state.resources.push(action.payload);
      })
      .addCase(updateResource.fulfilled, (state, action) => {
        const index = state.resources.findIndex(resource => resource.id === action.payload.id);
        if (index !== -1) {
          state.resources[index] = action.payload;
        }
      })
      .addCase(deleteResource.fulfilled, (state, action) => {
        state.resources = state.resources.filter(resource => resource.id !== action.payload);
      });
  },
});

export default resourcesSlice.reducer;