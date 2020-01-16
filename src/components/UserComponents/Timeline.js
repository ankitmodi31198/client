import React, { Component } from 'react'
import Axios from 'axios'
import config from 'react-global-configuration'

class Timeline extends Component {

    state = {
        authenticate: true,
        foods: []
    }

    componentDidMount() {
        if (!localStorage.user) {
            this.setState({authenticate: false})
        } else {
            Axios.get(config.get('server_path')+'/food/')
                .then(res => {
                    if (res.data.success) {
                        this.setState({foods: res.data.foods})
                        console.log(res.data.foods)
                    }
                })
                .catch(error => {console.log(error)})
        }
    }

    render() {
        return(
            <React.Fragment>
                {this.state.foods.map((f, key) => 
                    <div key={key}>
                        <p>{f.name}</p>
                    </div>
                )}
            </React.Fragment>
        )
    }
}

export default Timeline