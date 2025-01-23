import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Diseases.css';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import QRCode from 'react-qr-code';
import { QrReader } from 'react-qr-reader';


const DiseasesList = () => {
  const [diseases, setDiseases] = useState([]);
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    axios.get('https://communicables.onrender.com/communicable_diseases')
      .then(response => {
        setDiseases(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleScan = (data) => {
    if (data) {
      setScannedData(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="container">
      <h2 className="mt-3 mb-3">Communicable Diseases</h2>
      <div className="row">
        {diseases.map(disease => (
          <div key={disease.id} className="col-md-4 mb-4">
            <Card>
              <CardImg top width="100%" src={disease.image_url} alt={disease.name} />
              <CardBody>
                <CardTitle tag="h5">{disease.name}</CardTitle>
                <CardText>{disease.description}</CardText>
                <CardText><strong>Symptoms:</strong> {disease.symptoms}</CardText>
                <CardText><strong>Prevention measures:</strong> {disease.prevention_measures}</CardText>
                <CardText><strong>Most Prevalent:</strong> {disease.most_prevalent ? 'Yes' : 'No'}</CardText>

                {/* Display QR Code */}
                <div className="qr-code">
                  <QRCode value={`Disease: ${disease.name}, ID: ${disease.id}`} />
                </div>

                {/* Add a button to initiate QR code scanning */}
                <button onClick={() => setScannedData(null)}>Scan QR Code</button>

                {/* Display the scanned data */}
                {scannedData && (
                  <div className="scanned-data">
                    <p>Scanned Data: {scannedData}</p>
                  </div>
                )}

                {/* QR Code Scanner */}
                <QrReader
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: '100%' }}
                />
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiseasesList;
