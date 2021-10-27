var secrets = require("./secrets.json");

const authEndpoint = "https://accounts.spotify.com/authorize";
var client_id = secrets.client_id; // Your client id
var client_secret = secrets.client_secret; // Your secret
var redirect_uri = "http://localhost:3000"; // Your redirect uri

const scopes = ["streaming", "user-read-email", "user-read-private"];
const spotifyHelper = `${authEndpoint}?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scopes.join(
  "%20"
)}`;

export default spotifyHelper;
