import React from "react";
import spotifyHelper from "./spotifyHelper.js";
import axios from "axios";

const code = new URLSearchParams(window.location.search).get("code");

class LoginButton extends React.Component {
  componentDidMount() {
    if (code) {
      axios
        .post("http://localhost:8888/login", { code: code })
        .then((response) => {
          window.history.pushState({}, null, "/");

          console.log(response.data);
          //setAccessToken(response.data.accessToken);
        })
        .catch(() => {
          window.location = "/";
        });
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
          <p>You are logged in and your code is: {code}</p>
        )}
      </div>
    );
  }
}

export default LoginButton;
