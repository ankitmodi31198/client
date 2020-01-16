import React, { Component } from 'react';
import Axios from 'axios';
import config from 'react-global-configuration'
import decode from 'jwt-decode'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, Input, Label } from 'reactstrap'
import EditRecipe from './GetMyRecipeComponents/EditRecipe';

class GetMyRecipe extends Component {
    state = {
        food: null,
        editPage: false,
        modal: false,
        deleteDefinedText: '',
        deleteText: ''
    }
    componentDidMount() {
        Axios.get(config.get('server_path')+'/food/'+decode(localStorage.getItem('user')).id+'/'+this.props.foodId)
            .then(res => {                
                if (res.data.success) {
                    this.setState({food: res.data.food})
                    
                }
            })
            .catch(err => console.log(err))
        this.setState({deleteDefinedText: Math.random().toString(36).substring(7).toUpperCase()})
    }
    editClicked = () => {
        this.setState({editPage: true})
    }
    editUnClicked = () => {
        this.setState({editPage: false})
        this.componentDidMount()
    }
    deleteClicked = () => {
        this.toggle()
    }
    toggle = () => {
        this.setState({modal: !this.state.modal})
    }
    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }
    confirmDelete = () => {
        const data = {
            userId: decode(localStorage.getItem('user')).id,
            foodId: this.state.food._id
        }
        Axios.post(config.get('server_path')+'/food/delete', data)
            .then(res => {
                if (res.data.success) {
                    this.props.closeFoodPage()
                }
            })
            .catch(err => console.log(err))
    }
    render() {        
        return (
            <React.Fragment>
                {!this.state.editPage && this.state.food ? 
                    (                        
                        <React.Fragment>
                            <h2>{this.state.food.name}</h2>
                            <h6>- {this.state.food.cusine.name} ({this.state.food.category.veg ? 'pure veg' : 'pure non-veg'} {this.getFoodSpecialCategory()})</h6>
                            <hr/>
                            <h6>Ingredients:</h6>
                            <ol>
                            {this.state.food.ingredients.map((i, key) => 
                                (
                                        <li key={key}>{i.ing.name} <i>{i.quantity} {i.unit}</i></li>
                                    
                                )    
                            )}
                            </ol>
                            {this.state.food.servings ? (<b>Servings: {this.state.food.servings}</b>) : (null)}
                            <h5>Steps: </h5>
                            <ol>
                                {this.state.food.recipe.step ? 
                                    (
                                        <React.Fragment>
                                            {this.state.food.recipe.step.map((s, key1) => 
                                                (
                                                    <li key={key1}> {s.description}</li>
                                                )
                                            )}
                                        </React.Fragment>
                                    ):(null)
                                }
                            </ol>
                            <Button className="btn btn-primary btn-sm" onClick={this.editClicked} >Edit</Button>
                            <Button className="btn btn-danger btn-sm" onClick={this.deleteClicked} >Delete</Button>
                            <Button onClick={this.props.closeFoodPage} className="btn btn-primary btn-sm" >back</Button>
                            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                <ModalHeader toggle={this.toggle}>Are you sure, you want to delete '{this.state.food.name}'?</ModalHeader>
                                <ModalBody>
                                    You need to write the following text do proceed further...
                                    <br/>
                                    <Label>{this.state.deleteDefinedText}</Label>
                                    <FormGroup>
                                        <Input type="text" onChange={this.onChange} name="deleteText"></Input>
                                    </FormGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.confirmDelete} disabled={(this.state.deleteDefinedText !== this.state.deleteText)}>Done</Button>{' '}
                                </ModalFooter>
                            </Modal>
                        </React.Fragment>
                    ) 
                    : 
                    (<EditRecipe food={this.state.food} editUnClicked={this.editUnClicked} />)
                }
            </React.Fragment>
        );
    }

    getFoodSpecialCategory() {
        return <span>{this.state.food.category.special.Jain ? ('| Jain') : (this.state.food.category.special.swaminarayan ? ('| Swaminarayan') : (this.state.food.category.special.faradi ? ('| Faradi') : (null)))}</span>;
    }
}
 
export default GetMyRecipe;