import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import FriendsView from "./FriendsView";
import PlaylistView from "./PlaylistView";
import ProfileView from "./ProfileView";

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <FriendsView />
      <PlaylistView />
      <ProfileView />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
