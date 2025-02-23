import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BarChart3, Users, Map, Activity, Heart } from 'lucide-react';

const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  
  return (
    <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white w-full">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <span className="font-bold text-xl">Admin Dashboard</span>
        </div>
        
        <nav className="flex items-center space-x-6">
          <button
            onClick={() => handleNavigation('/admin/statistics')}
            className={`flex items-center space-x-2 hover:text-blue-200 transition-colors ${
              location.pathname === '/admin/statistics' ? 'text-blue-200' : ''
            }`}
          >
            <BarChart3 size={20} />
            <span>Statistics</span>
          </button>
          
          <button
            onClick={() => handleNavigation('/admin/community-reviews')}
            className={`flex items-center space-x-2 hover:text-blue-200 transition-colors ${
              location.pathname === '/admin/community-reviews' ? 'text-blue-200' : ''
            }`}
          >
            <Users size={20} />
            <span>Community Reviews</span>
          </button>
          
          <button
            onClick={() => handleNavigation('/admin/health-alerts')}
            className={`flex items-center space-x-2 hover:text-blue-200 transition-colors ${
              location.pathname === '/admin/health-alerts' ? 'text-blue-200' : ''
            }`}
          >
            <Activity size={20} />
            <span>Health Alerts</span>
          </button>
        </nav>
      </div>
    </div>
  </div>
);
};

export default AdminNavbar;