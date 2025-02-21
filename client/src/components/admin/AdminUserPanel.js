import React, { useState, useEffect } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser } from '../../services/adminService';

const AdminUserPanel = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const fetchedUsers = await fetchUsers();
    setUsers(fetchedUsers);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleCreateUser = async () => {
    await createUser(newUser);
    setNewUser({ name: '', email: '', role: '' });
    loadUsers();
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async () => {
    await updateUser(editingUser);
    setEditingUser(null);
    loadUsers();
  };

  const handleDeleteUser = async (userId) => {
    await deleteUser(userId);
    loadUsers();
  };

  return (
    <div>
      <h2>Admin User Panel</h2>
      <div>
        <h3>Create New User</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={newUser.role}
          onChange={handleInputChange}
        />
        <button onClick={handleCreateUser}>Create User</button>
      </div>
      <div>
        <h3>Existing Users</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email}) - {user.role}
              <button onClick={() => handleEditUser(user)}>Edit</button>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      {editingUser && (
        <div>
          <h3>Edit User</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={editingUser.name}
            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={editingUser.email}
            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={editingUser.role}
            onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
          />
          <button onClick={handleUpdateUser}>Update User</button>
        </div>
      )}
    </div>
  );
};

export default AdminUserPanel;