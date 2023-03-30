import React from "react";

export function NoWalletDetected() {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-6 p-4 text-center">
          <p>
            No Ethereum wallet was detected. <br />
            Please install{" "}
            <a href="http://metamask.io" target="_blank" rel="noopener noreferrer">
              MetaMask
            </a>
            or{" "}
            <a
              href="https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad"
              target="_blank"
              rel="noopener noreferrer"
            >
              Coinbase Wallet
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
