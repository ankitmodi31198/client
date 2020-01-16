import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Axios from 'axios';
import config from 'react-global-configuration'
import decode from 'jwt-decode'

class GetFoodFromTimeline extends Component {
    constructor(props) {
        super(props)

        this.state = {
            food: null
        }
    }

    componentDidMount() {
        Axios.get(config.get('server_path')+'/food/'+decode(localStorage.getItem('user')).id+'/'+this.props.foodId)
            .then(res => {
                if (res.data.success) {
                    this.setState({food: res.data.food})
                    console.log(this.state.food.name)
                }
            })
            .catch(err => console.log(err))
    }

    render() {
        return(
            <React.Fragment>
                {this.state.food ? 
                    (
                        <React.Fragment>
                            <h1>{this.state.food.name}</h1>
                            <Button onClick={this.props.closeViewFood} >close</Button>
                        </React.Fragment>
                    )
                    :
                    (null)
                }
            </React.Fragment>
        )
    }
}

export default GetFoodFromTimeline