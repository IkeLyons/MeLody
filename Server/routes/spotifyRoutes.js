import { createRequire } from 'module';
import spotifyWebApi from 'spotify-web-api-node';
import express from 'express';

const router = express.Router();

const require = createRequire(import.meta.url);
const secrets = require('../secrets.json');
var client_id = secrets.client_id;
var client_secret = secrets.client_secret;
var redirect_uri = 'http://localhost:4000/api/callback';
var credentials = {
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri
};
const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'app-remote-control',
  'user-read-email',
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
  'user-library-modify',
  'user-library-read',
  'user-top-read',
  'user-read-playback-position',
  'user-read-recently-played',
  'user-follow-read',
  'user-follow-modify'
];
const spotifyApi = new spotifyWebApi(credentials);

// Send user to Spotify authorization page
router.get('/api/spotifyLogin', (req, res) => {
  console.log('Spotify Login');
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

//use code recieved from spotify to get access token
router.get('/api/callback', (req, res) => {
  const error = req.query.error;
  const code = req.query.code;

  if (error) {
    console.error('Callback Error:', error);
    res.send(`Callback Error: ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      const access_token = data.body['access_token'];
      const refresh_token = data.body['refresh_token'];
      const expires_in = data.body['expires_in'];
      console.log('This code expires in:' + expires_in);

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      console.log('access_token:', access_token);
      console.log('refresh_token:', refresh_token);

      console.log(
        `Sucessfully retreived access token. Expires in ${expires_in} s.`
      );
      //send user back to front end
      res.redirect('http://localhost:3000/Melody/Dashboard');

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body['access_token'];

        console.log('The access token has been refreshed!');
        console.log('access_token:', access_token);
        spotifyApi.setAccessToken(access_token);
      }, (expires_in / 2) * 1000);
    })
    .catch((error) => {
      console.error('Error getting Tokens:', error);
      res.send(`Error getting Tokens: ${error}`);
    });
});

//First get the client access token to be able to search for songs
spotifyApi
  .clientCredentialsGrant()
  .then(function (result) {
    console.log('Access token is: ' + result.body.access_token);
    spotifyApi.setAccessToken(result.body.access_token);
  })
  .catch(function (err) {
    console.log(err);
  });

router.post('/api/song', (req, res) => {
  console.log('Search for song');
  spotifyApi
    .searchTracks(req.body.song)
    .then(function (data) {
      // Print some information about the results
      console.log('I got ' + data.body.tracks.total + ' results!');

      // Go through the first page of results
      var firstPage = data.body.tracks.items;
      console.log(
        'The tracks in the first page are (popularity in parentheses):'
      );

      firstPage.forEach(function (track, index) {
        console.log(index + ': ' + track.name + ' (' + track.popularity + ')');
      });
      res.status(200).send({ message: data.body.tracks.items });
    })
    .catch(function (err) {
      console.log('Something went wrong:', err.message);
    });
});

export default router;
