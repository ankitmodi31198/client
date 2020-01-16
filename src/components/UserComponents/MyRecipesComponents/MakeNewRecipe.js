import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import Axios from 'axios'
import decode from 'jwt-decode'
import config from 'react-global-configuration';

class MakeNewRecipe extends Component {
    state = {
        cusines: [],
        ingredients: [],
        seletedIngredients: [],
        formData: null,
        typeStepDescription: '',
        recipe: {
            step: []
        },
        modal: false,
        showMyRecipes: true,
        showMakeRecipeForm: false
    }
    toggle = () => {
        this.setState({modal: !this.state.modal})
    }
    componentDidMount() {
        Axios.get(config.get('server_path')+'/food/cusines')
            .then(res => {                        
                this.setState({cusines: res.data.cusines})                
            })
            .catch(err => console.log(err))

        Axios.get(config.get('server_path')+'/food/ingredients')
            .then(res => {                
                this.setState({ingredients: res.data.ingredients})                
            })
            .catch(err => console.log(err))
        // for state initialization
        this.setState({category: 'Vegeterian'})
    }

    selectIngredient = (e) => {
        var currentValue = e.target.value.split(',')
        var _id = currentValue[0]
        var name = currentValue[1]
        var category = currentValue[2]
        this.setState({ 
            seletedIngredients: this.state.seletedIngredients.concat({_id, name, category})
        })        
    }    

    onChangeIngQty = (e) => {
        var siIndex = e.target.name.split(',')[1]

        var a = this.state.seletedIngredients.slice()
        var temp = a[siIndex]
        console.log(temp)
        a[siIndex] = {_id: temp._id, name: temp.name, category: temp.category, quantity: e.target.value}
        this.setState({
            'seletedIngredients': a
        })
    }

