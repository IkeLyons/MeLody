import express from 'express';
import { createRequire } from 'module';
import spotifyWebApi from 'spotify-web-api-node';

const router = express.Router();

const require = createRequire(import.meta.url);
const secrets = require('../secrets.json');
var client_id = secrets.client_id;
var client_secret = secrets.client_secret;
var redirect_uri = 'http://localhost:3000';
var credentials = {
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri
};

let user_data = {
  users: [
    {
      user_name: 'Mukesh',
      password: 'Test123'
    },
    {
      user_name: 'Ike',
      password: 'Test123'
    }
  ]
};

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

  var user_name = req.body._username;
  var user_pass = req.body._password;
  var is_Found = false;

  user_data.users.forEach((element) => {
    console.log(element.user_name);
    if (user_name === element.user_name) {
      is_Found = true;
      if (user_pass === element.password) {
        res.status(200).send(pass);
      } else {
        res.status(401).send(incorrect_pass);
      }
    }
  });

  if (!is_Found) {
    res.status(402).send(incorrect_user);
  }
});

router.post('/api/spotifylogin', (req, res) => {
  console.log(req.data);
  let spotifyApi = new spotifyWebApi(credentials);
  const code = req.body.code;

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
  console.log(accessToken);
});

export default router;
