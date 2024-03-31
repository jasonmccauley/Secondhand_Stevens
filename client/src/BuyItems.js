import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './styles/buyItems.css'; // Import CSS file for BuyItems page

const BuyItems = () => {
  
  const navigate = useNavigate();
  const location = useLocation(); // Access location object
  const itemList = location.state?.itemList || []; // Access itemList from location state, provide default value if undefined
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  
  
  const [appState, changeChange] = useState({
   
      objects : [{_id:"1"}, {_id:"2"}, {_id:"3"}, {_id:"4"}]
  })

  // Function to handle log out
  const handleLogout = () => {
    navigate('/');
  };


  
  
  useEffect(() => {
    showItems();
  }, []);

 

  const showItems =() => {
    console.log("Show Time")
    let type = document.getElementById('B').options[document.getElementById('B').selectedIndex].innerHTML;
    console.log(type)
    console.log(type)
    if(type == "All Categories"){
      axios.post('/api/showAllListings', {type})
      .then((res) => {
        console.log(res.data.response); 

        
     

        changeChange({
            objects : res.data.response
        })
        
      })
    }
    else{
      axios.post('/api/showSortedListings', {type})
      .then((res) => {
        console.log(res.data.response); 
        
        
        changeChange({
          objects : res.data.response
      })
      })
    }
    
  }

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
        <div className="nav-title" >Buy</div>
        <div className="nav-filter">
          <select id="B" onChange={showItems} onLoad = {showItems}>
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
      

      <br></br><br></br><br></br>
      {appState.objects.map((elements,index) => (
        
        <p key={index}  > {appState.objects[index]["_id"]} </p>
        ))

        }

      

      
      
      
      
      
    </div>
    
  );
};

export default BuyItems;