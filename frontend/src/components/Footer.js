import React, { Component } from "react";
import { Navbar, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faDiscord, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import "../stylesheets/Dapp.scss";

class Footer extends Component {
  render() {
    return (
      <Navbar className="footer" expand="lg">
        <Container>
          <div className="d-flex justify-content-start">
            <p className="footer-text pt-3 pr-3">
              <span style={{ color: "#1B9AAA" }}>EB</span>OG DAO
            </p>
          </div>
          <div className="d-flex justify-content-end">
            <a
              className="social-icon pr-3"
              href="https://github.com/EBOGDAO"
              rel="noopener noreferrer"
              target="_blank"
              title="Github"
            >
              <FontAwesomeIcon icon={faGithub} size="lg"/>
            </a>
            <a
              className="social-icon px-3"
              href="https://twitter.com/EBOGDAO"
              rel="noopener noreferrer"
              target="_blank"
              title="Twitter"
            >
              <FontAwesomeIcon icon={faTwitterSquare} size="lg"/>
            </a>
            <a
              className="social-icon px-3"
              href="https://discord.gg/brGNRKnx"
              rel="noopener noreferrer"
              target="_blank"
              title="Discord"
            >
              <FontAwesomeIcon icon={faDiscord} size="lg"/>
            </a>
          </div>
        </Container>
      </Navbar>
    );
  }
}

export default Footer;
