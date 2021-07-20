import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import { style } from "../stylesheets/Dapp.scss";

export function Navigation() {
  return (
    <Navbar collapseOnSelect expand="lg" className="ebog-nav">
      <Container>
        <Navbar.Brand href="/" className="ebog-nav"><img src="og-circle-thick.png" width="75" height/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" style={{color:'white', fontWeight: 'bold'}} className="p-4">Home</Nav.Link>
            <Nav.Link href="/agreement" style={{color:'white', fontWeight: 'bold'}} className="p-4">Agreement</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="/" style={{color:'white', fontWeight: 'bold'}} className="p-4"><FontAwesomeIcon icon={faEthereum} style={{color: '#1B9AAA'}} /> Connected Account</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
