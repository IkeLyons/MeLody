import React from "react";
import spotifyHelper from "./spotifyHelper.js";

class LoginButton extends React.Component {
  render() {
    return (
      <div>
        <div>
          <div id="login">
            <h1>First, log in to spotify</h1>
            <a href={spotifyHelper}>Log in</a>
          </div>
          <div id="loggedin"></div>
        </div>
      </div>
    );
  }
}

export default LoginButton;
