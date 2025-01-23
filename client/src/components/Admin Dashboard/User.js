import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    First_name: '',
    Last_name: '',
    email: '',
    password: '',
    admin: false
  });

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://communicables.onrender.com/users', newUser);
      setNewUser({
        First_name: '',
        Last_name: '',
        email: '',
        password: '',
        admin: false
      });
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateUserRole = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const role = formData.get('role');
    const userId = selectedUser.id;
    try {
      await axios.put(`https://communicables.onrender.com/users/${userId}`, { role });
      setSelectedUser(null);
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('users');
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.First_name} {user.Last_name}</td>
              <td>{user.email}</td>
              <td>{user.admin ? 'Admin' : 'User'}</td>
              <td>
                <Button variant="primary" onClick={() => handleShowModal(user)}>
                  Change Role
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="primary" onClick={() => setShowModal(true)}>Create User</Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedUser ? 'Change User Role' : 'Create User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={selectedUser ? handleUpdateUserRole : handleCreateUser}>
            {!selectedUser && (
              <>
                <Form.Group controlId="First_name">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    value={newUser.First_name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, First_name: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="Last_name">
<Form.Label>Last Name</Form.Label>
<Form.Control
type="text"
placeholder="Enter last name"
value={newUser.Last_name}
onChange={(e) =>
setNewUser({ ...newUser, Last_name: e.target.value })
}
/>
</Form.Group>
<Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="admin">
              <Form.Check
                type="checkbox"
                label="Admin"
                checked={newUser.admin}
                onChange={(e) =>
                  setNewUser({ ...newUser, admin: e.target.checked })
                }
              />
            </Form.Group>
          </>
        )}

        {selectedUser && (
          <>
            <p>Change role for user: {selectedUser.First_name} {selectedUser.Last_name}</p>
            <Form.Group controlId="role">
              <Form.Check
                type="radio"
                label="User"
                name="role"
                value="false"
                defaultChecked={!selectedUser.admin}
              />
              <Form.Check
                type="radio"
                label="Admin"
                name="role"
                value="true"
                defaultChecked={selectedUser.admin}
              />
            </Form.Group>
          </>
        )}

        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {selectedUser ? 'Save Changes' : 'Create User'}
        </Button>
      </Form>
    </Modal.Body>
  </Modal>
</>
);
};

export default UserTable;
