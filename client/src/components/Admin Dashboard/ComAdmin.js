import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const ComAdmin = () => {
  const [diseases, setDiseases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [newDisease, setNewDisease] = useState({
    name: '',
    image_url: 'https://images.pexels.com/photos/6303643/pexels-photo-6303643.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: '',
    symptoms: '',
    prevention_measures: '',
    most_prevalent: false
  });

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (disease) => {
    setSelectedDisease(disease);
    setShowModal(true);
  };

  const handleCreateDisease = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://communicables.onrender.com/communicable_diseases', newDisease);
      setNewDisease({
        name: '',
        image_url: 'https://images.pexels.com/photos/6303643/pexels-photo-6303643.jpeg?auto=compress&cs=tinysrgb&w=600',
        description: '',
        symptoms: '',
        prevention_measures: '',
        most_prevalent: false
      });
      setShowModal(false);
      fetchDiseases();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateDisease = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const image_url = formData.get('image_url');
    const description = formData.get('description');
    const symptoms = formData.get('symptoms');
    const prevention_measures = formData.get('prevention_measures');
    const most_prevalent = formData.get('most_prevalent');
    const diseaseId = selectedDisease.id;
    try {
      await axios.put(`/communicable_diseases/${diseaseId}`, { name, image_url, description, symptoms, prevention_measures, most_prevalent });
      setSelectedDisease(null);
      setShowModal(false);
      fetchDiseases();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteDisease = async (diseaseId) => {
    try {
      await axios.delete(`https://communicables.onrender.com/communicable_diseases/${diseaseId}`);
      fetchDiseases();
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
    fetchDiseases();
  }, []);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Symptoms</th>
            <th>Prevention Measures</th>
            <th>Most Prevalent</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>    {diseases.map((disease, index) => (
      <tr key={disease.id}>
        <td>{index + 1}</td>
        <td>{disease.name}</td>
        <td>{disease.description}</td>
        <td>{disease.symptoms}</td>
        <td>{disease.prevention_measures}</td>
        <td>{disease.most_prevalent ? 'Yes' : 'No'}</td>
        <td>
          <Button variant="primary" size="sm" onClick={() => handleShowModal(disease)}>Edit</Button>{' '}
          <Button variant="danger" size="sm" onClick={() => handleDeleteDisease(disease.id)}>Delete</Button>
        </td>
      </tr>
    ))}
    </tbody>
  </Table>

  <Button variant="primary" onClick={() => setShowModal(true)}>Add New Disease</Button>

  <Modal show={showModal} onHide={handleCloseModal}>
    <Modal.Header closeButton>
      <Modal.Title>{selectedDisease ? 'Edit Disease' : 'Add New Disease'}</Modal.Title>
    </Modal.Header>
    <Form onSubmit={selectedDisease ? handleUpdateDisease : handleCreateDisease}>
      <Modal.Body>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" name="name" defaultValue={selectedDisease ? selectedDisease.name : ''} required />
        </Form.Group>
        <Form.Group controlId="image_url">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" placeholder="Enter image URL" name="image_url" defaultValue={selectedDisease ? selectedDisease.image_url : ''} />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" placeholder="Enter description" name="description" defaultValue={selectedDisease ? selectedDisease.description : ''} required />
        </Form.Group>
        <Form.Group controlId="symptoms">
          <Form.Label>Symptoms</Form.Label>
          <Form.Control as="textarea" placeholder="Enter symptoms" name="symptoms" defaultValue={selectedDisease ? selectedDisease.symptoms : ''} required />
        </Form.Group>
        <Form.Group controlId="prevention_measures">
          <Form.Label>Prevention Measures</Form.Label>
          <Form.Control as="textarea" placeholder="Enter prevention measures" name="prevention_measures" defaultValue={selectedDisease ? selectedDisease.prevention_measures : ''} required />
        </Form.Group>
        <Form.Group controlId="most_prevalent">
          <Form.Check type="checkbox" label="Most Prevalent" name="most_prevalent" defaultChecked={selectedDisease ? selectedDisease.most_prevalent : false} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
        <Button variant="primary" type="submit">{selectedDisease ? 'Save Changes' : 'Create Disease'}</Button>
      </Modal.Footer>
    </Form>
  </Modal>
</>
);
};

export default ComAdmin;
         
