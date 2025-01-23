import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Donate = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    axios.get('https://communicables.onrender.com/donations')
      .then(response => setDonations(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="container">
      <h2 className="mt-3 mb-3">Donations Made</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Amount Donated</th>
            <th>Area Affected</th>
            <th>User email Donated</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {donations.map(donation => (
            <tr key={donation.id}>
              <td>{donation.amount}</td>
              <td>{donation.area.name}</td>
              <td>{donation.user.email}</td>
              <td>{donation.user.First_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Donate;
