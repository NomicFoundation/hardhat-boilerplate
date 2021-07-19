import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import { style } from "../stylesheets/Dapp.css";

export function Navigation() {
  return (
    <Navbar collapseOnSelect expand="lg" className="ebog-gradient-nav">
      <Container>
        <Navbar.Brand href="/" className="ebog-main-text"><img src="logo192.png" width="30" height/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <b><Nav.Link href="/" className="ebog-main-text">Home</Nav.Link></b>
            <b><Nav.Link href="/agreement" className="ebog-main-text">Agreement</Nav.Link></b>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="/" className="ebog-main-text"><FontAwesomeIcon icon={faEthereum}/> Connected Account</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
