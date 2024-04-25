import React, { useState } from 'react';
import axios from 'axios';

import {BrowserRouter, Routes, Route, Link} from "react-router-dom"


import Home from "./pages/Home";

import CreateAccount from "./pages/CreateAccount";

import Landing from "./pages/Landing";

import BuyItems from "./pages/BuyItems";
import SellItems from './pages/SellItems';

import ViewItem from './pages/viewItem';

import ViewHistoryBuy from './pages/viewHistoryBuy';

import Messages from './pages/Message';

function App() {
  
  


 





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
      //console.log(res.data.response)
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
    <BrowserRouter>
    <Routes>
      <Route index element=<Home /> />
      <Route path="/CreateAccount" element={<CreateAccount/>}>  </Route>
      <Route path="/Landing" element={<Landing/>}>  </Route>
      <Route path="/ViewItem" element={<ViewItem/>}>  </Route>
      <Route path="/BuyItems" element={<BuyItems/>}>  </Route>
      <Route path="/SellItems" element={<SellItems/>}>  </Route>
      <Route path="/ViewHistory" element={<ViewHistoryBuy/>}>  </Route>
      <Route path="/Messages" element={<Messages/>}>  </Route>
    </Routes>
    </BrowserRouter>
  );



}

export default App;