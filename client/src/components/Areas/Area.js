import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DonationForm from '../Diseases/Donation';
import Map from '../Map';

const Areas = () => {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);

  useEffect(() => {
    axios.get('https://communicables.onrender.com/areas')
      .then(response => setAreas(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleAreaSelect = area => {
    setSelectedArea(area);
  };

  return (
    <div className="container">
      <h2 className="mt-3 mb-3">Most Affected Areas</h2>
      <div className="row">
        {areas.map(area => (
          <div key={area.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{area.name}</h5>
                <p className="card-text">Location: {area.location}</p>
                <p className='card-text'> Longitude:{area.longitude}</p>
                <p className='card-text'> Latitude:{area.latitude}</p>
                <p className="card-text">Reported Cases: {area.reported_cases}</p>
                <p className="card-text">Disease: {area.communicable_disease.name}</p>
                <button className="btn btn-primary" onClick={() => handleAreaSelect(area)}>
                  Offer Donation
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedArea && <DonationForm area={selectedArea} />}
      <Map />
    </div>
  );
};

export default Areas;