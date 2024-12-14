import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Navigation/Sidebar';
import Navbar from './components/Navigation/Navbar';
import Login from './components/user/Login';
import Register from './components/user/Register';
import AdminLogin from './components/admin/AdminLogin';
import AdminSidebar from './components/admin/AdminSidebar';
import AddCourts from './components/admin/AddCourts';
import CourtListing from './components/Courts/CourtListing';
import './App.css';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/admin-login';
  const isAdminPage = location.pathname.startsWith('/admin');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const isAuthenticated = localStorage.getItem('token') !== null;

  // Protect admin routes
  const AdminRoute = ({ children }) => {
    return isAdmin ? children : <Navigate to="/admin-login" />;
  };

  // Protect user routes
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <div className="app">
      {!isAuthPage && !isAdminPage && <Navbar />}
      {!isAuthPage && !isAdminPage && <Sidebar />}
      {!isAuthPage && isAdminPage && <AdminSidebar />}
      <div className={isAuthPage ? "auth-content" : "main-content"}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          
          {/* User Routes */}
          <Route path="/courts" element={
            <ProtectedRoute>
              <CourtListing />
            </ProtectedRoute>
          } />
          <Route path="/bookings" element={
            <ProtectedRoute>
              <div>My Bookings</div>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <div>Profile Page</div>
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={
            <AdminRoute>
              <div className="admin-dashboard">
                <h2>Admin Dashboard</h2>
              </div>
            </AdminRoute>
          } />
          <Route path="/admin/add-courts" element={
            <AdminRoute>
              <AddCourts />
            </AdminRoute>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;