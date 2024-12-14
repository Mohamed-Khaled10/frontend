import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/admin-login');
    };

    return (
        <div className="admin-sidebar">
            <div className="admin-sidebar-header">
                <h3>Admin Panel</h3>
            </div>
            <nav>
                <Link to="/admin/dashboard" className={location.pathname === '/admin/dashboard' ? 'active' : ''}>
                    Dashboard
                </Link>
                <Link to="/admin/add-courts" className={location.pathname === '/admin/add-courts' ? 'active' : ''}>
                    Add Courts
                </Link>
            </nav>
            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
        </div>
    );
};

export default AdminSidebar;
