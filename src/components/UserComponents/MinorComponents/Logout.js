import React, { Component } from 'react';

class Logout extends Component {
    state = {
        logout: false
    }
    componentDidMount() {
        localStorage.removeItem('user')
        this.setState({logout: true})
    }
    render() { 
        return (
            <React.Fragment>
                {this.state.logout? (window.location.href="/") : (null)}
            </React.Fragment>
        );
    }
}
 
export default Logout;