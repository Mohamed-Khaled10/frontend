import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../services/api';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userData = await loginUser(email, password);
      localStorage.setItem('token', userData.token);
      localStorage.setItem('userId', userData.id);
      navigate('/courts');
    } catch (err) {
      setError('Invalid email or password');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="login-links">
          <p className="register-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
          <p className="admin-login-link">
            <Link to="/admin-login">Login as Admin</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
