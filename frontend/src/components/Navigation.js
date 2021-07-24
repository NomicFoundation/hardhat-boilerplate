import React, { Component } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "../stylesheets/Dapp.scss";

class Navigation extends Component {
  render() {
    return (
      <Navbar className="sticky-top" collapseOnSelect expand="md">
        <Container>
          <Navbar.Brand>
            <Nav.Link className="disabled" href="/">
              <img
                className="logo"
                src="logos/og-dao-v2.png"
                title="OG DAO"
                alt="OG DAO"
              />
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle className="navbar-light"/>
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Item>
                <Nav.Link className="px-4" href="/agreement">
                  Participation Agreement
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Navbar.Brand className="ml-auto">
              <Nav.Link href="/">
                {this.props.selectedAddress ? (
                  <Button
                    className="py-2 px-4"
                    variant="info"
                    title={this.props.selectedAddress}
                  >
                    {this.props.minifyHash(this.props.selectedAddress)}
                  </Button>
                ) : (
                  <Button
                    className="py-2 px-4"
                    variant="info"
                    onClick={this.props.connectWallet}
                  >
                    Connect Wallet
                  </Button>
                )}
              </Nav.Link>
            </Navbar.Brand>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default Navigation;
