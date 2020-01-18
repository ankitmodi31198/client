import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap'

class EditRecipe extends Component {
    state = {
        food: this.props.food
    }
    onNameChange = (e) => {
        this.setState({food: {name: e.target.value}})
    }
    onCategoryChange = (e) => {
        if (e.target.value === 'Vegeterian') {
            console.log('veg')
        } else if (e.target.value === 'Non-Vegeterian') {
            console.log('nonveg')
        }
    }
    render() { 
        return ( 
            <React.Fragment>
                {this.state.food ? 
                    (
                        <React.Fragment>
                            <Form>
                                <FormGroup>
                                    <Label>Name</Label>
                                    <Input type="text" name="name" value={this.state.food.name} onChange={this.onNameChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Category</Label>
                                    <Input type="select" name="category" onChange={this.onCategoryChange}>
                                        <option selected={this.state.food.category.veg} >Vegeterian</option>
                                        <option selected={this.state.food.category.nonVeg} >Non-Vegeterian</option>
                                    </Input>
                                </FormGroup>                                    
                                {(this.state.food.category.special.jain || this.state.food.category.special.swaminarayan || this.state.food.category.special.faradi) ? 
                                    (
                                        <React.Fragment>
                                            <Label>Special Category</Label>
                                            <Input type="select" name="specialCategory" onChange={this.onSpecialCategoryChange}>
                                                <option selected={this.state.food.category.special.jain} >Jain</option>
                                                <option selected={this.state.food.category.special.swaminarayan}>Swaminarayan</option>
                                                <option selected={this.state.food.category.special.faradi}>Faradi</option>
                                            </Input>                                            
                                        </React.Fragment>
                                    )
                                    :
                                    (null)
                                }
                            </Form>
                        </React.Fragment>
                    )
                    :
                    (null)
                }
            </React.Fragment>
        );
    }
}
 
export default EditRecipe;