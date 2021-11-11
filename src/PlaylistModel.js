import React from "react";
import User from "./userModelTest"

/* playlist object will hold a string for its name, photo path may be added later,  */
/* song objects list to represent all of the songs in the Playlist, and list of     */
/* users who are also editors on this playlist. Will probably save collaborators    */
/* as each user's specific profile url												*/

class Playlist extends React.Component {
	/* only need string to create the playlist name when constructing */
	constructor(name) {
		super();
		this.name = name;
		this.id = name.replace(/\s/g, '-')
		this.songs = [];
		this.collaborators = [];
		this.imagePath = require("./pictures/foresthills.jpg")
	};

	/* add song object to the list of songs */
	addSong(song) {
		this.songs.push(song);
	};

	/* remove song from the list of songs */
	removeSong(song) {
		let index = this.songs.indexOf(song);
		if (index > -1) {
			this.songs.splice(index, 1);
			console.log("Song removed");
		} else {
			console.log("Song not found");
		}
	};

	// add a user as a collaborator, will keep track of each user using their own unique profile link
	addCollaborator(user) {
		// once db is set up, will do some verification to make sure user exists, for now will just trust that they do
		if (true) {
			this.collaborators.push(user);
		} else {
			console.log("User not found");
		}
	};

	// once again use user's unique profile link to remove them as a collaborator on this playlist
	removeCollaborator(user) {
		let index = this.collaborators.indexOf(user);
		if (index > -1) {
			this.collaborators.splice(index, 1);
			console.log("User removed");
		} else {
			console.log("User not found as editor on this playlist");
		}
	};

	// simple getter for playlist name
	getName() {
		return this.name;
	};

	// this will be how each playlist displays in its own little box on the playlists home screen
	render() {
		const u = [new User("John Adams"), new User("DJ Jazzy J"), new User("John Quincy Adams"), new User("Ye")]
		let userList = u.map((e, index) => {
			return(<li key={index} class="userLI">{e.getInitials()}</li>)
		});
		return (
			<div class="PlaylistContainer">
				<div class="PlaylistContent">
					<img src={this.imagePath.default} alt="Image not found" class="playlistCover"></img>
					<h4>{this.name}</h4>
					<ul class="collaboratorsUL">{userList}</ul>
				</div>
			</div>
		)
	};
}

export default Playlist