import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ setUser, user }) => {
  const handleLogout = () => {
    fetch('/logout', { method: 'DELETE' })
      .then(r => {
        if (r.ok) {
          setUser(null);
          window.location = '/log-in';
        }
      });
  };

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/blog', label: 'Blog' },
    { to: '/donation', label: 'Donation' },
    { to: '/contacts', label: 'Contacts' },
    { to: '/map', label: 'Map' },
    { to: '/diseases', label: 'Diseases' },
    { to: '/areas', label: 'Areas' },
    { to: '/areadetails', label: 'Area Details' },
    { to: '/donated', label: 'Donate' },
    { to: '/testimonial', label: 'Testimonial' },
    { to: '/medicine', label: 'Medicine' },
    { to: '/area', label: 'Area Admin' },
    { to: '/admin', label: 'Dashboard' },
    { to: '/login', label: 'Login' },
    { to: '/signup', label: 'Sign Up' }
  ];

  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">Admin Dashboard</Link>
        <div className="flex items-center space-x-4">
          {links.map(link => (
            <Link 
              key={link.to}
              to={link.to}
              className={`text-white hover:text-gray-300 px-3 py-2 rounded-md transition-colors ${user ? '' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <button 
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;