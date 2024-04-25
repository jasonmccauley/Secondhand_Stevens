
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Dimensions} from 'react-native';
import axios from 'axios';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import '../styles/messages.css'; // Import CSS file from styles folder

const Messages = () => {

  const [item, setItem] = useState('');

  const [errorMes, errorMessage] = useState('');

  const [buttonText, setButtonText] = useState(localStorage.getItem("user"));
    

  const [appState, changeChange] = useState({
    objects : []
    })

    const handleBack = (e) => {
        clearInterval()
        navigate('/landing');
    };

    const [appStateSell, changeChangeSell] = useState({
        objects : []
    })


  const handleLoad = () => {
    var user = localStorage.getItem("user")
    var email = localStorage.getItem("email")
    setButtonText(localStorage.getItem("user"));
    console.log("STARTED")
    axios.post('/api/getMessages', {email, user})
      .then((res) => {
        console.log(res)
        if(res.data.response == "Message Sent"){
            console.log(res.data.info)
            var list = res.data.info.sort(function(a, b) {return parseFloat(b.sortBy) - parseFloat(a.sortBy);})
            console.log(list)
            changeChange({ 
                objects : list
            })
        }
        else{
            
        }
      })
  };
  window.addEventListener('load', handleLoad);




  


  useEffect(() => {
    handleLoad();
    
  }, []);


  const ManageAccount = () => {
    clearInterval()
    navigate('/ViewHistory');
  };
  


    const navigate = useNavigate();

    const handleLogout = (e) => {
      e.preventDefault();
      localStorage.setItem("email", "");
      localStorage.setItem("user", "");
      clearInterval()
      navigate('/');
    };

    const handleMessage = (e) => {
        var user = localStorage.getItem("user")
        var email = localStorage.getItem("email")
        var rec = document.getElementById('A').value;
        var mes = document.getElementById('B').value;
        document.getElementById('B').value = ""
        console.log(mes.length)
      if(mes.length > 0){
        axios.post('/api/sendMessage', {email, user, rec, mes})
      .then((res) => {
        if(res.data.response == "Message Sent"){
          console.log(res.data.info)
          var list = res.data.info.sort(function(a, b) {return parseFloat(b.sortBy) - parseFloat(a.sortBy);})
          console.log(list)
          
          changeChange({ 
              objects : list
          })
          errorMessage("")
          document.getElementById('errormes').innerHTML = "";
          document.getElementById('B').value = ""
          
        }
        else{
          console.log(res.data.response)
          document.getElementById('errormes').innerHTML = res.data.response;
          errorMessage(res.data.response)
          
        }
      })
      }
      else{
        console.log("here")
        document.getElementById('errormes').innerHTML = "Enter Message";
        errorMessage("")
        errorMessage("Enter message")
      }
      };
  
      

  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="nav-header">
          <span>Account</span>
        </div>
        <div className="nav-links">
          <button className="logout-btn" onClick={ManageAccount}>{buttonText} || View Transaction History ||</button>
          <button className="logout-btn" onClick={handleLogout}>Log Out || </button>
          <button className="logout-btn" onClick={handleBack}>Go Back ||</button>
        </div>
      </nav>
      <div className="content">
        {/* Content goes here */}
      </div>
      <br/><br/><br/>
      <div className="send-message-container">
  <h1>Send Message</h1>
  <div style={{ marginBottom: "10px" }}>
    <label className="form-label">Username:</label>
    <input
      type="text"
      id="A"
      value={item}
      onChange={(e) => setItem(e.target.value)}
      placeholder="Enter Username"
    />
  </div>
  {errorMes && <p className="error-message"></p>} <div style={{color:"Red"}} id="errormes"></div> {/* Conditionally render error message */}
  <div style={{ marginBottom: "10px" }}>
    <label className="form-label">Message:</label>
    <textarea
      placeholder="Enter Message"
      id="B"
    ></textarea>
  </div>
  <button type="submit" className="btn" onClick={handleMessage}>Send Message</button>
</div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="message-container" style={{width:"100%"}}>
          <h1>Message Log</h1>
          {appState.objects.map((elements, index) => (
            <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
              To: {appState.objects[index]["to"]} <br />
              From: {appState.objects[index]["from"]} <br />
              Message: {appState.objects[index]["mes"]} <br />
              Time: {appState.objects[index]["time"]} <br />
              ----------------------------------------------------------------------------
              <br /><br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;