// src/features/resources/resourcesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Set the base API URL (default to localhost if not set in environment variables)
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api/v1';

// Helper function to extract a readable error message
const extractErrorMessage = (error) => {
  if (error?.errors && Array.isArray(error.errors) && error.errors.length > 0) {
    return error.errors[0];
  }
  if (error?.message) {
    return error.message;
  }
  return 'An unknown error occurred';
};

/**
 * Fetch resources, optionally filtered by diseaseId.
 */
export const fetchResources = createAsyncThunk(
  'resources/fetchResources',
  async (diseaseId, { rejectWithValue }) => {
    try {
      const url = diseaseId ? `${BASE_URL}/resources/disease/${diseaseId}` : `${BASE_URL}/resources`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      const errorData = error.response?.data || 'Failed to fetch resources';
      // Extract a readable error message instead of passing the entire object
      const errorMessage = extractErrorMessage(errorData);
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Add a new resource.
 */
export const addResource = createAsyncThunk(
  'resources/addResource',
  async (resourceData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/resources`, resourceData);
      return response.data;
    } catch (error) {
      const errorData = error.response?.data || 'Failed to add resource';
      const errorMessage = extractErrorMessage(errorData);
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Update an existing resource.
 */
export const updateResource = createAsyncThunk(
  'resources/updateResource',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/resources/${id}`, data);
      return response.data;
    } catch (error) {
      const errorData = error.response?.data || 'Failed to update resource';
      const errorMessage = extractErrorMessage(errorData);
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Delete a resource by ID.
 */
export const deleteResource = createAsyncThunk(
  'resources/deleteResource',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/resources/${id}`);
      return id;
    } catch (error) {
      const errorData = error.response?.data || 'Failed to delete resource';
      const errorMessage = extractErrorMessage(errorData);
      return rejectWithValue(errorMessage);
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
        state.error = action.payload;
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