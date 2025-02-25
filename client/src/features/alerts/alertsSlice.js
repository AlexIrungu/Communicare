// src/features/alerts/alertsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch alerts for a user
export const fetchAlerts = createAsyncThunk(
  'alerts/fetchAlerts',
  async (userId, { rejectWithValue }) => {
    try {
      // Replace with your API endpoint
      const response = await axios.get(`/api/alerts/user/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Mark an alert as read
export const markAlertAsRead = createAsyncThunk(
  'alerts/markAsRead',
  async (alertId, { rejectWithValue }) => {
    try {
      // Replace with your API endpoint
      const response = await axios.patch(`/api/alerts/${alertId}`, { read: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Subscribe to alerts for a specific area
export const subscribeToAreaAlerts = createAsyncThunk(
  'alerts/subscribeToArea',
  async ({ userId, areaId }, { rejectWithValue }) => {
    try {
      // Replace with your API endpoint
      const response = await axios.post('/api/alerts/subscribe', { userId, areaId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const alertsSlice = createSlice({
  name: 'alerts',
  initialState: {
    alerts: [],
    subscriptions: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    addAlert: (state, action) => {
      state.alerts.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlerts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAlerts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.alerts = action.payload;
      })
      .addCase(fetchAlerts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch alerts';
      })
      .addCase(markAlertAsRead.fulfilled, (state, action) => {
        const index = state.alerts.findIndex(alert => alert.id === action.payload.id);
        if (index !== -1) {
          state.alerts[index].read = true;
        }
      })
      .addCase(subscribeToAreaAlerts.fulfilled, (state, action) => {
        state.subscriptions.push(action.payload);
      });
  },
});

export const { addAlert } = alertsSlice.actions;
export default alertsSlice.reducer;