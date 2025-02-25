// src/components/dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDiseases } from '../../features/diseases/diseasesSlice';
import { fetchAreas } from '../../features/areas/areasSlice';
import { fetchDonations } from '../../features/donations/donationsSlice';
import { Card } from '../ui/card';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('overview');
  
  const { diseases, loading: diseasesLoading, error: diseasesError } = useSelector(state => state.diseases);
  const { areas, loading: areasLoading, error: areasError } = useSelector(state => state.areas);
  const { donations, loading: donationsLoading, error: donationsError } = useSelector(state => state.donations);
  
  const isLoading = diseasesLoading || areasLoading || donationsLoading;
  const hasError = diseasesError || areasError || donationsError;

  useEffect(() => {
    dispatch(fetchDiseases());
    dispatch(fetchAreas());
    dispatch(fetchDonations());
  }, [dispatch]);

  // Prepare data for charts
  const prepareDiseaseTrendData = () => {
    // In a real app, this would use actual time-series data
    return diseases.slice(0, 5).map(disease => ({
      name: disease.name,
      Jan: Math.floor(Math.random() * 1000),
      Feb: Math.floor(Math.random() * 1000),
      Mar: Math.floor(Math.random() * 1000),
      Apr: Math.floor(Math.random() * 1000),
      May: Math.floor(Math.random() * 1000),
      Jun: Math.floor(Math.random() * 1000),
    }));
  };

  const prepareAreaImpactData = () => {
    return areas.slice(0, 10).map(area => ({
      name: area.name,
      affectedCount: area.affectedCount || Math.floor(Math.random() * 2000),
    }));
  };

  const prepareDonationData = () => {
    const categories = [
      { name: 'Medical Supplies', value: 0 },
      { name: 'Education', value: 0 },
      { name: 'Prevention', value: 0 },
      { name: 'Research', value: 0 },
      { name: 'Treatment', value: 0 },
    ];
    
    donations.forEach(donation => {
      // Simulating category allocation - in production, this would use actual data
      const category = categories[Math.floor(Math.random() * categories.length)];
      category.value += donation.amount || Math.floor(Math.random() * 1000);
    });
    
    return categories.filter(category => category.value > 0);
  };

  // Calculate summary statistics
  const getTotalCases = () => {
    return areas.reduce((sum, area) => sum + (area.affectedCount || 0), 0);
  };

  const getTotalDonations = () => {
    return donations.reduce((sum, donation) => sum + (donation.amount || 0), 0);
  };

  const getHighPriorityAreas = () => {
    return areas.filter(area => area.priorityLevel === 'high').length;
  };

  const getMostPrevalentDisease = () => {
    if (diseases.length === 0) return 'None';
    return diseases.sort((a, b) => (b.caseCount || 0) - (a.caseCount || 0))[0].name;
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  if (isLoading) return <LoadingSpinner />;
  if (hasError) return <ErrorMessage message="Failed to load dashboard data" />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Disease Prevention Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Cases</h3>
          <p className="text-3xl font-bold text-blue-600">{getTotalCases().toLocaleString()}</p>
        </Card>
        
        <Card className="p-4 shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Donations</h3>
          <p className="text-3xl font-bold text-green-600">${getTotalDonations().toLocaleString()}</p>
        </Card>
        
        <Card className="p-4 shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">High Priority Areas</h3>
          <p className="text-3xl font-bold text-red-600">{getHighPriorityAreas()}</p>
        </Card>
        
        <Card className="p-4 shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Most Prevalent</h3>
          <p className="text-3xl font-bold text-purple-600">{getMostPrevalentDisease()}</p>
        </Card>
      </div>
      
      {/* Navigation Tabs */}
      <div className="flex border-b mb-6">
        <button 
          className={`py-2 px-4 font-medium ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`py-2 px-4 font-medium ${activeTab === 'diseases' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('diseases')}
        >
          Diseases
        </button>
        <button 
          className={`py-2 px-4 font-medium ${activeTab === 'areas' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('areas')}
        >
          Affected Areas
        </button>
        <button 
          className={`py-2 px-4 font-medium ${activeTab === 'donations' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('donations')}
        >
          Donations
        </button>
      </div>
      
      {/* Content Based on Active Tab */}
      <div className="mb-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-4 shadow-md">
              <h3 className="text-xl font-semibold mb-4">Disease Prevalence</h3>
              <div className="h-64">
                <PieChart width={400} height={250}>
                  <Pie
                    data={diseases.slice(0, 5).map((disease, index) => ({
                      name: disease.name,
                      value: disease.caseCount || Math.floor(Math.random() * 5000) + 1000
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {diseases.slice(0, 5).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
            </Card>
            
            <Card className="p-4 shadow-md">
              <h3 className="text-xl font-semibold mb-4">Donations by Category</h3>
              <div className="h-64">
                <PieChart width={400} height={250}>
                  <Pie
                    data={prepareDonationData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {prepareDonationData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
            </Card>
            
            <Card className="p-4 shadow-md lg:col-span-2">
              <h3 className="text-xl font-semibold mb-4">Top 10 Most Affected Areas</h3>
              <div className="h-80">
                <BarChart
                  width={800}
                  height={300}
                  data={prepareAreaImpactData()}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="affectedCount" fill="#8884d8" name="Affected Population" />
                </BarChart>
              </div>
            </Card>
          </div>
        )}
        
        {activeTab === 'diseases' && (
          <Card className="p-4 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Disease Trends Over Time</h3>
            <div className="h-96">
              <LineChart
                width={900}
                height={350}
                data={prepareDiseaseTrendData()}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Jan" stroke="#8884d8" />
                <Line type="monotone" dataKey="Feb" stroke="#82ca9d" />
                <Line type="monotone" dataKey="Mar" stroke="#ffc658" />
                <Line type="monotone" dataKey="Apr" stroke="#ff8042" />
                <Line type="monotone" dataKey="May" stroke="#0088fe" />
                <Line type="monotone" dataKey="Jun" stroke="#00C49F" />
              </LineChart>
            </div>
          </Card>
        )}
        
        {activeTab === 'areas' && (
          <Card className="p-4 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Affected Areas by Impact Level</h3>
            <div className="h-96">
              <BarChart
                width={900}
                height={350}
                data={prepareAreaImpactData()}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="affectedCount" fill="#8884d8" name="Affected Population" />
              </BarChart>
            </div>
          </Card>
        )}
        
        {activeTab === 'donations' && (
          <Card className="p-4 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Monthly Donation Trends</h3>
            <div className="h-96">
              <LineChart
                width={900}
                height={350}
                data={[
                  { month: 'Jan', amount: 4000 },
                  { month: 'Feb', amount: 3000 },
                  { month: 'Mar', amount: 5000 },
                  { month: 'Apr', amount: 7000 },
                  { month: 'May', amount: 6000 },
                  { month: 'Jun', amount: 8000 },
                ]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#82ca9d" name="Donation Amount ($)" />
              </LineChart>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;