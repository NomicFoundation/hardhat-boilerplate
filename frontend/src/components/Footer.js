import React from "react";
import { Navbar, Container } from "react-bootstrap";
import "../stylesheets/Dapp.css";

export function Footer() {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container className="justify-content-center">
        <p className="footer-text">
          Footer
        </p>
      </Container>
    </Navbar>
  );
}
