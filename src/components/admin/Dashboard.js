import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getDashboardStats } from '../../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourts: 0,
    activeBookings: 0
  });
  const [error, setError] = useState(null);
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
      setError(null);
    } catch (error) {
      setError('Error fetching dashboard stats: ' + error.message);
      console.error('Error fetching dashboard stats:', error);
    }
  };

  if (!isAdmin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Courts</h3>
          <p>{stats.totalCourts}</p>
        </div>
        <div className="stat-card">
          <h3>Active Bookings</h3>
          <p>{stats.activeBookings}</p>
        </div>
      </div>
      <div className="admin-actions">
        <button onClick={() => window.location.href = '/admin/users'}>Manage Users</button>
        <button onClick={() => window.location.href = '/admin/courts'}>Manage Courts</button>
        <button onClick={() => window.location.href = '/admin/bookings'}>Manage Bookings</button>
      </div>
    </div>
  );
};

export default Dashboard;
