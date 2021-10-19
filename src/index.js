import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import FriendsView from "./FriendsView";
import PlaylistView from "./PlaylistView";
import ProfileView from "./ProfileView";

ReactDOM.render(
  <React.StrictMode>
    <FriendsView />
    <PlaylistView />
    <ProfileView />
  </React.StrictMode>,
  document.getElementById("root")
);
