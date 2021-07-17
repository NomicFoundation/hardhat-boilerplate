import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "../stylesheets/Dapp.css";

export function Navigation() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
      <Navbar.Brand href="/">EBOG</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/agreement">Agreement</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link href="/">Connected Account</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
