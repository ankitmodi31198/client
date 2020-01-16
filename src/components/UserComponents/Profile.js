import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import {Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText, Row, Col} from 'reactstrap'
import decode from 'jwt-decode'
import Axios from 'axios';
import config from 'react-global-configuration'

// components
import EditProfile from './ProfileComponents/EditProfile';

class Profile extends Component {
    state = {
        editClicked: false,
        authenticate: true,
        decoded: {},
        user: {
            cred: {
                username: '',
                password: ''
            },
            details: {
                name: "",
                contact: {
                    mobile1: 0,
                    mobile2: 0,
                    email: ""
                },
                dob: 0,
                age: 0,
                address: {
                    street: "",
                    area: "",
                    pincode: "",
                    city: "",
                    state: "",
                    country: ""
                }
            },
            urls: {
                website: "",
                youtube: ""
            }
        }
    }

    componentDidMount() {
        if (!localStorage.user) {
            this.setState({authenticate: false})   
        } else {
            var d = decode(localStorage.getItem('user'))
            console.log(d)
            this.setState({decoded: d}, () => {
                this.loadData()
            })
                
        }
    }
    loadData = () => {        
        Axios.get(config.get('server_path')+'/user/'+this.state.decoded.id)
            .then(res => {
                console.log(res.data)
                this.setState({user: res.data.user}, () => console.log(this.state))
            })
            .catch(err => console.log(err))
    }
    editClicked = () => {
        this.setState({editClicked: true})
    }
    backClicked = () => {
        this.setState({editClicked: false})
        this.componentDidMount()
    }
    render() { 
        // console.log(this.state.user.cred.password)
        return (
            <React.Fragment>
                {this.state.editClicked ? 
                    (
                        <div className="container">
                            <EditProfile user={this.state.user} backClicked={this.backClicked} />
                        </div>
                    )
                    :
                    (
                        <div className="container">
                            {this.pageTitle()}
                            {this.userCard()}
                            {this.conditionalRedirects()}
                        </div>  
                    )
                }
            </React.Fragment>
        );
    }

    userCard() {
        return <div>
            <Card>
                <CardHeader className="h3">{this.state.user.details.name}</CardHeader>
                <CardBody>
                    <Row>
                        <Col>
                            <CardTitle className="h6">Email:</CardTitle>
                            <CardText>{this.state.user.details.contact.email}</CardText>
                        </Col>
                        <Col>
                            <CardTitle className="h6">Mobile 1:</CardTitle>
                            <CardText>{this.state.user.details.contact.mobile1}</CardText>
                        </Col>
                        {this.state.user.details.contact.mobile2 ?
                            (<Col>
                                <CardTitle className="h6">Mobile 2:</CardTitle>
                                <CardText>{this.state.user.details.contact.mobile2}</CardText>
                            </Col>)
                            :
                            (null)}
                    </Row>
                    <Row className="mt-4">
                        <Col>
                            <CardTitle className="h6">Date of Birth:</CardTitle>
                            <CardText>{this.state.user.details.dob}</CardText>
                        </Col>
                        <Col>
                            <CardTitle className="h6">Age:</CardTitle>
                            <CardText>{this.state.user.details.age}</CardText>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col>
                            <CardTitle className="h6">Address:</CardTitle>
                            <CardText>{this.state.user.details.address.street} {this.state.user.details.address.area} {this.state.user.details.address.city} - {this.state.user.details.address.pincode}, {this.state.user.details.address.state}, {this.state.user.details.address.country}</CardText>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col>
                            {((this.state.user.urls.website !== '#') || (this.state.user.urls.youtube !== '#')) ?
                                (<React.Fragment>
                                    <CardTitle className="h6">Your websites:</CardTitle>
                                    {(this.state.user.urls.website !== '#') ?
                                        (<CardText><a href={this.state.user.urls.website}>{this.state.user.urls.website}</a></CardText>)
                                        :
                                        (null)}
                                    {(this.state.user.urls.youtube !== '#') ?
                                        (<CardText><a href={this.state.user.urls.youtube}>{this.state.user.urls.youtube}</a></CardText>)
                                        :
                                        (null)}
                                </React.Fragment>)
                                :
                                (null)}
                        </Col>
                    </Row>
                    <hr />
                    <Button onClick={this.editClicked}>Edit</Button>
                </CardBody>
                <CardFooter>Comfy Cook loves you :)</CardFooter>
            </Card>
        </div>;
    }

    pageTitle() {
        return <center><h3>Your Profile</h3></center>;
    }

    conditionalRedirects() {
        return <div>
            {this.state.authenticate ? null : (<Redirect to="/login" />)}
        </div>;
    }
}
 
export default Profile;