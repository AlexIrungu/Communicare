// pages/Donate/DonatePage.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAreas } from '../../features/areas/areasSlice'; 
import { createDonation } from '../../features/donations/donationsSlice';
import DonationForm from '../../components/donations/DonationForm';
import DonationSummary from '../../components/donations/DonationSummary';

const DonatePage = () => {
  const dispatch = useDispatch();
  const { areas } = useSelector(state => state.areas);
  const { isSubmitting, isSuccess } = useSelector(state => state.donations);
  const [donationData, setDonationData] = useState({
    amount: '',
    areaId: '',
    paymentMethod: 'credit_card',
    isAnonymous: false,
    message: ''
  });

  useEffect(() => {
    dispatch(fetchAllAreas());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDonation(donationData));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDonationData({
      ...donationData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  if (isSuccess) {
    return (
      <div className="donation-success">
        <h1>Thank You for Your Donation!</h1>
        <p>Your contribution of ${donationData.amount} will help combat communicable diseases in the selected area.</p>
        <p>A confirmation email has been sent to your registered email address.</p>
        <button 
          className="new-donation-btn"
          onClick={() => window.location.reload()}
        >
          Make Another Donation
        </button>
      </div>
    );
  }

  return (
    <div className="donate-page-container">
      <div className="donate-header">
        <h1>Support Our Cause</h1>
        <p>Your donations help us fight communicable diseases in vulnerable communities</p>
      </div>

      <div className="donation-content">
        <div className="donation-form-container">
          <DonationForm 
            donationData={donationData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            areas={areas}
            isSubmitting={isSubmitting}
          />
        </div>
        
        <div className="donation-summary-container">
          <DonationSummary 
            amount={donationData.amount}
            areaId={donationData.areaId}
            areas={areas}
          />
          
          <div className="donation-impact">
            <h3>Your Impact</h3>
            <ul>
              <li>$10 can provide vaccine doses for 5 children</li>
              <li>$50 can supply a month of preventive medication</li>
              <li>$100 can fund community health worker training</li>
              <li>$500 can establish a local disease monitoring station</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;