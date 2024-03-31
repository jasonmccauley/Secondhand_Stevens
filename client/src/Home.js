import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styles/login.css'; // Import CSS file from styles folder
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import myImage from './image.png';
import axios from 'axios';





export default function Home(){
    
    const login = async () => {
        try {
            axios.defaults.baseURL = window.location.protocol + "//" + window.location.hostname + ":8080";
            console.log("Used")
          // Make a POST request to backend route with message
          let email = (document.getElementById('loginEmail').value)
          let password = (document.getElementById('loginPass').value)
          console.log("UsedTWO")
          const res = await axios.post('/api/logIn', {email, password});
          console.log("UsedTHree")
          console.log("HEY")
          // Update response state with the received message
          console.log(res.data.response + " | " + res.data.username)
        } catch (error) {
          
        }
      };

    return(
        <>
                                <div className="login-container">
                        <img src= {myImage} alt="Second Hand Stevens Logo" className="logo" />
                        <h2 className="title">Sign In</h2>
                        
                            <div className="form-group">
                            <label htmlFor="loginEmail">Email</label>
                            <input
                                type="email"
                                id="loginEmail"
                                
                            />
                            </div>
                            <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="loginPass"
                                
                            />
                            </div>
                            
                            <button className="btn" onClick={login}> Sign In</button>
                        
                        <p className="signup-link">Don't have an account? <Link to="/create-account">Create one</Link></p>
                        </div>
        </>
    );
}



