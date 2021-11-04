import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import FriendsView from "./FriendsView";
import PlaylistView from "./PlaylistView";
import ProfileView from "./ProfileView";

ReactDOM.render(
  <React.StrictMode>
    <grid-container>
    	<grid-item>	<FriendsView /> </grid-item>  
      	
      	<grid-item> <PlaylistView /> </grid-item>
      	
      	<grid-item> <ProfileView /> </grid-item>
    </grid-container>
  </React.StrictMode>,
  document.getElementById("root")
);
