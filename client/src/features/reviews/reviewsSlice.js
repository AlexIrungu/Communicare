import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reviewService from '../../services/reviewService';

// Fetch reviews
export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (_, thunkAPI) => {
    try {
      const response = await reviewService.getReviews();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch reviews');
    }
  }
);

// Add a new review
export const addReview = createAsyncThunk(
  'reviews/addReview',
  async (reviewData, thunkAPI) => {
    try {
      const response = await reviewService.createReview(reviewData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to add review');
    }
  }
);

// Update a review
export const updateReview = createAsyncThunk(
  'reviews/updateReview',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await reviewService.updateReview(id, updatedData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to update review');
    }
  }
);

// Delete a review
export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (id, thunkAPI) => {
    try {
      await reviewService.deleteReview(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to delete review');
    }
  }
);

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(review => review.id === action.payload.id);
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(review => review.id !== action.payload);
      });
  },
});

export default reviewSlice.reducer;