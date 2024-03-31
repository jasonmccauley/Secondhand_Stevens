import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styles/login.css'; // Import CSS file from styles folder
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import myImage from './image.png';
import axios from 'axios';
import './styles/createAccount.css'; // Import CSS file from styles folder



const signUp = async () => {
    try {
        axios.defaults.baseURL = window.location.protocol + "//" + window.location.hostname + ":8080";
      // Make a POST request to backend route with message
      let username = (document.getElementById('usernameBox').value)
      let password = (document.getElementById('passwordBox').value)
      let email = (document.getElementById('emailBox').value)
      const res = await axios.post('/api/createAccount', { username,  password, email});
      console.log("HEY")
      // Update response state with the received message
      console.log( res.data.response + " | " + res.data.username)
    } catch (error) {
      console.error('Error:', error);
    }
  };

export default function CreateAccount() {
    return (
        <>
           <div className="create-account-container">
      <h2 className="title">Create Account</h2>
     
        <div className="form-group">
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="usernameBox"
           
          />
        </div>
        <div className="form-group">
          <label >Email</label>
          <input
            type="email"
            id="emailBox"
            
          />
        </div>
        <div className="form-group">
          <label >Password</label>
          <input
            type="password"
            id="passwordBox"
            
          />
        </div>
        
        <button onClick = {signUp} className="btn">Create Account</button>
     
    </div>
        </>
    );
}

