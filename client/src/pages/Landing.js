import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/landing.css';

const Landing = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); // Navigate to the root URL upon logout
  };

  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="nav-header">
          <span>Welcome to Second Hand Stevens!</span>
        </div>
        <div className="nav-links">
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        </div>
      </nav>
      <div className="content">
        <h2 className="title">What would you like to do today?</h2>
        <div className="action-buttons">
          <Link to="/buyItems" className="action-button">Buy</Link>
          <Link to="/sellItems" className="action-button">Sell</Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;