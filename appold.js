var express = require("express"); // Express web server framework
var request = require("request"); // "Request" library
var cors = require("cors");
var querystring = require("querystring");
var secrets = require("./secrets.json");
var spotifyWebApi = require("spotify-web-api-node");

var client_id = secrets.client_id;
var client_secret = secrets.client_secret;
var redirect_uri = "http://localhost:3000";
var credentials = {
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri,
};

var app = express();
app.use(cors());

app.post("/login", (req, res) => {
  console.log(req.data);
  // let spotifyApi = new spotifyWebApi(credentials);
  // const code = req.body.code;

  // spotifyApi
  //   .authorizationCodeGrant(code)
  //   .then((data) => {
  //     res.json({
  //       accessToken: data.body.access_token,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.sendStatus(400);
  //   });
  // console.log(accessToken);
});

console.log("Listening on 8888");
app.listen(8888);
