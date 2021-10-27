var express = require("express"); // Express web server framework
var request = require("request"); // "Request" library
var cors = require("cors");
var querystring = require("querystring");

var client_id = secrets.client_id; // Your client id
var client_secret = secrets.client_secret; // Your secret
var redirect_uri = "http://localhost:3000"; // Your redirect uri

var app = express();
app.use(cors());

app.get("/login", function (req, res) {
  console.log("/login");

  // your application requests authorization
  var scope = "user-read-private user-read-email";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
      })
  );
});

console.log("Listening on 8888");
app.listen(8888);
