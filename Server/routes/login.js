import express from 'express';
import { createRequire } from 'module';
import connectDB from '../DB/connection.js';
import logincollection from '../DB/models/logincollection.js'

const require = createRequire(import.meta.url);
const router = express.Router();
var pass = {
  message: 'OK'
};
var incorrect_user = {
  message: 'User is not registered.'
};
var incorrect_pass = {
  message: 'Incorrect Password Entered.'
};

var error_message = {
  message: 'Request Service Error.'
};


connectDB();


router.get('/api/app/getUsers', (req,res) =>{

  logincollection.find()
  .then((result)=>{
    res.send(result);
  });

});

router.get('/api/app/getUserByName', (req,res) =>{

  logincollection.findOne({user_name:'Mukesh'})
    .then((result)=>{
      console.log(result);
      res.send(result);
    })
    .catch((err) =>{
      console.log(err);
    })
  
  });



router.post('/api/validateLogin', (req, res) => {
  

  if (req.body._username.length === 0) res.status(400).send(error_message);

  var username = req.body._username;
  var userpass = req.body._password;
  var is_Found = false;

  logincollection.findOne({user_name: username})
    .then((result)=>{
      if(result === null){
        res.status(402).send(incorrect_user);
      }
      else{
        logincollection.findOne({user_name: username, password: userpass})
          .then((respass) =>{
            if(respass === null){
              res.status(402).send(incorrect_pass);
            }
            else{
              res.status(200).send(pass);
            }
          })
      }
    })
    .catch((err) =>{
      console.log(err);
    })

});


router.post('/api/signUp/newuser',(req,res)=>{
  var req_data = req.body;
  console.log(req_data);
  if (req_data.name.length === 0) res.status(400).send(error_message);
  
  

  logincollection.findOne({user_name: req_data.name})
    .then((result)=>{
      if(result === null){
        const signup = new logincollection({
          user_name: req_data.name,
          password: req_data.password,
          email: req_data.email
        })

        signup.save()
          .then((data)=>{
            res.status(200).send("Sucessfully added to DB")
          })
          .catch((err)=>{
            res.send(err);
        })

      }
      else{
        res.status(409).send("user is alrealy resgistered!!!");
      }
    })

});

export default router;
