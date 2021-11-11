import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router, withRouter } from 'react-router-dom';

import Login from './Login'
import Dashboard from './Dashboard'
import ProfileView from './ProfileView'
import ProtectedRoute from './Components/ProtectedRoute';
// import sidebar from './Dashboard/components/sidebar';


class App extends Component {
    
    render() {
        localStorage.clear();
        return (
            <Router>
                <div className='App'>
                    <Switch>
                        <Route path='/Login' exact component={Login} />
                        <ProtectedRoute path='/Melody/Dashboard' exact component={Dashboard} />
                        {/* <Route path='/Melody/Dashboard' exact component={Dashboard} /> */}
                        {/* <Route path='/Melody/ProfileView' exact component={ProfileView} /> */}
                    </Switch>
                </div>

            </Router>
        )
    }
}
export default App;