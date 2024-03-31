import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles/buyItems.css'; // Import CSS file for BuyItems page

const BuyItems = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Access location object
  const itemList = location.state?.itemList || []; // Access itemList from location state, provide default value if undefined
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  

  // Function to handle log out
  const handleLogout = () => {
    navigate('/');
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle filter change
  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  // Filter items based on search query and selected category
  const filteredItems = itemList.filter((item) =>
    (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (!filterCategory || item.category === filterCategory)
  );

  return (
    <div className="buy-items-container">
      {/* Navigation bar */}
      <div className="navbar">
        <div className="nav-title">Buy</div>
        <div className="nav-filter">
          <select value={filterCategory} onChange={handleFilterChange}>
            <option value="">All Categories</option>
            <option value="Books">Books</option>
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
            <option value="Sports Gear">Sports Gear</option>
            <option value="Furniture">Furniture</option>
          </select>
        </div>
        <div className="nav-search">
          <input
            type="text"
            placeholder="Search items"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="nav-links">
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        </div>
      </div>
      {/* List of items */}
      <div className="items-list">
        {filteredItems.map((item, index) => (
          <div className="item" key={index}>
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-details">
              <div className="item-name">{item.name}</div>
              <div className="item-condition">Condition: {item.condition}</div>
              <div className="item-price">Price: {item.price} USD</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyItems;