import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



import './styles/sellItems.css';

const SellItems = () => {

    const navigate = useNavigate();
    

    const [buttonText, setButtonText] = useState(localStorage.getItem("user"));
    const handleLoad = () => {
      setButtonText(localStorage.getItem("user"));
    };
    window.addEventListener('load', handleLoad);

    const ManageAccount = () => {
      navigate('/Messages');
    };


    const listItem = (e) => {
        e.preventDefault();
        
        const name = document.getElementById('A').value;
        const category = document.getElementById('B').options[document.getElementById('B').selectedIndex].innerHTML;
        const condition = document.getElementById('C').options[document.getElementById('C').selectedIndex].innerHTML;

        
        const description = document.getElementById('D').value;

     
        
        const price = document.getElementById('E').value;
        const photo = imageData
        const user = localStorage.getItem('user')
        const email = localStorage.getItem('email')
        
        axios.post('/api/listItem', {name, category, condition, description, price, photo, user, email})
          .then((res) => {
            if (res.data.response === "Item Listed") {
              navigate('/Landing'); // Redirect to the Landing page
            } else {
              console.log('Account creation failed'); // Handle error as needed
              // Set a state variable to display an error message to the user
              //document.getElementById('err mes').innerHTML = res.data.response
            }
            console.log(res); 
          })
    
          .catch((error) => {
            console.error('Error during account creation:', error);
            // Handle other errors...
          });
      };





  
  const [itemList, setItemList] = useState([]);
  const [item, setItem] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSellItem = (e) => {
    e.preventDefault();
    if (!item || !category || !condition || !description || !price || !image) {
      return;
    }
    const formData = { item, category, condition, description, price, image };
    const newItemList = [...itemList, formData];
    setItemList(newItemList);
    navigate('/buyItems', { state: { itemList: newItemList } });
    setSuccessMessage('Your item has been successfully listed!');
  };

  const handleReturnToHome = () => {
    navigate('/landing');
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.setItem("user", "");
    localStorage.setItem("email", "");
    navigate('/');
  };

  const handleBack = (e) => {
    navigate('/Landing');
  };
  

  

    

  
  

  const [imageData, setImageData] = useState(null);

  const handleImageChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // Set the image data in the state variable
      setImageData(reader.result);
    };
    
    reader.readAsDataURL(file); // Read the file as data URL

   
  };

  console.log('Image data:', imageData);
  

  return (
    <div className="sell-items-container">
      <div className="navbar">
        <div className="nav-title">Sell</div>
        <div className="nav-links">
          <button className="logout-btn" onClick={ManageAccount}>{buttonText} ||</button>
          <button className="logout-btn" onClick={handleLogout}>Log Out ||</button>
          <button className="logout-btn" onClick={handleBack}>Go Back ||</button>
        </div>
      </div>
      <div className="content">
        {!successMessage ? (
          <form onSubmit={handleSellItem}>
            <div className="form-group">
              <label htmlFor="item">What would you like to sell?</label>
              <input
                type="text"
                id="A"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                placeholder="Enter item name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="B"
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
                id="C"
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
                id="D"
                
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="price">Price (USD)</label>
              <input
                type="text"
                id="E"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Upload image</label>
              <input
                type="file"
                id="F"
                onChange={handleImageChange}
              />
            </div>
            <button type="submit" className="btn" onClick = {listItem}>List Item</button>
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