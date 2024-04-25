import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '.././styles/buyItems.css'; // Import CSS file for BuyItems page

const BuyItems = () => {
  
  const navigate = useNavigate();
  const location = useLocation(); // Access location object
  const itemList = location.state?.itemList || []; // Access itemList from location state, provide default value if undefined
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  
  
  const [appState, changeChange] = useState({
      objects : []
  })


  //For logging out
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.setItem("user", "");
    localStorage.setItem("email", "");
    navigate('/');
  };

  const handleBack = (e) => {
    navigate('/Landing');
  };



  const [buttonText, setButtonText] = useState(localStorage.getItem("user"));
  
  
  
  


  
//This runs on load. This deals with checking for any new notifications
  const handleLoad = () => {
    const user = localStorage.getItem("user");
    var email = localStorage.getItem("email")
    axios.post('/api/checkNot', {email, user})
    .then((res) => {
      console.log("COOL")
      setButtonText(
          res.data.response
      )
    })
  };
  window.addEventListener('load', handleLoad);
  

  const ManageAccount = () => {
    navigate('/Messages');
  };
  

  
  
  useEffect(() => {
    showItems();
    handleLoad();
  }, []);


  //This zooms in on a specific object
  const buyItems = async (id) => {
    let _id = id
    localStorage.setItem("itemID", _id)
    navigate('/viewItem');
  };

  const showItems = () => {
    
    let type = document.getElementById('B').options[document.getElementById('B').selectedIndex].innerHTML;
    let user = localStorage.getItem("user")
    console.log(user)
    if(type == "All Categories"){
      axios.post('/api/showAllListings', {type, user})
      .then((res) => {
        
        changeChange({
            objects : res.data.response
        })
        
      })
    }
    else{
      axios.post('/api/showSortedListings', {type, user})
      .then((res) => {
        
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
    var user = localStorage.getItem("user")
    axios.post('/api/Search', {searchWord, category, user})
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
      
     
  const testing = (e) => {
    console.log("WE GOT SOMETHING")
    console.log(e)
  }

  
  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  
  const filteredItems = itemList.filter((item) =>
    (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (!filterCategory || item.category === filterCategory)
  );

  // Main Page
  return (
    <div className="buy-items-container">
      {/* Navigation bar */}
      <div className="navbar">
        <div className="nav-title">Buy</div>
        <div className="nav-filter">
          <select id="B" onChange={showItems} onLoad={showItems}>
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
          <button className="logout-btn" onClick={ManageAccount}>
            {buttonText} ||
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Log Out ||
          </button>
          <button className="logout-btn" onClick={handleBack}>
            Go Back ||
          </button>
        </div>
      </div>
  
      <br></br>
      <br></br>
      <br></br>
      {appState.objects.map((element, index) => (
        <div key={index} className="item">
          <img
            src={appState.objects[index]["photo"]}
            alt="Preview"
            className="item-image"
          />
          <div className="item-details">
            <div className="item-name">{appState.objects[index]["name"]}</div>
            <div className="item-price">
              Price: {appState.objects[index]["price"]}
            </div>
            <div className="item-description">
              Description: {appState.objects[index]["description"]}
            </div>
            <div className="item-condition">
              Condition: {appState.objects[index]["condition"]}
            </div>
            <div className="item-category">
              Category: {appState.objects[index]["category"]}
            </div>
            <div className="item-seller">
              Seller: {appState.objects[index]["user"]}
            </div>
            <button
              className="buy-button"
              onClick={() => buyItems(appState.objects[index]["_id"])}
              style = {{marginBottom: '10px'}}
            >
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
  
};

export default BuyItems;