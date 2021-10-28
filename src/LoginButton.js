import React from "react";
import spotifyHelper from "./spotifyHelper.js";

const code = new URLSearchParams(window.location.search).get("code");

class LoginButton extends React.Component {
  componentDidMount() {
    if (code) {
      window.history.pushState({}, null, "/");
    }
  }

  render() {
    return (
      <div>
        {!code ? (
          <div>
            <div id="login">
              <h1>First, log in to spotify</h1>
              <a href={spotifyHelper}>Log in</a>
            </div>
            <div id="loggedin"></div>
          </div>
        ) : (
          <p>{code}</p>
        )}
      </div>
    );
  }
}

export default LoginButton;
