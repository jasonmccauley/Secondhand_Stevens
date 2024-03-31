import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import './styles/landing.css'; // Import CSS file from styles folder

const Landing = () => {


    const navigate = useNavigate();

    const handleLogout = (e) => {
      e.preventDefault();
      
      localStorage.setItem("user", "");
      navigate('/');
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
          <Link to="/BuyItems" className="action-button">Buy</Link>
          <Link to="/SellItems" className="action-button">Sell</Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;