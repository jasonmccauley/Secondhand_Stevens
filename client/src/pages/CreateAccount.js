import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/createAccount.css'; // Import CSS file from styles folder

const CreateAccount = () => {
  const navigate = useNavigate(); // Use useNavigate hook instead of useHistory
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleCreateAccount = (e) => {
    e.preventDefault();
    // Check if the email ends with "@stevens.edu"
    if (!email.endsWith('@stevens.edu')) {
      setError('Email must end with "@stevens.edu"');
      return;
    }
    // Implement account creation logic here, presumably adding the username and password to database.db
    // For demonstration purposes, I just have it push back to login page
    navigate('/'); // Use navigate instead of history.push
  };

  return (
    <div className="create-account-container">
      <h2 className="title">Create Account</h2>
      <form onSubmit={handleCreateAccount}>
        <div className="form-group">
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your first and last name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;