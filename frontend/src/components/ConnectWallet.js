import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import { NetworkErrorMessage } from "./NetworkErrorMessage";

export function ConnectWallet({ connectWallet, networkError, dismiss }) {
  document.body.style.backgroundColor = "#09849C";
  return (
    <div className="container  col-4 offset-4">
      <div className="row justify-content-md-center">
        <div className=" text-center">
          {/* Metamask network should be set to Localhost:8545. */}
          {networkError && (
            <NetworkErrorMessage 
              message={networkError} 
              dismiss={dismiss} 
            />
          )}
        </div>

        <div className="col-6 p-4 text-center">
        <br></br><br></br><br></br><br></br>
          <img src="logo192.png"></img>
          <br></br><br></br>
          <p className="ebog-secondary"><FontAwesomeIcon icon={faEthereum}/> Ethereum Single Sign-on</p>
          <button
            className="btn ebog-secondary-bg"
            type="button"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
