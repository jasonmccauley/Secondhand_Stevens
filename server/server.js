const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json({limit:1024*1024*20, type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true,limit:1024*1024*20,type:'application/x-www-form-urlencoding' }));


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





var fs = require('fs');


const listDatabase = new Datastore("list.db")
listDatabase.loadDatabase();

// Route to handle button press request
app.post('/api/createAccount', (req, res) => {
  // Retrieve message from request body
  const { username } = req.body;
  const { password } = req.body
  const { email } = req.body
  database.find({email:email},function(err,output){
    
    if(output.length > 0){
      res.json({ response: 'Account already exist',  username:" FAILED LOGIN!! "});
    }
    else{
      fs.mkdirSync("accounts/" + username);
      database.insert({username: username, password:password, email:email})
      res.json({ response: 'Account Created', username:username, email:email});
    }
  })
  // Process message (e.g., log it)
  
  // Send back a response
});


// Route to handle button press request
app.post('/api/getMessages', (req, res) => {
  // Retrieve message from request body
  const { user } = req.body;
  const { email } = req.body
  const d = new Date();
 
  
  try{
    
      const databaseFrom = new Datastore("accounts/" + email + "/mes.db")
      databaseFrom.loadDatabase();
      databaseFrom.find({},function(err,output){
        res.json({ response: "Message Sent", info:output});
      })
  }
  catch{
    res.json({response: "File does not exist"})
  }
  
  // Process message (e.g., log it)
  
  // Send back a response
});

// Route to handle button press request
app.post('/api/sendMessage', (req, res) => {
  // Retrieve message from request body
  const { user } = req.body;
  const { rec } = req.body
  const { email } = req.body
  const { mes } = req.body
  const d = new Date();

  database.find({username:rec},function(err,output){
    if(output.length > 0){
      const databaseRec = new Datastore("accounts/" + output[0]["email"] + "/mes.db")
      databaseRec.loadDatabase();
      databaseRec.insert({sortBy:d.getTime(), mes: mes, from:user, to:rec, time:d})

      const databaseFrom = new Datastore("accounts/" + email + "/mes.db")
      databaseFrom.loadDatabase();
      databaseFrom.insert({sortBy:d.getTime(), mes: mes, from:user, to:rec, time:d})
      databaseFrom.find({},function(err,output){
        res.json({ response: "Message Sent", info:output});
      })
      
    }
    else{
      res.json({ response: 'User Not Found'});
    }
  })
  // Process message (e.g., log it)
  
  // Send back a response
});


// Route to handle button press request
app.post('/api/getOrders', (req, res) => {
  // Retrieve message from request body

  const { username } = req.body;
  const { password } = req.body
  const { email } = req.body
  database.find({email:email},function(err,output){

    if(output.length > 0){
      res.json({ response: 'Account already exist',  username:" FAILED LOGIN!! "});
    }
    else{
      database.insert({username: username, password:password, email:email})
      res.json({ response: 'Account Created', username:username });
    }
  })
  // Process message (e.g., log it)

  // Send back a response
});




app.use(function(req, res, next) {

 
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});





app.post('/api/logIn', (req, res) => {
  // Retrieve message from request body

  const { email } = req.body
  const { password } = req.body
  database.find({email:email},function(err,output){

    if(output.length > 0){
      if(output[0]["password"] == password){
      res.json({ response: 'Successfully logged In',  username:output[0]["username"], email:output[0]["email"]});
      }
      else{
        res.json({ response: 'Wrong Password', username: "WRONG PASSWORD", email:"None"});
      }
    }
    else{
      res.json({ response: 'Account does not exist ', username: "ACCOUNT DOES NOT EXIST", email:"None" });
    }
  })
  // Process message (e.g., log it)
  // Send back a response
});



app.use(bodyParser.json({ limit: '100mb' }));
app.post('/api/listItem', (req, res) => {

  
  // Retrieve message from request body
  const { name } = req.body
  const { category } = req.body
  const { condition } = req.body
  const { description } = req.body
  const { price } = req.body
  const { photo } = req.body
  const { user } = req.body
  const { email } = req.body
 
  
  listDatabase.insert({name: name, category:category, condition:condition, description:description, price:price, photo:photo, user:user, email:email})
  res.json({ response: 'Item Listed' });
  // Process message (e.g., log it)
  // Send back a response
});


