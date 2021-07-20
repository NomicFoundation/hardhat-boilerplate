import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import { NetworkErrorMessage } from "./NetworkErrorMessage";

export function ConnectWallet({ connectWallet, networkError, dismiss }) {
  document.body.style.backgroundColor = "#050505";
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
          <img className="justify-content-md-center" src="og-circle-thick.png" width="250px"></img>
          <br></br><br></br>
          <p className="ebog-secondary" style={{color: "#F5F1E3"}}><FontAwesomeIcon icon={faEthereum} style={{color: '#1B9AAA'}} /> Ethereum Single Sign-on</p>
          <button
            className="btn"
            type="button"
            style={{color:'white', fontWeight: 'bold', backgroundColor: '#1B9AAA'}} 
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
