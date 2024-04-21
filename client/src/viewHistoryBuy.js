
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Dimensions} from 'react-native';
import axios from 'axios';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import './styles/landing.css'; // Import CSS file from styles folder

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
    setButtonText(localStorage.getItem("user"));
    console.log("Started")
    var email = localStorage.getItem("email")
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
    <div className="landing-container" style={{padding:"0px"}}>
      <nav className="navbar" style={{borderColor:"white", margin:"20px"}}>
        <div className="nav-header">
          <span>History Page</span>
        </div>
        <div className="nav-links">
        <button className="logout-btn" onClick={handleMessage}>Send Message</button>
          <button className="logout-btn" onClick={ManageAccount}>{buttonText}</button>
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
          <button className="logout-btn" onClick={handleBack}>Go Back</button>
        </div>
      </nav>
      <div className="content">
        
        
      </div>
      <br></br><br></br><br></br>
      
      
      <div className="nav-header" style={{padding:"0px"}} ></div>
      <div style={{display:"flex", "flex-direction" : "row", width:Dimensions.get('window').width}}>
      
      <div style={{display:"flex", "flex-direction" : "column", "border": "20px solid #ccc", borderColor:"red", width:(Dimensions.get('window').width)/2}}>
      <h1>Buying History</h1>
      {appState.objects.map((elements,index) => (
        <div style={{ width:"100%", display:"flex", "flex-direction" : "column" }}> 
        <img src={appState.objects[index]["photo"]} alt="Preview" style={{ maxWidth: '100%' }} /><br></br>
        Name: {appState.objects[index]["name"]} <br></br>
        Price: {appState.objects[index]["price"]} <br></br>
        Description: {appState.objects[index]["description"]} <br></br>
        Condition: {appState.objects[index]["condition"]} <br></br>
        Category: {appState.objects[index]["category"]} <br></br>
        Seller: {appState.objects[index]["user"]} <br></br>
        ----------------------------------------------------------------------------
        <br></br><br></br>
        </div>
        ))
        }
    </div>
    <div style={{display:"flex", "flex-direction" : "column", "border": "20px solid #ccc", borderColor:"red", width:(Dimensions.get('window').width)/2}}>
    <h1>Selling History</h1>
        {appStateSell.objects.map((elements,index) => (
        <div style={{ width:"100%"}}> 
        <img src={appStateSell.objects[index]["photo"]} alt="Preview" style={{ maxWidth: '100%' }} /><br></br>
        Name: {appStateSell.objects[index]["name"]} <br></br>
        Price: {appStateSell.objects[index]["price"]} <br></br>
        Description: {appStateSell.objects[index]["description"]} <br></br>
        Condition: {appStateSell.objects[index]["condition"]} <br></br>
        Category: {appStateSell.objects[index]["category"]} <br></br>
        Seller: {appStateSell.objects[index]["user"]} <br></br>
        ----------------------------------------------------------------------------
        <br></br><br></br>
        </div>
        ))
        }
        </div>
        </div>
    </div>
  );
};

export default Landing;