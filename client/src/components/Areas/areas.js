import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const AreaDetails = ({ areaId }) => {
  const [area, setArea] = useState(null);
  const [donationAmount, setDonationAmount] = useState(0);
  const [review, setReview] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    const fetchArea = async () => {
      const response = await fetch(`https://communicables.onrender.com/areas/${areaId}`);
      const data = await response.json();
      setArea(data);
    };

    fetchArea();
  }, [areaId]);

  const handleDonationSubmit = (event) => {
    event.preventDefault();
    // Handle donation submission
    console.log(`Donating ${donationAmount} to ${area.name}`);
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    // Handle review submission
    console.log(`Reviewing ${area.name}: ${review}`);
    setShowReviewModal(false);
  };

  if (!area) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card className="mb-3">
        <Card.Header as="h3" className="bg-primary text-light">{area.name}</Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-md-8">
              <Card.Title>{area.location}</Card.Title>
              <Card.Text>
                Latitude: {area.latitude}<br />
                Longitude: {area.longitude}<br />
                Reported Cases: {area.reported_cases}<br />
                Disease: {area.communicable_disease.name}
              </Card.Text>
              <Button variant="primary" onClick={() => setShowReviewModal(true)}>Leave a Review</Button>
            </div>
            <div className="col-md-4">
              <Card.Title>Donate</Card.Title>
              <Form onSubmit={handleDonationSubmit}>
                <Form.Group controlId="donationAmount">
                  <Form.Label>Amount:</Form.Label>
                  <Form.Control type="number" value={donationAmount} onChange={(event) => setDonationAmount(event.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">Donate</Button>
              </Form>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Leave a Review for {area.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleReviewSubmit}>
            <Form.Group controlId="review">
              <Form.Label>Review:</Form.Label>
              <Form.Control as="textarea" rows={3} value={review} onChange={(event) => setReview(event.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">Submit Review</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <MapContainer center={[area.latitude, area.longitude]} zoom={13} scrollWheelZoom={false} style={{ height: "400px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[area

.latitude, area.longitude]}>
<Popup>
{area.name}
</Popup>
</Marker>
</MapContainer>
</>
);
};

export default AreaDetails;