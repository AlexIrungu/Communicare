// src/pages/Admin/Statistics.js
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { BarChart, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, Line } from 'recharts';
import reviewService from '../../services/reviewService';
import authService from '../../services/authService';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
          setError("You must be logged in to view statistics");
          setLoading(false);
          navigate('/login');
          return;
        }
        
        // Verify token and get user information
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        console.log('Current user:', user);
        console.log('Using token:', token);
        
        // Continue with fetching statistics
        const response = await axios.get('http://localhost:3001/api/v1/statistics', {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        console.log('Statistics response:', response.data);
        setStats(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching statistics:', error);
        
        // Log detailed error information
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        }
        
        // Handle specific error cases
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setError("Authentication failed. Please log in again.");
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setError("Failed to load statistics. " + (error.response?.data?.message || error.message));
        }
        
        setLoading(false);
      }
    };
    
    fetchStats();
  }, [navigate]);

  if (loading) return <div className="p-4">Loading statistics...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!stats) return <div className="p-4">No statistics available</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Statistics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Disease Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.diseaseStats && stats.diseaseStats.length > 0 ? (
              <BarChart width={500} height={300} data={stats.diseaseStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cases" fill="#8884d8" />
              </BarChart>
            ) : (
              <div>No disease statistics available</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Donations</CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.donationStats && stats.donationStats.length > 0 ? (
              <LineChart width={500} height={300} data={stats.donationStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
              </LineChart>
            ) : (
              <div>No donation statistics available</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Statistics;