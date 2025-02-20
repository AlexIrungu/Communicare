import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

const DonationSummary = () => {
  const { areaId } = useParams();
  const navigate = useNavigate();
  const { currentArea } = useSelector(state => state.areas);
  const { lastDonation } = useSelector(state => state.donations);

  if (!lastDonation) {
    return <p className="text-center text-gray-500">No recent donation found.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Donation Summary</h2>
      <p className="text-gray-600 mb-4">Thank you for your generous donation!</p>
      <div className="bg-green-50 p-4 rounded-md text-left">
        <p><strong>Amount:</strong> ${lastDonation.amount.toFixed(2)}</p>
        <p><strong>Donor:</strong> {lastDonation.anonymous ? 'Anonymous' : lastDonation.name}</p>
        <p><strong>Email:</strong> {lastDonation.email}</p>
        {lastDonation.message && <p><strong>Message:</strong> {lastDonation.message}</p>}
        {currentArea && <p><strong>Area Supported:</strong> {currentArea.name}</p>}
      </div>
      <button 
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        onClick={() => navigate(`/areas/${areaId}`)}
      >
        Back to Area Details
      </button>
    </div>
  );
};

export default DonationSummary;
