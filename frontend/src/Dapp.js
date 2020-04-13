import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import 'bootstrap/dist/css/bootstrap.css';

import TokenArtifact from './contracts/Token.json';
import contractAddress from './contracts/contract-address.json';

let _provider, _token;

function Dapp() {

  /* Hooks */

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [balance, setBalance] = useState(0);
  const [balanceOf, setBalanceOf] = useState(null);
  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(function() {
    // Check if wallet has been unlocked or the selected address changed
    const interval = setInterval(() => {
      setInitialized(true);
      if (
        window.ethereum === undefined || 
        window.ethereum.selectedAddress === selectedAddress
      ) {
        return true;
      }
      // Initialize ethers
      _provider = new ethers.providers.Web3Provider(window.ethereum);
      _token = new ethers.Contract(
        contractAddress.Token,
        TokenArtifact.abi,
        _provider.getSigner(0)
      );
      // Get Token data
      getTokenData();
      // Save wallet selected address
      setSelectedAddress(window.ethereum.selectedAddress);
      // Update selected address balance
      if (window.ethereum.selectedAddress) {
        updateBalance(window.ethereum.selectedAddress);
      }
    }, 1000);
    // The interval is cleared if selectedAddress change
    return () => clearInterval(interval);
  }, [selectedAddress]);

 /* Functions */

  // Updates the selected address balance 
  async function updateBalance(_address) {
    if (_address === undefined && selectedAddress) {
      _address = selectedAddress;
    }
    setLoading(true);
    const balance = await _token.balanceOf(_address);
    setBalance(balance.toString());
    setLoading(false);
  }

  // Get Token contract data
  async function getTokenData() {
    setLoading(true);
    const name = await _token.name();
    const symbol = await _token.symbol();
    setTokenData({
      name: name,
      symbol: symbol
    }); 
    setLoading(false);
  }

  // Transfer tokens from the selected address to any account
  async function transferTokens(event) {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.target);
    if (data.get('to') && data.get('amount')) {
      try {
        const tx = await _token.transfer(data.get('to'), data.get('amount'));
        updateBalance();
      } catch (error) {
        console.error(error);
      }
    }
    setLoading(false);
  }

  // Get the balance of tokens of any account
  async function getBalanceOf(event) {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.target);
    if (data.get('account')) {
      try {
        const res = await _token.balanceOf(data.get('account'));
        setBalanceOf({
          account: data.get('account'),
          balance: res.toString()
        });
      } catch (error) {
        console.error(error);
      }
    }
    setLoading(false);
  }


  /* Components */
  
  function NoWalletDetected() {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-6 p-4 text-center">
            <p>
              No Ethereum wallet was detected. <br/>
              Please install <a href="http://metamask.io" target="_blank">MetaMask</a>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  function UnlockWallet() {
    if (!initialized) {
      return (
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-6 p-4 text-center">
              <p>Trying to unlock your wallet...</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-6 p-4 text-center">
            <p>Please unlock your wallet.</p>
            <button 
              className="btn btn-warning" 
              type="button" 
              onClick={() => window.ethereum.enable()}
            >
              Unlock
            </button>
          </div>
        </div>
      </div>
    );
  }

  function Loading() {
    if (!loading) {
      return null;
    }
    return (
      <div style={{ 
        position: "fixed", zIndex: 2, top: 0,left: 0,
        width: "100%", height: "100%",
        background: "rgba(255, 255, 255, 0.5)"        
      }}>
        <p style={{
          position: "absolute", zIndex: 3, top: "50%", left: "50%",
          width: "100px", height: "50px",
          marginLeft: "-50px", marginTop:" -25px",
          textAlign: "center"
        }}>
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </p>
      </div>
    );
  }

  function Transfer() {
    if (!balance) {
      return <p>You don't have tokens to transfer</p>;
    }
    return (
      <div>
        <h4>Transfer</h4>
        <form onSubmit={transferTokens}>
          <div className="form-group">
            <label>Amount of {tokenData.symbol}</label>
            <input 
              className="form-control" 
              type="number" 
              step="1" 
              name="amount" 
              max={balance} 
              placeholder="1"
            />
          </div>
          <div className="form-group"> 
            <label>Recipient address</label>
            <input 
              className="form-control" 
              type="text" 
              name="to"
              placeholder={selectedAddress}
            />
          </div>
          <div className="form-group">
            <input className="btn btn-primary" type="submit" value="Transfer"/>
          </div>
        </form>
      </div>
    );
  }

  function BalanceOf() {
    let result;
    if (balanceOf) {
      result = (
        <p>
          Account <b>{balanceOf.account}</b> has {" "}
          <b>{balanceOf.balance} {tokenData.symbol}.</b>
        </p>
      );
    } 
    return (
      <div>
        <h4>Balance</h4>
        <form onSubmit={getBalanceOf}>
          <label>Get the balance of {tokenData.symbol} of any account</label>
          <div className="form-group">
            <input 
              className="form-control" 
              type="text" 
              name="account" 
              placeholder={selectedAddress} 
            />
          </div>
          <div className="form-group">
            <input className="btn btn-primary" type="submit" value="Submit"/>
          </div>
        </form>
        {result}
      </div>
    );
  }


  /* Render */

  if (window.ethereum === undefined) {
    return NoWalletDetected();
  }

  if (!selectedAddress) {
    return UnlockWallet();
  }

  if (!tokenData) {
    return <Loading />;
  }

  return (
    <div className="container p-4">
      <Loading />
      <h1>{tokenData.name} ({tokenData.symbol})</h1>
      <p>
        Welcome <b>{selectedAddress}</b>, {" "}
        you have <b>{balance} {tokenData.symbol}</b>.
      </p>
      <hr/>
      <div className="row">
        <div className="col-6">
          <Transfer />
        </div>
        <div className="col-6">
          <BalanceOf />
        </div>
      </div>
    </div>
  );
}

export default Dapp;

