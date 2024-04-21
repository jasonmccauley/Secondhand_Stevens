
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Dimensions} from 'react-native';
import axios from 'axios';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import './styles/messages.css'; // Import CSS file from styles folder

const Messages = () => {

  const [item, setItem] = useState('');


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
    var user = localStorage.getItem("user")
    var email = localStorage.getItem("email")
        
    setButtonText(localStorage.getItem("user"));
    axios.post('/api/getMessages', {email, user})
      .then((res) => {
        if(res.data.response == "Message Sent"){
            console.log(res.data.info)
            changeChange({
                objects : res.data.info
            })
        }
        else{
            console.log(res.data.response)
        }
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
        var user = localStorage.getItem("user")
        var email = localStorage.getItem("email")
        var rec = document.getElementById('A').value;
        var mes = document.getElementById('B').value;;


        axios.post('/api/sendMessage', {email, user, rec, mes})
      .then((res) => {
        if(res.data.response == "Message Sent"){
            console.log(res.data.info)
            changeChange({
                objects : res.data.info
            })
        }
        else{
            console.log(res.data.response)
        }
      })
      };
  
      

  return (
    <div className="landing-container" style={{padding:"0px"}}>
      <nav className="navbar" style={{borderColor:"white", margin:"20px"}}>
        <div className="nav-header" >
          <span>THIS IS THE MESSAGE PAGE!</span>
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

      <div style={{display:"flex", "flex-direction" : "column", "border": "20px solid #ccc", borderColor:"red", width:(Dimensions.get('window').width)}}>
      <h1>Send Message</h1>
      <input
                type="text"
                id="A"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                placeholder="Enter Username"
        />

            <textarea
            placeholder="Enter Message"
                id="B"
            ></textarea>

            <button type="submit" className="btn" onClick = {handleMessage}>Send Message</button>
    </div>


      <div style={{display:"flex", "flex-direction" : "row", width:Dimensions.get('window').width}}>
      
      <div style={{display:"flex", "flex-direction" : "column", "border": "20px solid #ccc", borderColor:"red", width:(Dimensions.get('window').width)}}>
      <h1>Message Log:</h1>
      {appState.objects.map((elements,index) => (
        <div style={{ width:"100%", display:"flex", "flex-direction" : "column" }}> 
        To: {appState.objects[index]["to"]} <br></br>
        From: {appState.objects[index]["from"]} <br></br>
        Message: {appState.objects[index]["mes"]} <br></br>
        Time: {appState.objects[index]["time"]} <br></br>
        
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

export default Messages;