import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css'

import GeneralNavbar from './components/GeneralComponents/GeneralNavbar'
import MyRoutes from './components/MyRoutes'
import UserNavbar from './components/UserComponents/UserNavbar';

class App extends Component {  
  render() { 
    return (
      <Router>    
      <div>
        {localStorage.getItem('user') ? (<UserNavbar/>) : (<GeneralNavbar />)}              
        <MyRoutes /> 
      </div>
      </Router>
    );
  }  
}
 
export default App;