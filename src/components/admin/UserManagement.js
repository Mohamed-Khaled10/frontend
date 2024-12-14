import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getAllUsers, updateUserStatus } from '../../services/api';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
      setError(null);
    } catch (error) {
      setError('Error fetching users: ' + error.message);
      console.error('Error fetching users:', error);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await updateUserStatus(userId, newStatus);
      fetchUsers(); // Refresh the list
      setError(null);
    } catch (error) {
      setError('Error updating user status: ' + error.message);
      console.error('Error updating user status:', error);
    }
  };

  if (!isAdmin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="user-management">
      <h1>User Management</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="user-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <button 
                    onClick={() => handleStatusChange(user.id, user.status === 'active' ? 'inactive' : 'active')}
                    className={user.status === 'active' ? 'deactivate-btn' : 'activate-btn'}
                  >
                    {user.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
