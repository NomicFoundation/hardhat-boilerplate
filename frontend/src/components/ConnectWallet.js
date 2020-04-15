import React from "react";

export function ConnectWallet({ connectWallet }) {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-6 p-4 text-center">
          <p>Please connect to your wallet.</p>
          <button
            className="btn btn-warning"
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
