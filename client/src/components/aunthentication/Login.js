import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../features/auth/authSlice';
import { store } from '../../store'

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // clear error message when component mounts
    dispatch(clearError());
    return () => dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    console.log("Auth state changed:", { isAuthenticated, user });
    if (isAuthenticated && user) {
      // Add a small delay to ensure state has propagated
      navigate(user.isAdmin ? '/admin' : '/');
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // After dispatching login action (inside the handleSubmit function)
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.email || !formData.password) {
    return;
  }
  
  console.log("Submitting login form with:", {
    email: formData.email,
    role: formData.role,
  });
  
  try {
    const resultAction = await dispatch(login({
      email: formData.email,
      password: formData.password,
      role: formData.role,
    }));
    
    console.log("Login dispatch result:", resultAction);
    
    // Add this line to check state after login
    console.log("Post-login Redux state:", store.getState().auth);
  } catch (err) {
    console.error('Login dispatch error:', err);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Login</h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <select
                id="role"
                name="role"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        
        {error && (
          <div className="mt-4 text-center text-sm text-red-600">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;