import React, { useState } from 'react';
import axios from 'axios';


function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');



  const signUp = async () => {
    try {
      // Make a POST request to backend route with message
      let username = (document.getElementById('usernameBox').value)
      let password = (document.getElementById('passwordBox').value)
      let email = (document.getElementById('emailBox').value)
      const res = await axios.post('/api/createAccount', { username,  password, email});
      console.log("HEY")
      // Update response state with the received message
      document.getElementById('createDebug').innerHTML = res.data.response + " | " + res.data.username
    } catch (error) {
      console.error('Error:', error);
    }
  };



  const login = async () => {
    try {
      // Make a POST request to backend route with message
      let email = (document.getElementById('loginEmail').value)
      let password = (document.getElementById('loginPass').value)
      const res = await axios.post('/api/logIn', {email, password});
      console.log("HEY")
      // Update response state with the received message
      document.getElementById('loginDebug').innerHTML = res.data.response + " | " + res.data.username
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const addItem = async () => {
    try {
      // Make a POST request to backend route with message
      let email = (document.getElementById('loginEmail').value)
      let password = (document.getElementById('loginPass').value)
      const res = await axios.post('/api/logIn', {email, password});
      console.log("HEY")
      // Update response state with the received message
      document.getElementById('loginDebug').innerHTML = res.data.response + " | " + res.data.username
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const showAllListings = async () => {
    try {

      const res = await axios.post('/api/showAllListings', {});
      
      // Update response state with the received message
      console.log(res.data.response)
      document.getElementById('showAllDebug').innerHTML = res.data.response + " | "
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const showSortedListings = async () => {
    try {


      let type = (document.getElementById('sortedType').value)

      const res = await axios.post('/api/showSortedListings', {type});
      
      // Update response state with the received message
      console.log(res.data.response)
      document.getElementById('sortedDebug').innerHTML = res.data.response + " | "
    } catch (error) {
      console.error('Error:', error);
    }
  };

  

  const listItem = async () => {
    try {
      
      let nameList = (document.getElementById('nameList').value)
      let description = (document.getElementById('description').value)
      let list_of_photos = (document.getElementById('list_of_photos').value)
      let type_of_item = (document.getElementById('type_of_item').value)
      let userList = (document.getElementById('userList').value)
      let sell_or_donate = (document.getElementById('sell_or_donate').value)
      let organization = (document.getElementById('organization').value)


      const res = await axios.post('/api/listItem', {nameList, description, list_of_photos, type_of_item, userList, sell_or_donate, organization});
      console.log("HEY")
      // Update response state with the received message
      console.log("Debugged!")
      document.getElementById('listDebug').innerHTML = res.data.response
    } catch (error) {
      console.error('Error:', error);
    }
  };





  return (
    <div>
      <input id = "usernameBox" placeholder = "username"/> <input id = "passwordBox" placeholder = "password"/> <input id = "emailBox" placeholder = "email"/>
      <button onClick={signUp}>create account</button>
      <p id="createDebug">Response from server: {response}</p>


      <br></br>
      <br></br>
      <br></br>

      <input id = "loginEmail" placeholder = "email"/> <input id = "loginPass" placeholder = "password"/>
      <button onClick={login}>Login</button>
      <p id="loginDebug">Response from server: {response}</p>


      <br></br>
      <br></br>
      <br></br>

      
      <input id = "nameList" placeholder = "name of product"/> <input id = "description" placeholder = "description"/> <input id = "list_of_photos" placeholder = "photos"/> 
      <input id = "type_of_item" placeholder = "type of item"/> <input id = "userList" placeholder = "username"/> <input id = "sell_or_donate" placeholder = "selling or donating"/>
      <input id = "organization" placeholder = "organization/sorority/fraternity"/>
      <button onClick={listItem}>list item</button>
      <p id="listDebug">Response from server: {response}</p>

      <br></br>
      <br></br>
      <br></br>

      <button onClick={showAllListings}>Show All Items for Sale</button>
      <p id="showAllDebug"> Response from server: {response}</p>

      <br></br>
      <br></br>
      <br></br>

      
      <input id = "sortedType" placeholder = "name of product"/> 
      <button onClick={showSortedListings}>Show Sorted Items for Sale</button>
      <p id="sortedDebug"> Response from server: {response}</p>

    </div>
  );
}

export default App;