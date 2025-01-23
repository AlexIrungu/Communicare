import React, { useState, useEffect } from 'react';

const DonationForm = ({ area }) => {
  const [donationAmount, setDonationAmount] = useState(0);
  const [donations, setDonations] = useState([]);

  const handleDonationSubmit = async event => {
    event.preventDefault();
    try {
      const response = await fetch('https://communicables.onrender.com/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          area_id: area.id,
          donation_amount: donationAmount
        })
      });
      if (response.ok) {
        alert('Thank you for your donation!');
        setDonationAmount(0);
      } else {
        alert('There was an error processing your donation.');
      }
    } catch (error) {
      console.error(error);
      alert('There was an error processing your donation.');
    }
  };

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch(`https://communicables.onrender.com/donations?area_id=${area.id}`);
        if (response.ok) {
          const data = await response.json();
          setDonations(data);
        } else {
          console.log('Unable to fetch donations.');
        }
      } catch (error) {
        console.error(error);
        console.log('Unable to fetch donations.');
      }
    };
    fetchDonations();
  }, [area]);

  return (
    <div className="donation-form">
      <h3>Offer a Donation</h3>
      <p>Enter the amount you would like to donate to {area.name}:</p>
      <form onSubmit={handleDonationSubmit}>
        <div className="form-group">
          <label htmlFor="donationAmount">Donation Amount:</label>
          <input
            type="number"
            className="form-control"
            id="donationAmount"
            value={donationAmount}
            onChange={event => setDonationAmount(event.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {donations.length > 0 && (
        <div className="donation-list">
          <h4>Donations:</h4>
          <ul>
            {donations.map(donation => (
              <li key={donation.id}>
                {donation.donation_amount} from {donation.donor_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DonationForm;
