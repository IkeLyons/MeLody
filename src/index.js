import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import FriendsView from "./FriendsView";
import PlaylistView from "./PlaylistView";
import ProfileView from "./ProfileView";
import LoginButton from "./LoginButton";

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <LoginButton />
      <FriendsView />
      <PlaylistView />
      <ProfileView />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
