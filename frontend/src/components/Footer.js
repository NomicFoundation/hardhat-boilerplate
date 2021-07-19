import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faDiscord, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { style } from "../stylesheets/Dapp.css";

export function Footer() {
  return (
    <Navbar className="fixed-bottom ebog-gradient-nav" expand="lg">
      <Container className="justify-content-start">
        <b><p className="footer-text ebog-main-text">
          EBOG DAO
        </p></b>
      </Container>
      <Container className="justify-content-end ebog-main-text">
        <div className="mr-3">
           <a href="https://github.com/EBOGDAO" className="ebog-main-text"><FontAwesomeIcon icon={faGithub}/></a>
        </div>
        <div className="mr-3">
          <a href="https://twitter.com/EBOGDAO" className="ebog-main-text"><FontAwesomeIcon icon={faTwitterSquare}/></a>
        </div>
        <div className="mr-3">
          <a href="https://discord.gg/brGNRKnx" className="ebog-main-text"><FontAwesomeIcon icon={faDiscord}/></a>
        </div>
      </Container>
    </Navbar>
  );
}
