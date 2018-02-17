import React from "react";
import { connect } from 'react-redux';
import { Navbar, NavItem, MenuItem, Nav, NavDropdown } from 'react-bootstrap';
import { LS_LOGIN_INFO } from '../reducers/LoginReducer';
import * as Labels from '../labels';

const mapStateToProps = store => {
  return {
    user: store.login.user,
    logged: store.login.logged
  };
}

@connect(mapStateToProps)
export default class NavigationBar extends React.Component {

  render() {
    const { user, logged } = this.props;

    return (
      <Navbar fixedTop collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#home">{Labels.BRAND_NAME}</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {logged ?
            <Nav pullRight>
              <NavDropdown id={2} eventKey={2} title={'Witaj, ' + user.name}>
                <MenuItem eventKey={2.1} onSelect={this._logout}>Logout</MenuItem>
              </NavDropdown >
            </Nav> :
            <Nav />
          }
        </Navbar.Collapse>
      </Navbar>
    );
  }

  _logout = () => {
    localStorage.removeItem(LS_LOGIN_INFO);
    alert('Wylogowano!');
    setTimeout(() => { location.reload(); }, 100);
  }
}
