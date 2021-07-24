import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import "../../stylesheets/Dapp.scss";

class Member extends Component {
  render() {
    return (
      <div className="my-5 py-3">
        <div className="text-center mb-2 p-4">
          <h5 className="mt-3">Total: {this.props.totalAccounts}</h5>
          {this.props.adminAddress === this.props.selectedAddress && (
            <Button
              className="my-4 px-3 py-2"
              variant="warning"
              disabled={this.props.selectedAddress === undefined}
              onClick={this.props.addMembers}
            >
              Add Members
            </Button>
          )}
        </div>
        <Row className="my-4" style={{ border: "1px solid #d3d3d3" }}>
          <Col md={{ span: 4, offset: 1 }} className="text-center my-4">
            <table className="table table-bordered my-4">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Opted In</th>
                </tr>
              </thead>
              <tbody>
                {this.props.optedInAccounts.map((account, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{this.props.minifyHash(account)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Col>
          <Col md={{ span: 4, offset: 2 }} className="text-center my-4">
            <table className="table table-bordered my-4">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Opted Out</th>
                </tr>
              </thead>
              <tbody>
                {this.props.optedOutAccounts.map((account, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{this.props.minifyHash(account)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Col>
        </Row>
      </div>
    )
  }
};

export default Member;
