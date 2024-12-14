import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginAdmin } from '../../services/api';
import './AdminLogin.css';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginAdmin(credentials.email, credentials.password);
            console.log('Login response:', response);
            
            if (response.token) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('isAdmin', 'true');
                localStorage.setItem('user', JSON.stringify(response.user));
                navigate('/admin/dashboard');
            } else {
                setError('Invalid response from server');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Failed to login. Please try again.');
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-form">
                <h2>Admin Login</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter admin email"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter password"
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <div className="back-to-login">
                    <Link to="/login">Back to User Login</Link>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
