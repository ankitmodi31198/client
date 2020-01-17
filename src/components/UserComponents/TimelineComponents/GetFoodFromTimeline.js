import React, { Component } from 'react';
import config from 'react-global-configuration'
import decode from 'jwt-decode'
import Axios from 'axios';
import { Button } from 'reactstrap';

class GetFoodFromTimeline extends Component {

    constructor(props) {
        super(props)

        this.state = {
            food: null,
            foodId: this.props.foodId,
            userId: decode(localStorage.getItem('user')).id
        }
    }

    componentDidMount() {
        Axios.get(config.get('server_path')+'/food/getFoodFromTimeline/'+this.state.foodId)
            .then(res => {
                if (res.data.success) {
                    this.setState({food: res.data.food})
                }
            })
            .catch(err => console.log(err))        
    }

    likeRecipe = () => {
        Axios.get(config.get('server_path')+'/food/like/'+this.state.foodId+'/'+this.state.userId)
            .then(res => {
                if (res.data.success) {
                    console.log(res.data)
                    this.componentDidMount()
                }
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <React.Fragment>
                {this.state.food ? 
                    (
                        this.foodView()
                    )
                    :
                    (null)
                }
            </React.Fragment>
        )
    }

    foodView() {
        return <div className="container">
            <h1>{this.state.food.name}</h1>
            {this.activities()}
        </div>;
    }

    activities() {
        return <div>
            <Button onClick={this.likeRecipe}>Like</Button>
        </div>;
    }
}

export default GetFoodFromTimeline