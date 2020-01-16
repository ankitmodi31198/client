import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

class RegisterCred extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <h3>Your Credentials</h3>
                <Form>  
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="text" name="username" id="username" placeholder="username" onChange={this.props.onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Password must be strong" onChange={this.props.onChange} />
                    </FormGroup>
                    <Button type="button" className="btn btn-success btn-md" onClick={this.props.register}>Register</Button>
                </Form>
            </React.Fragment>
        );
    }
}
 
export default RegisterCred;