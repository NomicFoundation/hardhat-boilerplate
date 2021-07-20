import React from "react";
import { Button } from "react-bootstrap";
import "../../stylesheets/Dapp.scss";

export function Agreement({ addMembers, optIn, optInAccounts, optOut, optOutAccounts, selectedAddress, totalAccounts }) {
  document.body.style.backgroundColor = "#f5f1e3";
  return (
    <div className="container mb-5 p-4">
      <div className="row">
        <div className="col-10 offset-1">
          <h1>
            EBOG DAO Agreement 2021
          </h1>
          <p>
            Welcome, <b>[{selectedAddress}]</b>
          </p>
        </div>
      </div>

      <hr />

      <div className="row">
        <div className="col-10 offset-1">
          <h5>There are 2 options:</h5>
          <ol>
            <li>I, the owner of this address, Opt-out completely from the EBOG DAO.</li>
            <li>I, the owner of this address, Opt-in to the EBOG DAO. I have read and agreed to the participation agreement below.</li>
          </ol>
          <p>
            If you do not opt-in or out, you are still a member of the EBOG DAO. You still have the same voting power, however you will not receive airdrops, payments, or other benefits. This to protect the EBOG DAO, it’s members, and assets.
          </p><br/>
          <h6>Participation Agreement</h6>
          <p>
            Please read this participation agreement ("agreement") carefully before confirming your intent to be bound by it and participating in the EBOG DAO. This agreement includes the terms of participation in the EBOG DAO. You understand, agree and confirm that:
          </p>
          <ol>
            <li>The EBOG DAO is an experiment in the field of decentralized governance structures, in which participation is entirely at your own risk.</li>
            <li>This agreement has legal consequences and by entering into this agreement you release all rights, claims, or other causes of action whether in equity or law you may have against EBOG DAO service providers or other EBOG DAO participants.<br/>You also agree to waive and limit any potential liability of EBOG DAO service providers or other EBOG DAO participants.</li>
            <li>You are sophisticated and have sufficient technical understanding of the functionality, usage, storage, transmission mechanisms, and intricacies associated with cryptographic tokens, token storage facilities (including wallets), blockchain technology, and blockchain-based software systems.</li>
          </ol>
        </div>
      </div>

      <div className="text-center mt-5">
        <h5>Total: {totalAccounts}</h5>
        <Button
          className="mt-3 px-3 py-2"
          variant="primary"
          onClick={addMembers}
        >
          Add Members
        </Button>
      </div>

      <div className="row my-4">
        <div className="col-4 offset-1 text-center">
          <Button
            className="px-3 py-2"
            variant="success"
            onClick={optIn}
          >
            Opt In
          </Button>
          <div className="mt-5">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Opted In</th>
                </tr>
              </thead>
              <tbody>
                {optInAccounts.map((account, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{account}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-4 offset-2 text-center">
          <Button
            className="px-3 py-2"
            variant="danger"
            onClick={optOut}
          >
            Opt Out
          </Button>
          <div className="mt-5">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Opted Out</th>
                </tr>
              </thead>
              <tbody>
                {optOutAccounts.map((account, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{account}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
