import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import FriendsView from "./FriendsView";
import PlaylistView from "./PlaylistView";
import ProfileView from "./ProfileView";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import Login from "./Login/index.js"
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <div>
      <App/>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