    onChangeIngUnit = (e) => {
        var siIndex = e.target.name.split(',')[1]
        
        
        var a = this.state.seletedIngredients.slice()
                
        var temp = a[siIndex]        
        a[siIndex] = {_id: temp._id, name: temp.name, category: temp.category, quantity: temp.quantity, unit: e.target.value}        
        this.setState({
            'seletedIngredients': a
        })
    }
    typeStepDescription = (e) => {
        this.setState({typeStepDescription: e.target.value})
    }
    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }
    addStep = () => {
        this.setState({
            recipe: {
                step: this.state.recipe.step.concat({description: this.state.typeStepDescription, image: '#'})
            }, typeStepDescription: ''
        })
    }
    doneClicked = () => {
        this.toggle()
        this.props.getMyRecipes()
    }
    addFood = () => {
        console.log(this.state)
        
        var data = {
            name: this.state.name,
            category: {
                veg: (this.state.category === 'Vegeterian') ? true : false,
                nonVeg: (this.state.category !== 'Vegeterian') ? true : false,
                special: {
                    jain: (this.state.specialCategory === 'Jain') ? true : false,
                    swaminarayan: (this.state.specialCategory === 'swaminarayan') ? true : false,
                    faradi: (this.state.specialCategory === 'faradi') ? true : false
                }
            },
            cusine: this.state.cusine,
            ingredients: [],
            servings: this.state.servings,
            // .images
            recipe: {
                step: []
            },
            user: decode(localStorage.getItem('user')).id
        }        
        for (let i = 0; i < this.state.seletedIngredients.length; i++) {
            const e = this.state.seletedIngredients[i];
            data.ingredients.push({ing: e._id, quantity: e.quantity, unit: e.unit})
        }
        for (let i = 0; i < this.state.recipe.step.length; i++) {
            const e = this.state.recipe.step[i];
            data.recipe.step.push({image: (e.image !== '') ? '#' : e.image, description: e.description})
        }
        // console.log(data)

        this.setState({formData: data})
        this.toggle()  
        console.log(data)
        Axios.post(config.get('server_path')+'/food/insert/'+data.user, data)
            .then(res => {
                if (res.data) {
                    console.log(res.data+'......')
                }
            })      
            .catch(err => console.log(err))
    }
    render() { 
        return (
            <React.Fragment>
                <div className="container">
                <h3>Add Your New Recipe</h3>
                {this.modal()}
                {this.MainForm()}                
                </div>
            </React.Fragment>    
        );
    }

    modal() {
        return <div>
            {this.state.formData !== null ? (<div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>{this.state.formData.name}</ModalHeader>
                    <ModalBody>
                        Added Successfully !
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.doneClicked}>Done</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>) : (null)}
        </div>;
    }

    MainForm() {
        return <Form>
            <Row>
                <Col>
                    <FormGroup>
                        <Label for="name">Name of the food</Label>
                        <Input type="text" name="name" id="name" onChange={this.onChange} placeholder="Enter name of the food here..." />
                    </FormGroup>
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="category">Select type</Label>
                                <Input type="select" name="category" id="category" onChange={this.onChange}>
                                    <option>Vegeterian</option>
                                    <option>Non-Vegeterian</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="specialCategory">Select special type</Label>
                                <Input type="select" name="specialCategory" id="specialCategory" onChange={this.onChange} disabled={(this.state.category !== 'Vegeterian')}>
                                    <option selected disabled>special categories</option>
                                    <option>Jain</option>
                                    <option>swaminarayan</option>
                                    <option>faradi</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup>
                        <Label for="exampleSelect">Cusine</Label>
                        <Input type="select" name="cusine" id="cusine" onChange={this.onChange}>
                            {this.state.cusines.map((c, key) => <option key={key} value={c._id}>{c.name}</option>)}
                        </Input>
                    </FormGroup>
                </Col>
                <Col>
                    {this.ingredients()}
                </Col>
            </Row>
            <Row>
                {this.showSelectedIngredients()}
            </Row>
            <Row>
                <Col>
                    <FormGroup>
                        <Label for="servings">Servings</Label>
                        <Input type="text" name="servings" id="servings" onChange={this.onChange} />
                    </FormGroup>
                </Col>
            </Row>

            <h5>Your Recipe Steps here...</h5>
            {this.state.recipe.step ?
                (<React.Fragment>
                    {this.state.recipe.step.map((s, key) => <p>{key + 1}.{s.description}</p>)}
                </React.Fragment>)
                :
                (null)}
            <Row>
                <Col>
                    <FormGroup>
                        <Label for="stepDescription">Enter Step Description</Label>
                        <Input type="textarea" name="stepDescription" id="stepDescription" onChange={this.typeStepDescription} value={this.state.typeStepDescription} />
                    </FormGroup>
                </Col>
                <Col xs="1">
                    <Button className="btn btn-primary btn-sm" onClick={this.addStep}>Add</Button>
                </Col>
            </Row>
            <Button onClick={this.addFood} className="btn btn-success">Submit</Button>
        </Form>;
    }

    showSelectedIngredients() {
        return <Col>
            {this.state.seletedIngredients ?
                (<React.Fragment>
                    {this.state.seletedIngredients.map((si, key) => 
                        <div>
                            <p key={key}>{si.name} => Qty: {si.quantity}<Input type="text" name={"ingQty,"+key} onChange={this.onChangeIngQty} /> <br/>=> Unit: {si.unit}<Input type="text" name={"ingUnit,"+key} onChange={this.onChangeIngUnit} /></p>
                        </div>
                    )}
                </React.Fragment>)
                :
                (null)}
        </Col>;
    }

    ingredients() {
        return <FormGroup>
            <Label for="ingredients">Ingredients</Label>
            <Input type="select" name="ingredients" id="ingredients" onChange={this.selectIngredient}>
                {this.state.ingredients.map((i, key) => 
                    <option key={key} value={i._id + ',' + i.name + ',' + i.category}>{i.name} | {i.category}</option>
                )}
            </Input>
        </FormGroup>;
    }
}
 
export default MakeNewRecipe;