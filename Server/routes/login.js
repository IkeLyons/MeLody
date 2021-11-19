import express from 'express';
import { createRequire } from 'module';
import connectDB from '../DB/connection.js';
import LoginCollection from '../DB/models/logincollection.js';

const require = createRequire(import.meta.url);
const router = express.Router();

connectDB();

router.get('/api/app/getUsers', (req, res) => {
  LoginCollection.find().then((result) => {
    res.send(result);
  });
});

router.get('/api/app/getUserByName', (req, res) => {
  LoginCollection.findOne({ user_name: 'Mukesh' })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/api/validateLogin', (req, res) => {
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

  if (req.body._username.length === 0) res.status(400).send(error_message);

  var username = req.body._username;
  var userpass = req.body._password;
  var is_Found = false;

  LoginCollection.findOne({ user_name: username })
    .then((result) => {
      if (result === null) {
        res.status(402).send(incorrect_user);
      } else {
        LoginCollection.findOne({
          user_name: username,
          password: userpass
        }).then((respass) => {
          if (respass === null) {
            res.status(402).send(incorrect_pass);
          } else {
            res.status(200).send(pass);
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });

  // user_data.users.forEach((element) => {
  //   console.log(element.user_name);
  //   if (user_name === element.user_name) {
  //     is_Found = true;
  //     if (user_pass === element.password) {
  //       res.status(200).send(pass);
  //     } else {
  //       res.status(401).send(incorrect_pass);
  //     }
  //   }
  // });

  // if (!is_Found) {
  //   res.status(402).send(incorrect_user);
  // }
});

export default router;
