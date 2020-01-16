import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class RegisterAddress extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <h3>Address</h3>
                <Form>  
                    <FormGroup>
                        <Label for="street">Street</Label>
                        <Input type="text" name="street" id="street" placeholder="street" onChange={this.props.onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="area">Area</Label>
                        <Input type="text" name="area" id="area" placeholder="Science City" onChange={this.props.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="pincode">Pincode</Label>
                        <Input type="text" name="pincode" id="pincode" placeholder="380060" onChange={this.props.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="city">City</Label>
                        <Input type="text" name="city" id="city" placeholder="Ahmedabad" onChange={this.props.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="state">State</Label>
                        <Input type="text" name="state" id="state" placeholder="Gujarat" onChange={this.props.onChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="country">Country</Label>
                        <Input type="text" name="country" id="country" placeholder="India" onChange={this.props.onChange} value="India"/>
                    </FormGroup>
                    <Button type="button" className="btn btn-success btn-sm" name="submit2" onClick={this.props.onClickNext1}>next</Button>
                </Form>
            </React.Fragment>
        );
    }
}
 
export default RegisterAddress;