import React, { Component } from 'react';
import { Switch,Route,BrowserRouter as Router,withRoute} from 'react-router-dom';

import Login from './Login';
import Dashboard from './Dashboard';
import ProfileView from './ProfileView';
import ProtectedRoute from './Components/ProtectedRoute';
import SignUp from './Login/SignUp';
import "./index.css"
import AddPlaylist from './AddPlaylist';
import Logoff from './Components/Logoff';

// The base app contains all the routes for the application, which correspond to different views
class App extends Component {
  render() {
    localStorage.clear();
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/Login" exact component={Login} />
            <Route path='/SignUp' exact component={SignUp} />
            {/* <Route path="/Melody/Dashboard" exact component={Dashboard}/> */}
            <ProtectedRoute path="/Melody/Dashboard" exact component={Dashboard}/> 
            <ProtectedRoute path="/Melody/AddPlaylist" exact component={AddPlaylist}/> 
            <ProtectedRoute path="/Melody/ProfileView" exact component={ProfileView} />
            <ProtectedRoute path="/Logoff" exact component={Logoff} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
