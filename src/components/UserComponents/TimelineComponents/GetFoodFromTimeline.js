import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Axios from 'axios';
import config from 'react-global-configuration'
import decode from 'jwt-decode'

class GetFoodFromTimeline extends Component {
    constructor(props) {
        super(props)

        this.state = {
            food: null,
            userId: decode(localStorage.getItem('user'))._id,
            liked: null,
            unliked: null
        }
    }

    componentDidMount() {
        Axios.get(config.get('server_path')+'/food/'+this.props.foodId)
            .then(res => {
                if (res.data.success) {
                    this.setState({food: res.data.food})
                    console.log(this.state.food.name)
                }
            })
            .catch(err => console.log(err))
    }

    likeFood = () => {
        console.log('like clicked ' + this.props.foodId)
        Axios.get(config.get('server_path')+'/food/like/'+this.props.foodId+'/'+decode(localStorage.getItem('user')).id)
            .then(res => {
                console.log(res.data.success+' liked...')
            })
            .catch(err => console.log(err))
    }
    unlikeFood = () => {
        Axios.get(config.get('server_path')+'/food/unlike/'+this.props.foodId+'/'+decode(localStorage.getItem('user'))._id)
            .then(res => {
                console.log(res.data.success+' unliked...')
            })
            .catch(err => console.log(err))
    }
    render() {
        return(
            <React.Fragment>
                <div className="container">
                    {this.state.food ? 
                        (
                            <React.Fragment>
                                {this.foodRecipe()}
                                {this.activities()}
                                {this.buttons()}                                                           
                            </React.Fragment>
                        )
                        :
                        (null)
                    }
                </div>
            </React.Fragment>
        )
    }

    activities() {
        return <div>
            {this.state.food.likes.map((l, key) => <div key={key}>
                {(decode(localStorage.getItem('user')).id === l.user) ? 
                    (this.setState({liked: true, unliked: false}))
                    :
                    (this.setState({unliked: true, liked: false}))
                }
            </div>)}
            {this.state.liked ? 
                (<Button onClick={this.unlikeFood} className="btn btn-success btn-sm" >unlike</Button>)
                :
                (<Button onClick={this.likeFood} className="btn btn-success btn-sm" >like</Button>            )
            }            
        </div>
    }

    buttons() {
        return <div>
            <Button onClick={this.props.closeViewFood}>Close</Button>
        </div>
    }

    foodRecipe() {
        return <div className="foodRecipe">
            <h2>{this.state.food.name}</h2>
            <h6>- {this.state.food.cusine.name} ({this.state.food.category.veg ? 'pure veg' : 'pure non-veg'} {this.getFoodSpecialCategory()})</h6>
            <hr />
            <h6>Ingredients:</h6>
            <ol>
                {this.state.food.ingredients.map((i, key) => (<li key={key}>{i.ing.name} <i>{i.quantity} {i.unit}</i></li>))}
            </ol>
            {this.state.food.servings ? (<b>Servings: {this.state.food.servings}</b>) : (null)}
            <h5>Steps: </h5>
            <ol>
                {this.state.food.recipe.step ?
                    (<React.Fragment>
                        {this.state.food.recipe.step.map((s, key1) => (<li key={key1}> {s.description}</li>))}
                    </React.Fragment>) : (null)}
            </ol>
        </div>;
    }

    getFoodSpecialCategory() {
        return <span>{this.state.food.category.special.Jain ? ('| Jain') : (this.state.food.category.special.swaminarayan ? ('| Swaminarayan') : (this.state.food.category.special.faradi ? ('| Faradi') : (null)))}</span>;
    }
}

export default GetFoodFromTimeline