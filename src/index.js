import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import FriendsView from "./FriendsView";
import PlaylistView from "./PlaylistView";
import ProfileView from "./ProfileView";

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <div>
        <div>
          <div id="login">
            <h1>First, log in to spotify</h1>
            <a href="/login">Log in</a>
          </div>
          <div id="loggedin"></div>
        </div>
      </div>
      <FriendsView />
      <PlaylistView />
      <ProfileView />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
