import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const location = useLocation();
    const [userInfo, setUserInfo] = useState({
        name: localStorage.getItem('userName') || 'User'
    });

    useEffect(() => {
        setUserInfo({
            name: localStorage.getItem('userName') || 'User'
        });
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    return (
        <div className="sidebar">
            <div className="user-info">
                <div className="avatar"></div>
                <span className="user-name">{userInfo.name}</span>
            </div>
            <nav>
                <Link to="/courts" className={location.pathname === '/courts' ? 'active' : ''}>
                    Courts
                </Link>
                <Link to="/bookings" className={location.pathname === '/bookings' ? 'active' : ''}>
                    My Bookings
                </Link>
                <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
                    Profile
                </Link>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </nav>
            <div className="sidebar-footer">
                2024 Football Courts
            </div>
        </div>
    );
};

export default Sidebar;
