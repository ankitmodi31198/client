import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink} from 'reactstrap';


class UserNavbar extends Component {
    state = {  }
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    render() { 
        return (
            <React.Fragment>
                <div>
                    <Navbar color="light" light expand="md">
                    <Link to="/user/timeline"><NavbarBrand>ComfyCook</NavbarBrand></Link>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link to="/user/profile"><NavLink>Profile</NavLink></Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/user/myrecipes"><NavLink>My Recipes</NavLink></Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/logout"><NavLink>Logout</NavLink></Link>
                        </NavItem>                        
                        </Nav>
                    </Collapse>
                    </Navbar>
                </div>
            </React.Fragment>
        );
    }
}
 
export default UserNavbar;