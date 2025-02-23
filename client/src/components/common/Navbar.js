import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import {
  Activity,
  Map,
  Heart,
  Users,
  ChevronDown,
  Stethoscope,
  MapPin,
  Star,
  Settings,
  LogOut,
  LineChart,
  Bell,
  ClipboardList
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Add this
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    window.location.reload();
  };
  
  
  
  const requestLogoutCode = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/request_logout_code", {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
  
      const data = await response.json();
      if (response.ok) {
        const code = prompt(`Enter the logout code sent to your email: ${data.logout_code}`);
        handleLogout(code);
      } else {
        console.error("Error requesting logout code:", data.error);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  
  
  
  

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  // Navigation Groups
  const diseaseNavItems = [
    { path: "/diseases", label: "Disease Directory", icon: Stethoscope },
    { path: "/areas", label: "Affected Areas", icon: MapPin },
    { path: "/map", label: "Impact Map", icon: Map },
  ];

  const insightNavItems = [
    { path: "/statistics", label: "Statistics", icon: LineChart },
    { path: "/community-reviews", label: "Community Reviews", icon: Star },
    { path: "/health-alerts", label: "Health Alerts", icon: Bell },
  ];

  const NavLink = ({ to, children, icon: Icon }) => (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
        isActivePath(to)
          ? "bg-blue-600 text-white shadow-md"
          : "text-gray-100 hover:bg-blue-500/50"
      }`}
      onClick={closeDropdowns}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {children}
    </Link>
  );

  const DropdownButton = ({ label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-blue-600 text-white"
          : "text-gray-100 hover:bg-blue-500/50"
      }`}
    >
      <Icon className="w-5 h-5 mr-2" />
      {label}
      <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${
        isActive ? "rotate-180" : ""
      }`} />
    </button>
  );

  const DropdownMenu = ({ items }) => (
    <div className="absolute top-full mt-1 w-56 bg-white rounded-lg shadow-lg py-2 z-50">
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 transition-colors"
          onClick={closeDropdowns}
        >
          <item.icon className="w-5 h-5 mr-2 text-blue-600" />
          {item.label}
        </Link>
      ))}
    </div>
  );

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group" onClick={closeDropdowns}>
              <Activity className="h-8 w-8 text-white mr-2 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-bold text-xl text-white tracking-tight">
                Communicare
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Diseases & Areas Dropdown */}
            <div className="relative">
              <DropdownButton
                label="Disease Info"
                icon={Stethoscope}
                isActive={activeDropdown === 'diseases'}
                onClick={() => toggleDropdown('diseases')}
              />
              {activeDropdown === 'diseases' && (
                <DropdownMenu items={diseaseNavItems} />
              )}
            </div>

            {/* Insights Dropdown */}
            <div className="relative">
              <DropdownButton
                label="Insights"
                icon={LineChart}
                isActive={activeDropdown === 'insights'}
                onClick={() => toggleDropdown('insights')}
              />
              {activeDropdown === 'insights' && (
                <DropdownMenu items={insightNavItems} />
              )}
            </div>

            {/* Donate Button */}
            <NavLink to="/donate" icon={Heart}>Support Us</NavLink>

            {/* User Section */}
            {user ? (
              <div className="flex items-center space-x-3 ml-4">
                <span className="text-white font-medium">
                  Welcome, {user.name}
                </span>
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                    onClick={closeDropdowns}
                  >
                    <Settings className="w-5 h-5 mr-2" />
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    closeDropdowns();
                  }}
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
              to="/landing"
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={closeDropdowns}
            >
              Login / Register
            </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                closeDropdowns();
              }}
              className="p-2 rounded-lg text-gray-100 hover:bg-blue-500/50 transition-colors focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-2 bg-blue-700/50 backdrop-blur-sm">
          {user && (
            <div className="px-4 py-2 text-white font-medium border-b border-blue-600 mb-2">
              Welcome, {user.name}
            </div>
          )}
          
          <div className="space-y-1">
            <div className="px-3 py-2 text-sm font-medium text-white">Disease Info</div>
            {diseaseNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-2" />
                {item.label}
              </Link>
            ))}
          </div>

          <div className="space-y-1 pt-2 border-t border-blue-600">
            <div className="px-3 py-2 text-sm font-medium text-white">Insights</div>
            {insightNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-2" />
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            to="/donate"
            className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <Heart className="w-5 h-5 mr-2" />
            Support Us
          </Link>

          {user ? (
            <div className="space-y-2 pt-2 border-t border-blue-600">
              {user.isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="w-5 h-5 mr-2" />
                  Admin Panel
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Login / Register
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;