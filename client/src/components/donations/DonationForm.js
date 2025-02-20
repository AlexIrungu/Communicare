import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAreaById } from '../../features/areas/areasSlice';
import { createDonation } from '../../features/donations/donationsSlice';
import LoadingSpinner from '../common/LoadingSpinner';

const DonationForm = () => {
  const { areaId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { currentArea, loading: areaLoading } = useSelector(state => state.areas);
  const { loading: donationLoading, error } = useSelector(state => state.donations);
  
  const [formData, setFormData] = useState({
    amount: '',
    name: '',
    email: '',
    message: '',
    anonymous: false,
    paymentMethod: 'creditCard'
  });
  
  const [validationErrors, setValidationErrors] = useState({});
  const [showThankyou, setShowThankyou] = useState(false);

  useEffect(() => {
    if (areaId) {
      dispatch(fetchAreaById(areaId));
    }
  }, [dispatch, areaId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear validation error when field is edited
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.amount || isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      errors.amount = 'Please enter a valid donation amount';
    }
    
    if (!formData.name && !formData.anonymous) {
      errors.name = 'Please enter your name or select anonymous donation';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(createDonation({
        area_id: areaId,
        ...formData,
        amount: parseFloat(formData.amount)
      }))
        .unwrap()
        .then(() => {
          setShowThankyou(true);
          // Reset form
          setFormData({
            amount: '',
            name: '',
            email: '',
            message: '',
            anonymous: false,
            paymentMethod: 'creditCard'
          });
          
          // Redirect to thank you page after 3 seconds
          setTimeout(() => {
            navigate(`/areas/${areaId}?donated=true`);
          }, 3000);
        });
    }
  };

  if (areaLoading) return <LoadingSpinner />;
  
  if (showThankyou) {
    return (
      <div className="bg-green-50 p-8 rounded-lg shadow-md text-center">
        <div className="text-green-600 text-5xl mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Thank You for Your Donation!</h2>
        <p className="text-gray-600 mb-6">
          Your contribution of ${parseFloat(formData.amount).toFixed(2)} will help combat communicable diseases
          {currentArea ? ` in ${currentArea.name}` : ''}.
        </p>
        <p className="text-gray-500 text-sm">Redirecting you in a moment...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Make a Donation
        {currentArea && ` to Support ${currentArea.name}`}
      </h2>
      
      {error && (
        <div className="bg-red-100 p-4 mb-6 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {currentArea && (
        <div className="mb-6 bg-blue-50 p-4 rounded-md">
          <h3 className="font-bold text-lg mb-2">{currentArea.name}</h3>
          <p className="text-gray-700 mb-2">{currentArea.description}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full">
              {currentArea.cases_count.toLocaleString()} cases reported
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
              {currentArea.affected_population.toLocaleString()} people affected
            </span>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="amount">
            Donation Amount ($) *
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-600">
              $
            </span>
            <input
              type="number"
              id="amount"
              name="amount"
              min="1"
              step="0.01"
              value={formData.amount}
              onChange={handleInputChange}
              className={`pl-8 w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                validationErrors.amount ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {validationErrors.amount && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.amount}</p>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              validationErrors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {validationErrors.name && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
          )}
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              validationErrors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {validationErrors.email && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
          )}
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="anonymous"
            name="anonymous"
            checked={formData.anonymous}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="anonymous" className="ml-2 block text-gray-700">
            Donate anonymously
          </label>
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="paymentMethod">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
          >
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bankTransfer">Bank Transfer</option>
          </select>
        </div>
        
        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={donationLoading}
        >
          {donationLoading ? 'Processing...' : 'Donate'}
        </button>
      </form>
    </div>
  );
};

export default DonationForm;