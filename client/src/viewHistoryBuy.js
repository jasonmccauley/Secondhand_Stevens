
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Dimensions} from 'react-native';
import axios from 'axios';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import './styles/viewHistoryBuy.css'; // Import CSS file from styles folder

const Landing = () => {

  const [buttonText, setButtonText] = useState(localStorage.getItem("user"));
    

  const [appState, changeChange] = useState({
    objects : []
    })

    const handleBack = (e) => {
        navigate('/landing');
    };

    const [appStateSell, changeChangeSell] = useState({
        objects : []
    })
  const handleLoad = () => {
    const user = localStorage.getItem("user");
    var email = localStorage.getItem("email")

    
    axios.post('/api/checkNot', {email, user})
    .then((res) => {
      setButtonText(
          res.data.response
      )
    })

    
    
    
    axios.post('/api/showHistoryBuy', {email})
      .then((res) => {
        changeChange({
            objects : res.data.response
        })
      })

      axios.post('/api/showHistorySell', {email})
      .then((res) => {
        changeChangeSell({
            objects : res.data.response
        })
      })
  };
  window.addEventListener('load', handleLoad);


  


  useEffect(() => {
    handleLoad();
  }, []);

  const ManageAccount = () => {
    console.log("HELLO")
  };
  


    const navigate = useNavigate();

    const handleLogout = (e) => {
      e.preventDefault();
      localStorage.setItem("email", "");
      localStorage.setItem("user", "");
      navigate('/');
    };

    const handleMessage = (e) => {
        navigate('/Messages');
      };
  

      return (
        <div className="landing-container">
          <nav className="navbar">
            <div className="nav-header">
              <span>Purchase History</span>
            </div>
            <div className="nav-links">
              <button className="logout-btn" onClick={handleMessage}>Send Message ||</button>
              <button className="logout-btn" onClick={ManageAccount}>{buttonText} ||</button>
              <button className="logout-btn" onClick={handleLogout}>Log Out ||</button>
              <button className="logout-btn" onClick={handleBack}>Go Back ||</button>
            </div>
          </nav>
      
          <div className="content"></div>
      
          <div className="history-container">
            <div className="history-column">
              <h1 className="title">Items Bought</h1>
              {appState.objects.map((elements, index) => (
                <div key={index} className="history-item">
                  <img src={appState.objects[index]["photo"]} alt="Preview" />
                  <br></br>
                  Name: {appState.objects[index]["name"]} <br></br>
                  Price: {appState.objects[index]["price"]} <br></br>
                  Description: {appState.objects[index]["description"]} <br></br>
                  Condition: {appState.objects[index]["condition"]} <br></br>
                  Category: {appState.objects[index]["category"]} <br></br>
                  Seller: {appState.objects[index]["user"]} <br></br>
                </div>
              ))}
            </div>
      
            <div className="history-column">
              <h1 className="title">Items Sold</h1>
              {appStateSell.objects.map((elements, index) => (
                <div key={index} className="history-item">
                  <img src={appStateSell.objects[index]["photo"]} alt="Preview" />
                  <br></br>
                  Name: {appStateSell.objects[index]["name"]} <br></br>
                  Price: {appStateSell.objects[index]["price"]} <br></br>
                  Description: {appStateSell.objects[index]["description"]} <br></br>
                  Condition: {appStateSell.objects[index]["condition"]} <br></br>
                  Category: {appStateSell.objects[index]["category"]} <br></br>
                  Seller: {appStateSell.objects[index]["user"]} <br></br>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
};

export default Landing;