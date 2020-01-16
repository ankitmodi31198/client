import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import config from 'react-global-configuration'

class Login extends Component {
    state = {
        username: '',
        password: '',
        msg: '',
        success: false,
        userAuthenticate: false
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    componentDidMount() {
        if (localStorage.getItem('user')) {
            this.setState({userAuthenticate: true})
        }
    }
    login = () => {
        const data = {
            cred: {
                username: this.state.username,
                password: this.state.password
            }
        }
        axios.post(config.get('server_path')+'/auth/login', data)
            .then(res => {
                console.log(res)
                localStorage.setItem('user', res.data.token) 
                this.setState({msg: res.data.msg, success: res.data.success})
            })
            .catch(err => console.log(err))
    }
    render() { 
        return (
            <div className="container">
            {(this.state.msg !== '') ? (<Alert color={(this.state.success) ? ('success') : ('warning')}>{this.state.msg}</Alert>) : null}
                <h2>Login</h2>
                <Form>  
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="text" name="username" id="username" placeholder="username" onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">password</Label>
                        <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange} />
                    </FormGroup>
                    <Button type="button" name="login" onClick={this.login} className="btn btn-success btn-md">Login</Button>                    
                </Form>
                {this.conditionalRedirects()}
            </div>
        );
    }

    conditionalRedirects() {
        return <div>
            {this.state.success ? (<Redirect to="/loader" />) : null}
            {this.state.userAuthenticate ? (<Redirect to="/user/profile" />) : (null)}
        </div>;
    }
}
 
export default Login;