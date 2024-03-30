import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Update import statement
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import Landing from './pages/Landing';
import './App.css'; // Import CSS file from styles folder

function App() {
  return (
    <Router>
      <div className="App">
        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/" element={<Login />} /> {/* Update Route syntax */}
          <Route path="/create-account" element={<CreateAccount />} /> {/* Update Route syntax */}
          <Route path="/landing" element={<Landing />} /> {/* Update Route syntax */}
          {/* Other routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;