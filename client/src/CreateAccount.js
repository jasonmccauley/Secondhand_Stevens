import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/createAccount.css'; // Import CSS file from styles folder

function CreateAccount() {
    const navigate = useNavigate();
// Handle Sign up page
  const HandleSignUp = (e) => {
    e.preventDefault();
    const username = document.getElementById('usernameBox').value;
    const password = document.getElementById('passwordBox').value;
    const email = document.getElementById('emailBox').value;

    axios.post('/api/createAccount', { username, password, email })
      .then((res) => {
        if (res.data.response === 'Account Created') {
          localStorage.setItem('user', res.data.username);
          localStorage.setItem('email', res.data.email);
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

  return (
    <div className="create-account-container">
      <h2 className="title">Create Account</h2>
      <div className="form-group">
        <label htmlFor="name">Your name</label>
        <input type="text" id="usernameBox" />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" id="emailBox" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" id="passwordBox" />
      </div>
      <div className="form-group">
      <label id="err mes"></label>
      </div>
      <button onClick={HandleSignUp}>Sign Up</button>
    </div>
  );
}

export default CreateAccount;
