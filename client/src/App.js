import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import Landing from './pages/Landing';
import SellItems from './pages/SellItems'; // Import SellItems component
import './App.css'; // Import CSS file from styles folder

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/sellItems" element={<SellItems />} /> {/* Route for SellItems */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;