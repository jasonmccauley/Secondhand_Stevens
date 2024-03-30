import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import logo from '../styles/logo.png';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.endsWith('@stevens.edu')) {
      navigate('/landing'); // Navigate to the landing page upon successful login
    } else {
      setError('Invalid email domain');
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Second Hand Stevens Logo" className="logo" />
      <h2 className="title">Sign In</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn">Sign In</button>
      </form>
      <p className="signup-link">Don't have an account? <span onClick={() => navigate('/create-account')}>Create one</span></p>
    </div>
  );
};

export default Login;