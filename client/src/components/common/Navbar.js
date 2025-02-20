import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Get user from Redux

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-teal-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/src/assets/logo.svg" 
                alt="Logo" 
                className="h-8 w-auto mr-2"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/32'; }}
              />
              <span className="font-semibold text-lg">Disease Prevention</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/disease-list" className="px-3 py-2 rounded-md hover:bg-teal-700 transition">Diseases</Link>
            <Link to="/area-list" className="px-3 py-2 rounded-md hover:bg-teal-700 transition">Affected Areas</Link>
            <Link to="/map-view" className="px-3 py-2 rounded-md hover:bg-teal-700 transition">Map View</Link>
            <Link to="/donate" className="px-3 py-2 rounded-md hover:bg-teal-700 transition">Donate</Link>

            {user ? (
              <div className="flex items-center space-x-3">
                {user.isAdmin && (
                  <Link to="/admin" className="px-3 py-2 bg-orange-500 rounded-md hover:bg-orange-600 transition">Admin Panel</Link>
                )}
                <button onClick={handleLogout} className="px-3 py-2 bg-red-500 rounded-md hover:bg-red-600 transition">Logout</button>
              </div>
            ) : (
              <Link to="/login" className="px-3 py-2 bg-teal-500 rounded-md hover:bg-teal-400 transition">Login / Register</Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-md hover:bg-teal-700 focus:outline-none">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/disease-list" className="block px-3 py-2 rounded-md hover:bg-teal-700 transition" onClick={() => setIsMenuOpen(false)}>Diseases</Link>
          <Link to="/area-list" className="block px-3 py-2 rounded-md hover:bg-teal-700 transition" onClick={() => setIsMenuOpen(false)}>Affected Areas</Link>
          <Link to="/map-view" className="block px-3 py-2 rounded-md hover:bg-teal-700 transition" onClick={() => setIsMenuOpen(false)}>Map View</Link>
          <Link to="/donate" className="block px-3 py-2 rounded-md hover:bg-teal-700 transition" onClick={() => setIsMenuOpen(false)}>Donate</Link>

          {user ? (
            <div className="space-y-2">
              {user.isAdmin && (
                <Link to="/admin" className="block px-3 py-2 bg-orange-500 rounded-md hover:bg-orange-600 transition" onClick={() => setIsMenuOpen(false)}>Admin Panel</Link>
              )}
              <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full text-left px-3 py-2 bg-red-500 rounded-md hover:bg-red-600 transition">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="block px-3 py-2 bg-teal-500 rounded-md hover:bg-teal-400 transition" onClick={() => setIsMenuOpen(false)}>Login / Register</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
