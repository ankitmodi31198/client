import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button} from 'reactstrap'
import { Redirect } from 'react-router-dom'
import decode from 'jwt-decode'
import Axios from 'axios';
import config from 'react-global-configuration'

class EditProfile extends Component {
    state = {
        name: this.props.user.details.name,
        mobile1: this.props.user.details.contact.mobile1,
        mobile2: this.props.user.details.contact.mobile2,
        email: this.props.user.details.contact.email,
        dob: this.props.user.details.dob,
        street: this.props.user.details.address.street,
        area: this.props.user.details.address.area,
        city: this.props.user.details.address.city,
        pincode: this.props.user.details.address.pincode,
        state: this.props.user.details.address.state,
        country: this.props.user.details.address.country,
        website: this.props.user.urls.website,
        youtube: this.props.user.urls.youtube
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
        console.log(this.state.name)
    }
    update = () => {
        Axios.post(config.get('server_path')+'/user/update/'+decode(localStorage.getItem('user')).id, this.state)
            .then(res => {
                if (res.data.success) {
                    this.props.backClicked()
                }
            })
            .catch(err => console.log(err))
    }
    render() { 
        return (
            <React.Fragment>
                <div className="container">
                <Form>  
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" placeholder="name" value={this.state.name} onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="mobile1">Mobile 1</Label>
                        <Input type="number" name="mobile1" id="mobile1" placeholder="mobile 1" value={this.state.mobile1} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="mobile2">Mobile 2</Label>
                        <Input type="number" name="mobile2" id="mobile2" placeholder="mobile 2" value={this.state.mobile2} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">email</Label>
                        <Input type="email" name="email" id="email" placeholder="email" value={this.state.email} onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="dob">Date of Birth</Label>
                        <Input type="date" name="dob" id="dob" placeholder="dob" value={this.state.dob} onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="street">street</Label>
                        <Input type="text" name="street" id="street" placeholder="street" value={this.state.street} onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="area">area</Label>
                        <Input type="text" name="area" id="area" placeholder="area" value={this.state.area} onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="pincode">pincode</Label>
                        <Input type="text" name="pincode" id="pincode" placeholder="pincode" value={this.state.pincode} onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="city">city</Label>
                        <Input type="text" name="city" id="city" placeholder="city" value={this.state.city} onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="state">state</Label>
                        <Input type="text" name="state" id="state" placeholder="state" value={this.state.state} onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="country">country</Label>
                        <Input type="text" name="country" id="country" placeholder="country" value={this.state.country} onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="website">website</Label>
                        <Input type="text" name="website" id="website" placeholder="website" value={this.state.website} onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="youtube">youtube</Label>
                        <Input type="text" name="youtube" id="youtube" placeholder="youtube" value={this.state.youtube} onChange={this.onChange}/>
                    </FormGroup>
                                                    
                    <Button type="button" name="update" onClick={this.update} className="btn btn-success btn-md">Update</Button>                    
                    <Button type="button" name="back" onClick={this.props.backClicked} className="btn btn-secondary btn-md">Back</Button>                    
                </Form>
                </div>
                {this.state.goBack ? 
                    (<Redirect to="/profile" />)
                    :
                    (null)
                }
            </React.Fragment>
        );
    }
}
 
export default EditProfile;