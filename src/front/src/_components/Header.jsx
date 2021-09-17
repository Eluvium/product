import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import * as routes from 'routes';

function Header(props) {
  const { isSimplified = false, logout, onChangeRoute } = props;
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">
        Тестовое задание 
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {isSimplified ? null
            : (
              <>
                <Nav.Link as={Link} to="/">
                  Главная
                </Nav.Link>
                
              </>
            )}
        </Nav>
        <Nav>
          <Nav.Link onClick={logout}>
            Выйти
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

Header.propTypes = {
  isSimplified: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};

export default Header;
