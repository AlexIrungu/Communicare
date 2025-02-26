// src/services/alertsService.js
import { createAsyncThunk } from '@reduxjs/toolkit';

// Mock data for development
const mockAlerts = [
  {
    id: '1',
    title: 'COVID-19 Outbreak',
    message: 'Increased cases of COVID-19 detected in this area. Take precautions.',
    areaId: '1', // Match with one of your area IDs
    severity: 'high',
    createdAt: new Date().toISOString(),
    read: false
  },
  {
    id: '2',
    title: 'Malaria Prevention',
    message: 'Seasonal increase in mosquito activity. Use mosquito nets and repellent.',
    areaId: '2', // Match with one of your area IDs
    severity: 'medium',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    read: true
  },
  {
    id: '3',
    title: 'Vaccination Campaign',
    message: 'Free vaccination campaign starting next week at local health centers.',
    areaId: '1', // Match with one of your area IDs
    severity: 'low',
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    read: false
  }
];

// Mock API functions
export const alertsService = {
  getUserAlerts: async (userId) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Mock API: Fetching alerts for user ${userId}`);
    
    // Return mock data
    return [...mockAlerts];
  },
  
  markAlertAsRead: async (alertId) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log(`Mock API: Marking alert ${alertId} as read`);
    
    // Find and update the alert
    const alert = mockAlerts.find(a => a.id === alertId);
    if (alert) {
      alert.read = true;
      return { ...alert };
    }
    throw new Error('Alert not found');
  },
  
  subscribeToArea: async (userId, areaId) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 400));
    console.log(`Mock API: User ${userId} subscribed to area ${areaId}`);
    
    // Return a mock subscription object
    return {
      id: `sub-${Date.now()}`,
      userId,
      areaId,
      createdAt: new Date().toISOString()
    };
  }
};