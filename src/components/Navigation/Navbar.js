import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Ehgez</Link>
      </div>
      <div className="navbar-auth">
        <Link to="/login" className="auth-link">Login</Link>
        <Link to="/register" className="auth-link register-btn">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
