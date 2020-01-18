import React, { Component } from 'react'
import Axios from 'axios'
import {Redirect} from 'react-router-dom'
import config from 'react-global-configuration'
import {Jumbotron, Button} from 'reactstrap'

import GetFoodFromTimeline from './TimelineComponents/GetFoodFromTimeline'

class Timeline extends Component {

    constructor(props) {
        super(props)
        this.state = {
            authenticate: true,
            foods: [],
            foodId: '',
            viewFoodFromTimeline: false
        }
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

    viewFood = (e) => {
        this.setState({foodId: e.target.value, viewFoodFromTimeline: true})
    }

    closeViewFood = () => {
        this.setState({viewFoodFromTimeline: false})
    }

    render() {
        return(
            <React.Fragment>
                {this.state.viewFoodFromTimeline ? 
                    (<GetFoodFromTimeline foodId={this.state.foodId} closeViewFood={this.closeViewFood} />)
                    :
                    (
                        <React.Fragment>
                            {this.getAllFoodInTimeline()}
                        </React.Fragment>
                    )
                }
            </React.Fragment>
        )
    }

    getAllFoodInTimeline() {
        return <div>
            {this.state.foods.map((f, key) => <div key={key} className="container">
                <Jumbotron>
                    <h1 className="display-6">{f.name}</h1>
                    <p className="lead">{f.user.details.name}</p>
                    <hr className="my-2" />
                    <p>{f.cusine.name}</p>
                    <p className="lead">
                        <Button onClick={this.viewFood} value={f._id}>View</Button>
                    </p>
                </Jumbotron>
            </div>)}
            {this.conditionalRedirects()}
        </div>
    }

    conditionalRedirects() {
        return <div>
            {this.state.authenticate ? null : (<Redirect to="/login" />)}
        </div>;
    }
}

export default Timeline