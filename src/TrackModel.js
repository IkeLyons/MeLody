import React from "./react"

/* relatively simple class, but better to hold song info in a preset object than just a regular object */

class Track extends React.Component {
	constructor(title, artist, album, imgPath) {
		super();
		this.title = title;
		this.artist = artist;
		this.album = album;
		this.imagePath = imgPath;
	}
}