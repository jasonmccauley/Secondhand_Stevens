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
   
      objects : []
  })

  const handleLogout = (e) => {
    e.preventDefault();
    
    localStorage.setItem("user", "");
    navigate('/');
  };

  const handleBack = (e) => {
    navigate('/Landing');
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

  const handleSearchChange = (e) => {
    e.preventDefault();
    
    const searchWord = document.getElementById('search').value;
    const category = document.getElementById('B').options[document.getElementById('B').selectedIndex].innerHTML;
    console.log(category)
    axios.post('/api/Search', {searchWord, category})
      .then((res) => {
        changeChange({
          objects : res.data.response
      })
      })

      .catch((error) => {
        console.error('Error during account creation:', error);
        // Handle other errors...
      });
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
        <div className="nav-filter" >
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
            id="search"
            onChange={handleSearchChange}
          />
        </div>

        
        
        
        <div className="nav-links">
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
          <button className="logout-btn" onClick={handleBack}>Go Back</button>
        </div>

    
       

      
      </div>
      

      <br></br><br></br><br></br>
      {appState.objects.map((elements,index) => (
        
        <div key={index}> 
        
        
        <img src={appState.objects[index]["photo"]} alt="Preview" style={{ maxWidth: '100%' }} /><br></br>
        
        Name: {appState.objects[index]["name"]} <br></br>
        Price: {appState.objects[index]["price"]} <br></br>
        Description: {appState.objects[index]["description"]} <br></br>
        Condition: {appState.objects[index]["condition"]} <br></br>
        Category: {appState.objects[index]["category"]} <br></br>
        Seller: {appState.objects[index]["user"]} <br></br>
        <button>Buy Now!</button>
        <br></br><br></br>

        
       
        
        
        </div>
        
        ))

        }

      

      
      
      
      
      
    </div>
    
  );
};

export default BuyItems;