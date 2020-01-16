import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class RegisterDetails extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <Form>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" placeholder="Name" onChange={this.props.onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="jash@abc.com" onChange={this.props.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="mobile1">Mobile</Label>
                        <Input type="number" name="mobile1" id="mobile1" placeholder="9999999999" onChange={this.props.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="mobile2">Mobile</Label>
                        <Input type="number" name="mobile2" id="mobile2" placeholder="8888888888" onChange={this.props.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="dob">Date of Birth</Label>
                        <Input type="date" name="dob" id="dob" placeholder="28/10/1998" onChange={this.props.onChange} />
                    </FormGroup>
                    <Button type="button" className="btn btn-success btn-sm" name="submit1" onClick={this.props.onClickNext}>next</Button>
                </Form>
            </React.Fragment>
        );
    }
}
 
export default RegisterDetails;