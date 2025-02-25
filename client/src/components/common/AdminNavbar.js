import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import {
  BarChart3,
  Users,
  Map,
  Activity,
  Heart,
  Settings,
  LogOut,
  Menu,
  X,
  Stethoscope,
  MessageSquare,
  Bell
} from 'lucide-react';

const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate('/landing');
    } catch (error) {
      console.error('Logout failed:', error);
      navigate('/landing');
    }
  };

  const navItems = [
    { name: 'Diseases', path: '/admin/diseases', icon: Stethoscope },
    { name: 'Areas', path: '/admin/areas', icon: Map },
    { name: 'Donations', path: '/admin/donations', icon: Heart },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Statistics', path: '/admin/statistics', icon: BarChart3 },
    { name: 'Reviews', path: '/admin/community-reviews', icon: MessageSquare },
    { name: 'Health Alerts', path: '/admin/health-alerts', icon: Bell }
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-700 to-purple-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/admin" className="flex items-center group">
              <Settings className="h-7 w-7 text-white mr-2 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-bold text-xl text-white tracking-tight">
                Admin Dashboard
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-purple-800 text-white'
                    : 'text-purple-100 hover:bg-purple-600 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5 mr-1" />
                {item.name}
              </Link>
            ))}

            <div className="ml-4 flex items-center space-x-2">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Main Site
              </Link>
              
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-purple-200 hover:text-white hover:bg-purple-600 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? 'bg-purple-800 text-white'
                    : 'text-purple-100 hover:bg-purple-600 hover:text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.name}
              </Link>
            ))}
            
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 hover:bg-blue-700 transition-colors text-white mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Main Site
            </Link>
            
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center px-3 py-2 rounded-md text-base font-medium bg-red-600 hover:bg-red-700 transition-colors text-white mt-2"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;