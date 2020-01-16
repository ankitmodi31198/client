import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from './GeneralComponents/Home'
import Login from './GeneralComponents/Login'
import Register from './GeneralComponents/Register'
import Profile from './UserComponents/Profile';
import Loader from './UserComponents/MinorComponents/Loader';
import Logout from './UserComponents/MinorComponents/Logout';
import MyRecipes from './UserComponents/MyRecipes';
import Timeline from './UserComponents/Timeline';

class MyRoutes extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/user/profile" component={Profile} />
                    <Route path="/user/myrecipes" component={MyRecipes} />                    
                    <Route path="/loader" component={Loader} />
                    <Route path="/user/timeline" component={Timeline} />
                    <Route path="/logout" component={Logout} />
                </Switch>
            </React.Fragment>
        );
    }
}
 
export default MyRoutes;