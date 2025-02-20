// src/store.js
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