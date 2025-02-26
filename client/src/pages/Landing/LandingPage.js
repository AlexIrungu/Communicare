import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { login, register } from '../../features/auth/authSlice';

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
  
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.isAdmin ? '/admin' : '/');
    }
  }, [isAuthenticated, user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isLogin && formData.password !== formData.confirmPassword) {
      return; // The error will be shown in the form validation
    }
  
    try {
      if (isLogin) {
        // Login action
        await dispatch(login({
          email: formData.email,
          password: formData.password,
          isAdmin: isAdmin // Pass isAdmin flag to handle different login endpoints if needed
        })).unwrap();
      } else {
        // Register action
        await dispatch(register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          isAdmin: isAdmin,
          adminCode: isAdmin ? formData.adminCode : undefined
        })).unwrap();
      }
      // Navigation is handled by the useEffect when auth state changes
    } catch (err) {
      // Error handling is managed by Redux, no need to set local error state
      console.error('Authentication error:', err);
    }
  };

  // Form validation
  const getPasswordMatchError = () => {
    if (!isLogin && formData.password && formData.confirmPassword && 
        formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }
    return '';
  };

  const passwordMatchError = getPasswordMatchError();
  const isSubmitDisabled = !isLogin && passwordMatchError;

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
                type="button"
                className={`flex-1 py-2 text-center rounded-l-lg transition-colors ${
                  isLogin ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                type="button"
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
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    autoComplete="name"
                  />
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  autoComplete={isLogin ? "current-password" : "new-password"}
                />
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border ${
                      passwordMatchError ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    required
                    autoComplete="new-password"
                  />
                  {passwordMatchError && (
                    <p className="mt-1 text-sm text-red-600">{passwordMatchError}</p>
                  )}
                </div>
              )}

              {isAdmin && (
                <div>
                  <label htmlFor="adminCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Admin Code
                  </label>
                  <input
                    id="adminCode"
                    name="adminCode"
                    type="password"
                    value={formData.adminCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required={isAdmin}
                    autoComplete="off"
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
                disabled={loading || isSubmitDisabled}
                className={`w-full py-2 px-4 ${
                  loading || isSubmitDisabled ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                } text-white rounded-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isLogin ? 'Logging in...' : 'Registering...'}
                  </span>
                ) : (
                  isLogin ? 'Login' : 'Register'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;