import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class Home extends Component {
    state = {
        userAuthenticate: false
    }
    componentDidMount() {
        if (localStorage.getItem('user')) {
            this.setState({userAuthenticate: true})
        }
    }
    render() { 
        return (            
            <div>
                <h1 className="h1">Welcome to Comfy Cook!</h1>
                {this.state.userAuthenticate? (<Redirect to="/user/profile" />) : (null)}
            </div>
        );
    }
}
 
export default Home;