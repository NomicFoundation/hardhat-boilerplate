import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faDiscord, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { style } from "../stylesheets/Dapp.scss";

export function Footer() {
  return (
    <Navbar className="fixed-bottom ebog-foot" expand="lg">
      <Container className="justify-content-start">
        <b className="footer-text" style={{color:'#1B9AAA', fontWeight: 'bold', fontSize: '20px'}}>EB</b> <b className="footer-text" style={{color:'#FFFFFF', fontWeight: 'bold', fontSize: '20px'}}>OG DAO</b>
      </Container>
      <Container className="justify-content-end ebog-main-text">
          <a href="https://github.com/EBOGDAO" className="ebog-main-text" style={{color:'#1B9AAA', fontWeight: 'bold'}} className="p-4"><FontAwesomeIcon icon={faGithub} size="lg"/></a>
          <a href="https://twitter.com/EBOGDAO" className="ebog-main-text" style={{color:'#1B9AAA', fontWeight: 'bold'}} className="p-4"><FontAwesomeIcon icon={faTwitterSquare} size="lg"/></a>
          <a href="https://discord.gg/brGNRKnx" className="ebog-main-text" style={{color:'#1B9AAA', fontWeight: 'bold'}} className="p-4"><FontAwesomeIcon icon={faDiscord} size="lg"/></a>
      </Container>
    </Navbar>
  );
}
