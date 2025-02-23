import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';

const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    adminCode: ''
  });
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    try {
      const endpoint = isLogin
        ? `http://localhost:3001/api/v1/login`
        : `http://localhost:3001/api/v1/signup`;
  
      const bodyData = isLogin
        ? { email: formData.email, password: formData.password } // ✅ Fix for login
        : { name: formData.name, email: formData.email, password: formData.password };
  
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
        credentials: 'include',
      });
  
      const data = await response.json();
  
      if (response.ok) {
        dispatch({ type: 'auth/login', payload: data.user });
        navigate(data.user.isAdmin ? '/admin' : '/');
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          {/* Logo and Title */}
          <div className="flex items-center mb-8">
            <Activity className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-blue-600">Communicare</h1>
          </div>
          
          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">
              Welcome to Communicare
            </h2>
            <p className="text-gray-600 mt-2">
              Join us in the fight against communicable diseases
            </p>
          </div>

          {/* Auth Card */}
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
            {/* Toggle Buttons */}
            <div className="flex mb-6">
              <button
                className={`flex-1 py-2 text-center rounded-l-lg transition-colors ${
                  isLogin ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={`flex-1 py-2 text-center rounded-r-lg transition-colors ${
                  !isLogin ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </div>

            {/* Admin Toggle */}
            <div className="flex items-center justify-end mb-4">
              <label className="flex items-center cursor-pointer">
                <span className="mr-2 text-sm text-gray-600">Admin</span>
                <input
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                />
              </label>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              )}

              {isAdmin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Admin Code
                  </label>
                  <input
                    type="password"
                    value={formData.adminCode}
                    onChange={(e) => setFormData({...formData, adminCode: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required={isAdmin}
                  />
                </div>
              )}

              {error && (
                <div className="text-red-600 text-sm py-2">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLogin ? 'Login' : 'Register'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;