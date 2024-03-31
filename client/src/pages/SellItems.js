import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/sellItems.css';

const SellItems = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSellItem = (e) => {
    e.preventDefault();
    // Check if all fields are filled
    if (!item || !category || !condition || !description || !price) {
      return;
    }
    // Implement logic to list item (e.g., send data to backend)
    // For demonstration purposes, just show success message
    setSuccessMessage('Your item has been successfully listed!');
  };

  const handleReturnToHome = () => {
    navigate('/landing');
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="sell-items-container">
      <div className="navbar">
        <div className="nav-title">Sell</div>
        <div className="nav-links">
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        </div>
      </div>
      <div className="content">
        {!successMessage ? (
          <form onSubmit={handleSellItem}>
            <div className="form-group">
              <label htmlFor="item">What would you like to sell?</label>
              <input
                type="text"
                id="item"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                placeholder="Enter item name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select category</option>
                <option value="Books">Books</option>
                <option value="Clothing">Clothing</option>
                <option value="Electronics">Electronics</option>
                <option value="Sports Gear">Sports Gear</option>
                <option value="Furniture">Furniture</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="condition">Condition</label>
              <select
                id="condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="">Select condition</option>
                <option value="New">New</option>
                <option value="Used Like New">Used Like New</option>
                <option value="Used Very Good">Used Very Good</option>
                <option value="Used Good">Used Good</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter item description"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="price">Price (USD)</label>
              <input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
              />
            </div>
            <button type="submit" className="btn">List Item</button>
          </form>
        ) : (
          <>
            <p className="success-message">{successMessage}</p>
            <p>Please drop your item off at UCC within the next 24 hours.</p>
            <div className="return-to-home">
              <button onClick={handleReturnToHome} className="btn">Return to Home</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SellItems;