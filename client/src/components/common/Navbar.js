import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg transition-all duration-200 ${
        isActivePath(to)
          ? "bg-teal-700 text-white"
          : "text-teal-50 hover:bg-teal-700/50"
      }`}
    >
      {children}
    </Link>
  );

  return (
    <nav className="bg-gradient-to-r from-teal-600 to-teal-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <img
                src="/src/assets/logo.svg"
                alt="Logo"
                className="h-9 w-auto mr-3 transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/36x36";
                }}
              />
              <span className="font-bold text-xl text-white tracking-tight">
                Disease Prevention
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/disease-list">Diseases</NavLink>
            <NavLink to="/areas">Affected Areas</NavLink>
            <NavLink to="/map-view">Map View</NavLink>
            <NavLink to="/donate">Donate</NavLink>

            {user ? (
              <div className="flex items-center space-x-3 ml-4">
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center"
                >
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-4 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-400 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Login / Register
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-teal-50 hover:bg-teal-700/50 transition-colors focus:outline-none"
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
        <div className="md:hidden px-2 pt-2 pb-3 space-y-2 bg-teal-700/50 backdrop-blur-sm">
          <Link
            to="/disease-list"
            className="block px-4 py-2 text-white rounded-lg hover:bg-teal-700 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Diseases
          </Link>
          <Link
            to="/areas"
            className="block px-4 py-2 text-white rounded-lg hover:bg-teal-700 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Affected Areas
          </Link>
          <Link
            to="/map-view"
            className="block px-4 py-2 text-white rounded-lg hover:bg-teal-700 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Map View
          </Link>
          <Link
            to="/donate"
            className="block px-4 py-2 text-white rounded-lg hover:bg-teal-700 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Donate
          </Link>

          {user ? (
            <div className="space-y-2 pt-2 border-t border-teal-600">
              {user.isAdmin && (
                <Link
                  to="/admin"
                  className="block px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="block px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-400 transition-colors"
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