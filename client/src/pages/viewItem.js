import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, createSearchParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/viewItem.css'; // Import CSS file for BuyItems page

const BuyItems = () => {
  
  const navigate = useNavigate();
  const location = useLocation(); // Access location object
  const itemList = location.state?.itemList || []; // Access itemList from location state, provide default value if undefined
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');


  var info = null


  const [buttonText, setButtonText] = useState(localStorage.getItem("user"));


  const [Right, rightText] = useState("Loading...");
  const [Name, name] = useState("Loading...");
  const [Price, price] = useState("Loading...");
  const [Description, description] = useState("Loading...");
  const [Condition, condition] = useState("Loading...");
  const [Category, category] = useState("Loading...");
  const [Seller, seller] = useState("Loading...");
  const [Buy, buy] = useState("Loading...");


  const ManageAccount = () => {
    navigate('/Messages');
  };
    
  const completePurchase = (_id) => {
    const buyer = localStorage.getItem("email")
    const buyerName = localStorage.getItem("user")
    axios.post('/api/buyItem', {_id, buyer, buyerName})
    .then((res) => {
      console.log(res)
      try{
        console.log(res)
        if (res = "Okay!"){
          navigate('/Messages');
          console.log("Transaction successful")
        }
        else{
          console.log("ErrorOccured")
        }
      }
      catch (e){
        console.log("ErrorOccured")
      }
    })
  }


  const handleLoad = () => {
    setButtonText(localStorage.getItem("user"));
    console.log("Hello")
    var _id = localStorage.getItem("itemID")
    axios.post('/api/showItem', {_id})
      .then((res) => {
        try{
        info = res.data.response
        console.log(res.data.response);
        
        rightText(<img src={info['photo']} alt="Preview" style={{ maxWidth: '100%' }} />) 
        name(info['name']) 
        price(info['price']) 
        description(info['description']) 
        condition(info['condition']) 
        seller(info['user']) 
        buy(<button onClick={() => completePurchase(info["_id"])}>Buy Now!</button>)
        }
        catch{
          handleBack()
        }
      })
  };
  window.addEventListener('load', handleLoad);


  useEffect(() => {
    handleLoad();
  }, []);

  


  
  const [appState, changeChange] = useState({
   
      objects : []
  })

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.setItem("user", "");
    localStorage.setItem("email", "");
    navigate('/');
  };

  const handleBack = (e) => {
    navigate('/BuyItems');
  };





  
  

  
 

  const buyItems = async (id) => {
    let _id = id
    localStorage.setItem("Itemid", _id)
    navigate('/viewItem');
  };



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
      
     
  const testing = (e) => {
    console.log("WE GOT SOMETHING")
    console.log(e)
  }

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
        <div className="nav-title" >View Item</div>
        <div className="nav-filter">{Right}</div>
        <div className="nav-search">
          <div className="item-details">
            <div className="item-name" style={{ color: 'black', fontSize: '1.5rem', fontWeight: 'bold' }}>{Name}</div>
            <div className="item-price" style={{ color: 'black', fontSize: '1rem', marginBottom: '5px' }}>Price: {Price}</div>
            <div className="item-description" style={{ color: 'black', fontSize: '1rem', marginBottom: '5px' }}>Description: {Description}</div>
            <div className="item-condition" style={{ color: 'black', fontSize: '1rem', marginBottom: '5px' }}>Condition: {Condition}</div>
            <div className="item-seller" style={{ color: 'black', fontSize: '1rem', marginBottom: '5px' }}>Seller: {Seller}</div>
            <button className="confirm-purchase-btn" onClick={() => completePurchase(localStorage.getItem("itemID"))}>Confirm Purchase</button>
          </div>
        </div>
        <div className="nav-links">
          <button className="logout-btn" onClick={ManageAccount}>{buttonText} ||</button>
          <button className="logout-btn" onClick={handleLogout}>Log Out ||</button>
          <button className="logout-btn" onClick={handleBack}>Go Back ||</button>
        </div>
      </div>
    </div>
  );
  
  
};

export default BuyItems;