import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

class GeneralNavbar extends Component {
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
                    <Link to="/"><NavbarBrand>ComfyCook</NavbarBrand></Link>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link to="/"><NavLink>Home</NavLink></Link>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                            Actions
                            </DropdownToggle>
                            <DropdownMenu right>
                            <DropdownItem>
                            <Link to="/login"><NavLink>Login</NavLink></Link>
                            </DropdownItem>
                            <DropdownItem>
                                <Link to="/register"><NavLink>Register</NavLink></Link>
                            </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                    </Navbar>
                </div>
            </React.Fragment>
        );
    }
}
 
export default GeneralNavbar;