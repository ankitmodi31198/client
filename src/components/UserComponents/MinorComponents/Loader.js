import React, { Component } from 'react';

class Loader extends Component {
    state = {  }
    render() { 
        setTimeout(function() {
            window.location.href = '/user/profile'
        },1500);
        return (
            <React.Fragment>
                <center><img src='https://media.giphy.com/media/prA6olJdnIDKg/giphy.gif' alt={'loading...'} /></center>                
            </React.Fragment>
        );
    }
}
 
export default Loader;