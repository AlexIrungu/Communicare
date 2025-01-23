import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const AreaTable = () => {
  const [areas, setAreas] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [newArea, setNewArea] = useState({
    name: '',
    location: '',
    latitude: 0,
    longitude: 0,
    reported_cases: 0,
    communicable_disease_id: ''
  });

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (area) => {
    setSelectedArea(area);
    setShowModal(true);
  };

  const handleCreateArea = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://communicables.onrender.com/areas', newArea);
      setNewArea({
        name: '',
        location: '',
        latitude: 0,
        longitude: 0,
        reported_cases: 0,
        communicable_disease_id: ''
      });
      setShowModal(false);
      fetchAreas();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateArea = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const location = formData.get('location');
    const latitude = formData.get('latitude');
    const longitude = formData.get('longitude');
    const reported_cases = formData.get('reported_cases');
    const communicable_disease_id = formData.get('communicable_disease_id');
    const areaId = selectedArea.id;
    try {
      await axios.put(`/areas/${areaId}`, { name, location, latitude, longitude, reported_cases, communicable_disease_id });
      setSelectedArea(null);
      setShowModal(false);
      fetchAreas();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteArea = async (areaId) => {
    try {
      await axios.delete(`https://communicables.onrender.com/areas/${areaId}`);
      fetchAreas();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAreas = async () => {
    try {
      const { data } = await axios.get('https://communicables.onrender.com/areas');
      setAreas(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDiseases = async () => {
    try {
      const { data } = await axios.get('https://communicables.onrender.com/communicable_diseases');
      setDiseases(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAreas();
    fetchDiseases();
  }, []);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Location</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Reported Cases</th>
            <th>Communicable Disease</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {areas.map((area, index) => (
            <tr key={area.id}>
            <td>{index + 1}</td>
            <td>{area.name}</td>
            <td>{area.location}</td>
            <td>{area.latitude}</td>
            <td>{area.longitude}</td>
            <td>{area.reported_cases}</td>
            <td>{area.communicable_disease.name}</td>
            <td>
              <Button variant="primary" size="sm" onClick={() => handleShowModal(area)}>Edit</Button>{' '}
              <Button variant="danger" size="sm" onClick={() => handleDeleteArea(area.id)}>Delete</Button>
            </td>
          </tr>
          
      ))}
    </tbody>
  </Table>
  <Button variant="primary" onClick={() => setShowModal(true)}>Create Area</Button>

  <Modal show={showModal} onHide={handleCloseModal}>
    <Modal.Header closeButton>
      <Modal.Title>{selectedArea ? 'Edit Area' : 'Create Area'}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={selectedArea ? handleUpdateArea : handleCreateArea}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" defaultValue={selectedArea ? selectedArea.name : ''} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" name="location" defaultValue={selectedArea ? selectedArea.location : ''} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Latitude</Form.Label>
          <Form.Control type="number" step="any" name="latitude" defaultValue={selectedArea ? selectedArea.latitude : ''} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Longitude</Form.Label>
          <Form.Control type="number" step="any" name="longitude" defaultValue={selectedArea ? selectedArea.longitude : ''} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Reported Cases</Form.Label>
          <Form.Control type="number" name="reported_cases" defaultValue={selectedArea ? selectedArea.reported_cases : ''} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Communicable Disease</Form.Label>
          <Form.Control as="select" name="communicable_disease_id" defaultValue={selectedArea ? selectedArea.communicable_disease_id : ''} required>
            <option value="" disabled>Select Disease</option>
            {diseases.map((disease) => (
              <option key={disease.id} value={disease.id}>{disease.name}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          {selectedArea ? 'Save Changes' : 'Create Area'}
        </Button>
      </Form>
    </Modal.Body>
  </Modal>
</>
);
};

export default AreaTable;






