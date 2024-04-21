import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styles/login.css'; // Import CSS file from styles folder
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import myImage from './image.png';
import axios from 'axios';
import CreateAccount from './CreateAccount';
import { useNavigate } from 'react-router-dom';





function Home(){
    const navigate = useNavigate();

    const handleLoad = () => {
      if(localStorage.getItem("user") != ""){
        console.log('Hi')
        navigate('/Landing');
      }
    };
    window.addEventListener('load', handleLoad);


    
    
    const HandleLogIn = (e) => {
        e.preventDefault();
        
        const password = document.getElementById('loginPass').value;
        const email = document.getElementById('loginEmail').value;
    
        axios.post('/api/logIn', {email, password})
          .then((res) => {
            if (res.data.response === 'Successfully logged In') {
              localStorage.setItem('user', res.data.username);
              localStorage.setItem('email', res.data.email);
              console.log(localStorage.getItem("email"))
              navigate('/Landing'); // Redirect to the Landing page
            } else {
              console.log('Account creation failed'); // Handle error as needed
              // Set a state variable to display an error message to the user
              document.getElementById('err mes').innerHTML = res.data.response
            }
            console.log(res); 
          })
    
          .catch((error) => {
            console.error('Error during account creation:', error);
            // Handle other errors...
          });
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

                            <div className="form-group">
                                <label id="err mes"></label>
                                </div>
                            
                            <button className="btn" onClick={HandleLogIn}> Sign In</button>
                        
                        <p className="signup-link">Don't have an account? <Link to="/CreateAccount">Create one</Link></p>
                        </div>
        </>
    );
}

export default Home;