app.post('/api/buyItem', (req, res) => {
  // Retrieve message from request body
  
  const {_id} = req.body
  const {buyer} = req.body
  
  var found = false;

  var d = new Date()
  listDatabase.find({_id:_id},function(err,output){
  
    
    
    var email = output[0]["email"]
    const databaseSell = new Datastore("accounts/" + email + "/sell.db")
    databaseSell.loadDatabase();
    databaseSell.insert(output[0])



    const itemName = output[0]["name"]
    const amount = output[0]["price"]
    
    database.find({email:email},function(err,output){
      console.log("FOUND OUTPUT")
      console.log(output)
      name = output[0]["username"]
      const databaseRec = new Datastore("accounts/" + email + "/mes.db")
      databaseRec.loadDatabase();
      databaseRec.insert({sortBy:d.getTime(), mes: "Your " + itemName + " was Purchased by" + buyerName + ". The amount of " + amount + "$ will be deposited within 3-5 buisness days", from:"Second Hand Stevens", to:name, time:d})

    })

    var buyerName = ""
    database.find({email:buyer},function(err,output){
      buyerName = output[0]["username"]      
    const databaseBuy = new Datastore("accounts/" + buyer + "/mes.db")
    databaseBuy.loadDatabase();
    databaseBuy.insert({sortBy:d.getTime(), mes:"Purchase Confirmation for the " + itemName + ". Your account will be charged " + amount + "$. If you think this is an error, please contact support at secondhand@stevens.edu", from:"Second Hand Stevens", to:buyerName, time:d})

    })
    
    
    const databaseBuyer = new Datastore("accounts/" + buyer + "/buy.db")
    databaseBuyer.loadDatabase();
    databaseBuyer.insert(output[0])
    
    })


  


  listDatabase.remove({_id:_id}, {_id:_id}, function(err, numRemoved) { database.persistence.compactDatafile(); });

  

  listDatabase.persistence.compactDatafile();
  res.json({response:  "Okay!"})
  

  

});

  


app.post('/api/showAllListings', (req, res) => {
  // Retrieve message from request body
  const {user} = req.body
  
  listDatabase.find({user:{$ne: user}},function(err,output){
    res.json({response:  output})
  })
  // Process message (e.g., log it)
  // Send back a response
});


app.post('/api/showHistoryBuy', (req, res) => {
  // Retrieve message from request body
  
  const {email} = req.body
  const databaseSell = new Datastore("accounts/" + email + "/buy.db")
  databaseSell.loadDatabase();

  databaseSell.find({},function(err,output){
    res.json({response:  output})
  })
  // Process message (e.g., log it)
  // Send back a response
});

app.post('/api/showHistorySell', (req, res) => {
  // Retrieve message from request body
  
  const {email} = req.body
  const databaseSell = new Datastore("accounts/" + email + "/sell.db")
  databaseSell.loadDatabase();

  databaseSell.find({},function(err,output){
    res.json({response:  output})
  })
  // Process message (e.g., log it)
  // Send back a response
});


app.post('/api/showItem', (req, res) => {
  // Retrieve message from request body
  
  const {_id} = req.body
  listDatabase.find({_id: _id},function(err,output){
    res.json({response:  output[0]})
  })
  // Process message (e.g., log it)
  // Send back a response
});


app.post('/api/Search', (req, res) => {
  // Retrieve message from request body
  const { searchWord } = req.body
  const { category } = req.body
  const { user } = req.body
 
  if(category == "All Categories"){
  listDatabase.find({name:{$ne: user}},function(err,output){

    last = []
    for (let i = 0; i < output.length; i++) {
      if(output[i]["name"].toLowerCase().includes(searchWord.toLowerCase()) && output[i]["user"] != user){
        last.push(output[i])
      }
      }
    res.json({response:  last})
  })
}
else{
  listDatabase.find({category: category, name:{$ne: user}},function(err,output){
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



// Fixing "413 Request Entity Too Large" errors


app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});