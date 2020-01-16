import React, { Component } from 'react';
import { Button } from 'reactstrap'
import Axios from 'axios';
import config from 'react-global-configuration'
import decode from 'jwt-decode'
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap'
import GetMyRecipe from './GetMyRecipesComponents/GetMyRecipe';

class GetMyRecipes extends Component {
    state = {
        foods: [],
        foodId: '',
        viewFoodPage: false
    }
    componentDidMount() {
        Axios.get(config.get('server_path')+'/food/'+decode(localStorage.getItem('user')).id)
            .then(res => {
                if (res.data.success) {
                    this.setState({foods: res.data.foods})
                }
            })
    }
    viewFood = (e) => {
        this.setState({foodId: e.target.value, viewFoodPage: true})
    }
    closeFoodPage = () => {
        this.setState({foodId: '', viewFoodPage: false}, () => {
            this.componentDidMount()
        })        
    }
    render() { 
        return (
            <React.Fragment>
                <div className="container">                                       
                    {this.state.viewFoodPage ? 
                        (<GetMyRecipe foodId={this.state.foodId} closeFoodPage={this.closeFoodPage} />)
                        :
                        (<div>{this.GetAllFoods()}</div>)
                    }
                </div>                
            </React.Fragment>
        );
    }

    GetAllFoods() {
        return <div>
            <center><h3>Your Recipes</h3></center>
            <Row>
                {this.state.foods.length !== 0 ? 
                    (
                        <React.Fragment>
                            {this.state.foods.map((f, key) => <Col md="6">
                                <Card body outline color="secondary">
                                    <CardTitle>{f.name}</CardTitle>
                                    <CardText>{f.user.details.name}</CardText>
                                    <Button onClick={this.viewFood} value={f._id}>View</Button>
                                </Card>
                            </Col>)}
                        </React.Fragment>
                    )
                    :
                    (<p>You have no food uploaded.</p>)
                }
            </Row>
            <Button onClick={this.props.makeNewRecipe} className="btn btn-success btn-lg mt-5">Add New</Button>
        </div>;
    }
}
 
export default GetMyRecipes;