import React, {Component} from "react";
import ReactDOM from "react-dom"
import {BrowserRouter, Link, Route, Routes} from "react-router-dom"
import Playlist from "./PlaylistModel"
import styles from "./PlaylistStyles.css"


class PlaylistView extends React.Component {
  render() {
  	/* dummy data here for now until have real data to show */
  	let s = new Playlist("Playlist 5");
  	s.addSong("Fuck my shit up");
  	console.log(s.getName());
  	const p = [new Playlist("Playlist 1"), new Playlist("Playlist 2"), new Playlist("Playlist 3"), new Playlist("Playlist 4"), s];
  	let pItems = p.map((e, index) =>{
  		return(<li key={index} class="playlistLI"><a href='/playlists/:id'>{e.render()}</a></li>)
  	});

    return (

    	<div className = "PlaylistSpan">
    	<BrowserRouter>
    		{p.map(playlist => (<Link to={"playlists/" + playlist.id} />))}
    		<Routes>
    			<Route path="playlists/:id" component={Playlist} />
    		</Routes>
    	</BrowserRouter>
    	<span class="topBar">
    		<h1>My playlists</h1>
    		<button class="addPlaylistButton">+</button>
    	</span>
    		<div class="topBarPlaylists">
    			<input type="text" placeholder="🔍	Search..."></input>
    			<button class="button">Friends▼</button>
    		</div>
    		<div class="listPlaylists">
    			<ul id="playlists">{pItems}</ul>    			
    		</div>
    	</div>
    );
  }
}

export default PlaylistView;
