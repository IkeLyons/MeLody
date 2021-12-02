# MeLody

MeLody is an interface for Spotify and Apple Music Listeners to create shared playlists and collaboratively listen to music!

## Installation

For both the frontend (Client folder) and the backend (Server folder) you are going to need to run `npm init` and `npm start`

`npm init` should install all required packages, then `npm start` runs the respective server.

For the backend you are also going to need to setup a MongoDB by first installing MongoDB. Then you can run `mongosh "mongodb+srv://melodycluster.cgcsn.mongodb.net/MelodyDB"`

Additionally the server requires API codes for Spotify. These should be contained in a file called secrets.json and be placed in the Server folder. For obvious reasons the unique API code used by the team cannot be published to GitHub.
