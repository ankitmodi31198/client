import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios'
// import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import config from 'react-global-configuration'

import RegisterDetails from './RegistrationComponents/RegisterDetails'
import RegisterAddress from './RegistrationComponents/RegisterAddress'
import RegisterCred from './RegistrationComponents/RegisterCred'

class Register extends Component {
    state = { 
        loginRedirect: false,
        userAuthenticate: false,
        register: true,
        register1: false,
        register2: false,
        name: '', email: '', mobile1: '', mobile2: '', dob: '', street: '', area: '', pincode: '', city: '', state: '', country: '', username: '', password: ''
    }
    componentDidMount() {
        if (localStorage.getItem('user')) {
            this.setState({userAuthenticate: true})
        }
    }
    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }
    onClickNext = () => {
        this.setState({register: false, register1: true})
    }
    onClickNext1 = () => {
        this.setState({register1: false, register2: true})
    }
    register = () => {
        const data = {
            cred: {
                username: this.state.username,
                password: this.state.password
            },
            details: {
                name: this.state.name,
                contact: {
                    mobile1: this.state.mobile1,
                    mobile2: this.state.mobile2,
                    email: this.state.email
                },
                dob: this.state.dob,
                address: {
                    street: this.state.street,
                    area: this.state.area,
                    pincode: this.state.pincode,
                    city: this.state.city,
                    state: this.state.state,
                    country: this.state.country
                }
            }
        }    
        axios.post(config.get('server_path')+'/auth/register', data)
            .then(res => {
                console.log(res);
                this.setState({loginRedirect: true})
            })
            .catch(err => {
                console.log(err);                
            })      
    }
    render() { 
        return (
            <div className="container">
                <h2>Registration</h2>
                {this.conditionalRedirects()}
            </div>
        );
    }

    conditionalRedirects() {
        return <div>
            {this.state.register ? (<RegisterDetails onChange={this.onChange} onClickNext={this.onClickNext} />) : (null)}
            {this.state.register1 ? (<RegisterAddress onChange={this.onChange} onClickNext1={this.onClickNext1} />) : (null)}
            {this.state.register2 ? (<RegisterCred onChange={this.onChange} register={this.register} />) : (null)}
            {this.state.loginRedirect ? <Redirect to="/login" /> : null}
            {this.state.userAuthenticate ? (<Redirect to="/user/profile" />) : (null)}
        </div>;
    }
}
 
export default Register;