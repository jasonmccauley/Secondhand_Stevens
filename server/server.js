const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('server', {
    maxHeaderSize: 100 * 1024, // 16KB, adjust as needed
  });
const PORT = 8080;

var cors = require('cors')

app.use(cors()) // Use this after the variable declaration


app.use(bodyParser.json());

const Datastore = require('nedb')

const database = new Datastore("database.db")
database.loadDatabase();





const listDatabase = new Datastore("list.db")
listDatabase.loadDatabase();

// Route to handle button press request
app.post('/api/createAccount', (req, res) => {
  // Retrieve message from request body
  console.log(req.body)
  const { username } = req.body;
  const { password } = req.body
  const { email } = req.body
  database.find({email:email},function(err,output){
    console.log(output)
    if(output.length > 0){
      res.json({ response: 'Account already exist',  username:" FAILED LOGIN!! "});
    }
    else{
      database.insert({username: username, password:password, email:email})
      res.json({ response: 'Account Created', username:username });
    }
  })
  // Process message (e.g., log it)
  console.log('Received message:', username);
  console.log('Received message:', password);
  // Send back a response
});







app.use(function(req, res, next) {

 
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/api/logIn', (req, res) => {
  // Retrieve message from request body
  console.log(req.body)
  const { email } = req.body
  const { password } = req.body
  database.find({email:email},function(err,output){
    console.log(output)
    if(output.length > 0){
      if(output[0]["password"] == password){
      res.json({ response: 'Successfully logged In',  username:output[0]["username"]});
      }
      else{
        res.json({ response: 'Wrong Password', username: "WRONG PASSWORD" });
      }
    }
    else{
      res.json({ response: 'Account does not exist ', username: "ACCOUNT DOES NOT EXIST" });
    }
  })
  // Process message (e.g., log it)
  // Send back a response
});



app.use(bodyParser.json({limit: '10000kb'}));
app.post('/api/listItem', (req, res) => {
  console.log(req.body)
  
  // Retrieve message from request body
  const { name } = req.body
  const { category } = req.body
  const { condition } = req.body
  const { description } = req.body
  const { price } = req.body
  const { photo } = req.body
  const { user } = req.body
 
  console.log(description)
  listDatabase.insert({name: name, category:category, condition:condition, description:description, price:price, photo:photo, user:user})
  res.json({ response: 'Item Listed' });
  // Process message (e.g., log it)
  // Send back a response
});


app.post('/api/showAllListings', (req, res) => {
  // Retrieve message from request body
  
  
  listDatabase.find({},function(err,output){
    console.log(output)
    res.json({response:  output})
  })
  
  // Process message (e.g., log it)
  // Send back a response
});



app.post('/api/Search', (req, res) => {
  // Retrieve message from request body
  const { searchWord } = req.body
  const { category } = req.body

  if(category == "All Categories"){
  listDatabase.find({},function(err,output){
    last = []
    for (let i = 0; i < output.length; i++) {
      if(output[i]["name"].toLowerCase().includes(searchWord.toLowerCase())){
        last.push(output[i])
      }

      }
    
    res.json({response:  last})
  })
}
else{
  listDatabase.find({category: category},function(err,output){
    last = []
    for (let i = 0; i < output.length; i++) {
      if(output[i]["name"].toLowerCase().includes(searchWord.toLowerCase())){
        last.push(output[i])
      }

      }
    
    res.json({response:  last})
  })
}
  
  // Process message (e.g., log it)
  // Send back a response
});



app.post('/api/showSortedListings', (req, res) => {
  // Retrieve message from request body
  const { type } = req.body

  listDatabase.find({category: type},function(err,output){
    res.json({response:  output})
  })
  
  // Process message (e.g., log it)
  // Send back a response
});

app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});