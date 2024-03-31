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




app.post('/api/listItem', (req, res) => {
  // Retrieve message from request body
  const { nameList } = req.body
  const { description } = req.body
  const { list_of_photos } = req.body
  const { type_of_item } = req.body
  const { userList } = req.body
  const { sell_or_donate } = req.body
  const { organization } = req.body
  
  listDatabase.insert({nameList: nameList, description:description, list_of_photos:list_of_photos, type_of_item:type_of_item, userList:userList, sell_or_donate:sell_or_donate, organization:organization})
  res.json({ response: 'Item Listed' });
  // Process message (e.g., log it)
  // Send back a response
});


app.post('/api/showAllListings', (req, res) => {
  // Retrieve message from request body
  
  
  listDatabase.find({},function(err,output){
    res.json({response:  output})
  })
  
  // Process message (e.g., log it)
  // Send back a response
});



app.post('/api/showSortedListings', (req, res) => {
  // Retrieve message from request body
  const { type } = req.body

  listDatabase.find({type_of_item: type},function(err,output){
    res.json({response:  output})
  })
  
  // Process message (e.g., log it)
  // Send back a response
});

app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});