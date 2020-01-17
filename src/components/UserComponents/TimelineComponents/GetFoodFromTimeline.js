import React, { Component } from 'react';
import config from 'react-global-configuration'
import decode from 'jwt-decode'
import Axios from 'axios';
import { Alert } from 'reactstrap';
import { AiOutlineLike, AiTwotoneLike } from 'react-icons/ai'
import { MdArrowBack } from 'react-icons/md'
import { FaRegHeart, FaHeart } from 'react-icons/fa'

class GetFoodFromTimeline extends Component {

    constructor(props) {
        super(props)

        this.state = {
            food: null,
            foodId: this.props.foodId,
            userId: decode(localStorage.getItem('user')).id,
            liked: null,
            msg: null
        }
    }

    componentDidMount() {
        Axios.get(config.get('server_path')+'/food/getFoodFromTimeline/'+this.state.foodId)
            .then(res => {
                if (res.data.success) {
                    this.setState({food: res.data.food})
                    
                    if (res.data.food.likes.includes(this.state.userId)) {
                        this.setState({liked: true})
                    } else {
                        this.setState({liked: false})
                    }
                }
            })
            .catch(err => console.log(err))        
    }

    likeRecipe = () => {
        Axios.get(config.get('server_path')+'/food/like/'+this.state.foodId+'/'+this.state.userId)
            .then(res => {
                if (res.data.success) {
                    console.log(res.data)
                    this.setState({msg: res.data.msg})
                    this.componentDidMount()
                }
            })
            .catch(err => console.log(err))
    }

    dislikeRecipe = () => {
        Axios.get(config.get('server_path')+'/food/dislike/'+this.state.foodId+'/'+this.state.userId)
            .then(res => {
                if (res.data.success) {
                    console.log(res.data)
                    this.setState({msg: res.data.msg})
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
            {this.state.msg ? (<Alert color="success">{this.state.msg}</Alert>):(null)}
            <h1>{this.state.food.name}</h1>
            {this.activities()}
        </div>;
    }

    activities() {
        return <div>
            {this.state.liked ? 
                (<AiTwotoneLike color="blue" onClick={this.dislikeRecipe} cursor="pointer" fontSize="35"></AiTwotoneLike>)
                :
                (<AiOutlineLike color="grey" onClick={this.likeRecipe} cursor="pointer" fontSize="35"></AiOutlineLike>)
            }
            <FaRegHeart color="grey" cursor="pointer" fontSize="35"></FaRegHeart>
            <FaHeart color="red" cursor="pointer" fontSize="35"></FaHeart>
            <MdArrowBack onClick={this.props.closeViewFood} cursor="pointer" fontSize="35"></MdArrowBack>            
        </div>;
    }
}

export default GetFoodFromTimeline