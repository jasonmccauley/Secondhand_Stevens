import React, { useState } from 'react';
import '../styles/createAccount.css'; // Import CSS file from styles folder


const CreateAccount = () => {
  return (
    

    <div className="create-account-container">

      HI HERE IS THE CLASS
      <h2 className="title">Create Account</h2>
      <form >
        <div className="form-group">
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
  
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            
          />
        </div>
       
        <button type="submit" className="btn">Create Account</button>
        
      </form>
    </div>
  );
};

export default CreateAccount;