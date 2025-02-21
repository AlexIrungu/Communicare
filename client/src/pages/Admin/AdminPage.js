// pages/Admin/AdminPage.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAdminStats } from '../../features/admin/adminSlice';
import AdminDiseasePanel from '../../components/admin/AdminDiseasePanel';
import AdminAreaPanel from '../../components/admin/AdminAreaPanel';
import AdminUserPanel from '../../components/admin/AdminUserPanel';
import AdminDonationPanel from '../../components/admin/AdminDonationPanel';

const AdminPage = () => {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector(state => state.admin);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    dispatch(loadAdminStats());
  }, [dispatch]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="admin-dashboard">
            <h2>Dashboard Overview</h2>
            
            {loading ? (
              <p>Loading statistics...</p>
            ) : (
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Users</h3>
                  <p className="stat-number">{stats.totalUsers}</p>
                </div>
                <div className="stat-card">
                  <h3>Registered Diseases</h3>
                  <p className="stat-number">{stats.totalDiseases}</p>
                </div>
                <div className="stat-card">
                  <h3>Affected Areas</h3>
                  <p className="stat-number">{stats.totalAreas}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Donations</h3>
                  <p className="stat-number">${stats.totalDonations?.toLocaleString()}</p>
                </div>
              </div>
            )}
            
            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <ul>
                {stats.recentActivity?.map((activity, index) => (
                  <li key={index}>
                    <span className="activity-time">{new Date(activity.timestamp).toLocaleString()}</span>
                    <span className="activity-type">{activity.type}</span>
                    <span className="activity-desc">{activity.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'diseases':
        return <AdminDiseasePanel />;
      case 'areas':
        return <AdminAreaPanel />;
      case 'users':
        return <AdminUserPanel />;
      case 'donations':
        return <AdminDonationPanel />;
      default:
        return <div>Select a tab to manage</div>;
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <nav className="admin-nav">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`nav-item ${activeTab === 'diseases' ? 'active' : ''}`}
            onClick={() => setActiveTab('diseases')}
          >
            Manage Diseases
          </button>
          <button 
            className={`nav-item ${activeTab === 'areas' ? 'active' : ''}`}
            onClick={() => setActiveTab('areas')}
          >
            Manage Affected Areas
          </button>
          <button 
            className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Manage Users
          </button>
          <button 
            className={`nav-item ${activeTab === 'donations' ? 'active' : ''}`}
            onClick={() => setActiveTab('donations')}
          >
            View Donations
          </button>
        </nav>
      </div>
      
      <div className="admin-content">
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default AdminPage;