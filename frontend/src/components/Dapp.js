import React from "react";

// All the logic of this dapp is contained in the Dapp component.
// These other components are just presentational ones: they don't have any
// logic. They just render HTML.
import { NoWalletDetected } from "./NoWalletDetected";
import { ConnectWallet } from "./ConnectWallet";
import { Loading } from "./Loading";
import { Transfer } from "./Transfer";
import { TransactionErrorMessage } from "./TransactionErrorMessage";
import { WaitingForTransactionMessage } from "./WaitingForTransactionMessage";
import { NoTokensMessage } from "./NoTokensMessage";
import useConnectWallet from "../hooks/useConnectWallet";

// This is an utility method that turns an RPC error into a human readable
// message.
const getRpcErrorMessage = (error) => {
  if (error.data) {
    return error.data.message;
  }

  return error.message;
};

// This component is in charge of doing these things:
//   1. It connects to the user's wallet
//   2. Initializes ethers and the Token contract
//   3. Polls the user balance to keep it updated.
//   4. Transfers tokens by sending transactions
//   5. Renders the whole application
//
// Note that (3) and (4) are specific of this sample application, but they show
// you how to keep your Dapp and contract's state in sync,  and how to send a
// transaction.
export const Dapp = () => {
  const {
    connectWallet,
    transferTokens,
    tokenData,
    selectedAddress,
    balance,
    txBeingSent,
    transactionError,
    networkError,
    setNetworkError,
    setTransactionError,
  } = useConnectWallet();
  // Ethereum wallets inject the window.ethereum object. If it hasn't been
  // injected, we instruct the user to install MetaMask.
  if (window.ethereum === undefined) {
    return <NoWalletDetected />;
  }

  // The next thing we need to do, is to ask the user to connect their wallet.
  // When the wallet gets connected, we are going to save the users's address
  // in the component's state. So, if it hasn't been saved yet, we have
  // to show the ConnectWallet component.
  //
  // Note that we pass it a callback that is going to be called when the user
  // clicks a button. This callback just calls the _connectWallet method.
  if (!selectedAddress) {
    return (
      <ConnectWallet
        connectWallet={() => connectWallet()}
        networkError={networkError}
        dismiss={() => setNetworkError(undefined)}
      />
    );
  }

  // If the token data or the user's balance hasn't loaded yet, we show
  // a loading component.
  if (!tokenData || !balance) {
    return <Loading />;
  }

  // If everything is loaded, we render the application.
  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-12">
          <h1>
            {tokenData.name} ({tokenData.symbol})
          </h1>
          <p>
            Welcome <b>{selectedAddress}</b>, you have{" "}
            <b>
              {balance.toString()} {tokenData.symbol}
            </b>
            .
          </p>
        </div>
      </div>

      <hr />

      <div className="row">
        <div className="col-12">
          {/* 
              Sending a transaction isn't an immediate action. You have to wait
              for it to be mined.
              If we are waiting for one, we show a message here.
            */}
          {txBeingSent && <WaitingForTransactionMessage txHash={txBeingSent} />}

          {/* 
              Sending a transaction can fail in multiple ways. 
              If that happened, we show a message here.
            */}
          {transactionError && (
            <TransactionErrorMessage
              message={getRpcErrorMessage(transactionError)}
              dismiss={() => setTransactionError(undefined)}
            />
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          {/*
              If the user has no tokens, we don't show the Transfer form
            */}
          {balance.eq(0) && (
            <NoTokensMessage selectedAddress={selectedAddress} />
          )}

          {/*
              This component displays a form that the user can use to send a 
              transaction and transfer some tokens.
              The component doesn't have logic, it just calls the transferTokens
              callback.
            */}
          {balance.gt(0) && (
            <Transfer
              transferTokens={(to, amount) => transferTokens(to, amount)}
              tokenSymbol={tokenData.symbol}
            />
          )}
        </div>
      </div>
    </div>
  );
};
