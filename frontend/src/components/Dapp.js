import React from "react";
import { ethers } from "ethers";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
// Contracts
import TokenArtifact from "../contracts/Token.json";
import AgreementArtifact from "../contracts/Agreement.json";
import contractAddress from "../contracts/contract-address.json";
// Components
import { NoWalletDetected } from "./NoWalletDetected";
import { ConnectWallet } from "./ConnectWallet";
import { Loading } from "./Loading";
import { TransactionErrorMessage } from "./TransactionErrorMessage";
import { WaitingForTransactionMessage } from "./WaitingForTransactionMessage";
import Navigation from "./Navigation";
import Home from "./Home";
import Agreement from "./DAO/Agreement";
import Member from "./DAO/Member";
import Footer from "./Footer";
// STYLESHEETS
import "../stylesheets/Dapp.scss";
// NETWORKS
// const MAINNET_NETWORK_ID = '1';
// const RINKEBY_NETWORK_ID = '4';
const HARDHAT_NETWORK_ID = '1337';
// CONSTANTS
const MEMBERS = [
  "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
  "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
  "0x90f79bf6eb2c4f870365e785982e1f101e93b906",
  "0x15d34aaf54267db7d7c367839aaf71a00a2c6a65",
  "0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc",
  "0x976ea74026e726554db657fa54763abd0c3a0aa9",
  "0x14dc79964da2c08b23698b3d3cc7ca32193d9955",
  "0xa0ee7a142d267c1f36714e4a8f75612f20a79720",
  "0xbcd4042de499d14e55001ccbb24a551f3b954096"
]

// This is an error code that indicates that the user canceled a transaction
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

// This component is in charge of doing these things:
//   1. It connects to the user's wallet
//   2. Initializes ethers and the Token contract
//   3. Polls the user balance to keep it updated.
//   4. Transfers tokens by sending transactions
//   5. Renders the whole application
export class Dapp extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      tokenData: undefined,
      selectedAddress: undefined,
      balance: undefined,
      txBeingSent: undefined,
      transactionError: undefined,
      networkError: undefined,
      totalAccounts: undefined,
      optedInAccounts: [],
      optedOutAccounts: []
    };

    this.state = this.initialState;
  }

  async _connectWallet() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    if (!this._checkNetwork()) {
      return;
    }

    this._initialize(accounts[0]);

    // We reinitialize it whenever the user changes their account.
    window.ethereum.on("accountsChanged", ([newAddress]) => {
      if (newAddress === undefined) {
        return this._resetState();
      }

      this._initialize(newAddress);
    });

    // We reset the dapp state if the network is changed
    window.ethereum.on("chainChanged", ([networkId]) => {
      this._stopPollingData();
      this._resetState();
    });
  }

  // This method initializes the dapp
  _initialize(userAddress) {
    // We first store the user's address in the component's state
    this.setState({
      selectedAddress: ethers.utils.getAddress(userAddress),
    });

    // Then, we initialize ethers, fetch the token's data, and start polling
    // for the user's balance.

    // Fetching the token data and the user's balance are specific to this
    // sample project, but you can reuse the same initialization pattern.
    this._intializeEthers();
    this._getTokenData();
    this._fetchAccounts();
  }

  async _intializeEthers() {
    // We first initialize ethers by creating a provider using window.ethereum
    this._provider = new ethers.providers.Web3Provider(window.ethereum);

    // When, we initialize the contract using that provider and the token's
    // artifact. You can do this same thing with your contracts.
    this._token = new ethers.Contract(
      contractAddress.Token,
      TokenArtifact.abi,
      this._provider.getSigner(0)
    );

    this._agreement = new ethers.Contract(
      contractAddress.Agreement,
      AgreementArtifact.abi,
      this._provider.getSigner(0)
    );
  }

  async _getTokenData() {
    const name = await this._token.name();
    const symbol = await this._token.symbol();

    this.setState({ tokenData: { name, symbol } });
  }

  async _fetchAccounts() {
    const adminAddress = await this._agreement.owner();
    const totalAccounts = await this._agreement.totalAccounts();
    const optedInAccounts = await this._agreement.fetchOptedInAccounts();
    const optedOutAccounts = await this._agreement.fetchOptedOutAccounts();

    this.setState({
      adminAddress: ethers.utils.getAddress(adminAddress),
      optedInAccounts: optedInAccounts,
      optedOutAccounts: optedOutAccounts,
      totalAccounts: totalAccounts.toNumber()
    });
  }

  async _addMembers() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress.Agreement, AgreementArtifact.abi, provider.getSigner());

    try {
      const transaction = await contract.addMembers(MEMBERS);
      this.setState({ txBeingSent: transaction.hash });

      await transaction.wait()
      this.setState({ txBeingSent: undefined });

    } catch (error) {
      this.setState({
        txBeingSent: undefined,
        transactionError: error
      })
    }
  }

  async _optIn() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress.Agreement, AgreementArtifact.abi, provider.getSigner());

    try {
      const transaction = await contract.optInToDAO();
      this.setState({ txBeingSent: transaction.hash });

      await transaction.wait()
      this.setState({ txBeingSent: undefined });

    } catch (error) {
      this.setState({
        txBeingSent: undefined,
        transactionError: error
      })
    }
  }

  async _optOut() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress.Agreement, AgreementArtifact.abi, provider.getSigner());

    try {
      const transaction = await contract.optOutOfDAO();
      this.setState({ txBeingSent: transaction.hash });

      await transaction.wait()
      this.setState({ txBeingSent: undefined });

    } catch (error) {
      this.setState({
        txBeingSent: undefined,
        transactionError: error })
    }
  }

  _minifyHash(address) {
    if (!address) return
    const hashStart = address.substring(0, 6)
    const hashEnd = address.substring(address.length-4, address.length)

    return `${hashStart}...${hashEnd}`
  }

  // This method sends an ethereum transaction to transfer tokens.
  // While this action is specific to this application, it illustrates how to
  // send a transaction.
  async _transferTokens(to, amount) {
    // Sending a transaction is a complex operation:
    //   - The user can reject it
    //   - It can fail before reaching the ethereum network (i.e. if the user
    //     doesn't have ETH for paying for the tx's gas)
    //   - It has to be mined, so it isn't immediately confirmed.
    //     Note that some testing networks, like Hardhat Network, do mine
    //     transactions immediately, but your dapp should be prepared for
    //     other networks.
    //   - It can fail once mined.
    //
    // This method handles all of those things, so keep reading to learn how to
    // do it.

    try {
      // If a transaction fails, we save that error in the component's state.
      // We only save one such error, so before sending a second transaction, we
      // clear it.
      this._dismissTransactionError();

      // We send the transaction, and save its hash in the Dapp's state. This
      // way we can indicate that we are waiting for it to be mined.
      const tx = await this._token.transfer(to, amount);
      this.setState({ txBeingSent: tx.hash });

      // We use .wait() to wait for the transaction to be mined. This method
      // returns the transaction's receipt.
      const receipt = await tx.wait();

      // The receipt, contains a status flag, which is 0 to indicate an error.
      if (receipt.status === 0) {
        // We can't know the exact error that make the transaction fail once it
        // was mined, so we throw this generic one.
        throw new Error("Transaction failed");
      }

      // If we got here, the transaction was successful, so you may want to
      // update your state. Here, we update the user's balance.
      await this._updateBalance();
    } catch (error) {
      // We check the error code to see if this error was produced because the
      // user rejected a tx. If that's the case, we do nothing.
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }

      // Other errors are logged and stored in the Dapp's state. This is used to
      // show them to the user, and for debugging.
      console.error(error);
      this.setState({ transactionError: error });
    } finally {
      // If we leave the try/catch, we aren't sending a tx anymore, so we clear
      // this part of the state.
      this.setState({ txBeingSent: undefined });
    }
  }

  _resetState() {
    this.setState(this.initialState);
  }

  _dismissTransactionError() {
    this.setState({ transactionError: undefined });
  }

  _dismissNetworkError() {
    this.setState({ networkError: undefined });
  }

  _getRpcErrorMessage(error) {
    if (error.data) {
      return error.data.message;
    }

    return error.message;
  }

  _checkNetwork() {
    if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
      return true;
    }

    this.setState({
      networkError: 'Please connect Metamask to Localhost:8545'
    });

    return false;
  }

  render() {
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
    if (!this.state.selectedAddress) {
      return (
        <ConnectWallet
          connectWallet={() => this._connectWallet()}
          networkError={this.state.networkError}
          dismiss={() => this._dismissNetworkError()}
        />
      );
    }

    // If the token data or the user's balance hasn't loaded yet, we show
    // a loading component.
    if (!this.state.tokenData) {
      return <Loading />;
    }

    // If everything is loaded, we render the application.
    return (
      <Router>
        <Navigation
          connectWallet={() => this._connectWallet()}
          dismiss={() => this._dismissNetworkError()}
          minifyHash={this._minifyHash}
          networkError={this.state.networkError}
          selectedAddress={this.state.selectedAddress}
        />
        <div className="row">
          <div className="col-10 offset-1">
            {this.state.txBeingSent && (
              <WaitingForTransactionMessage txHash={this.state.txBeingSent} />
            )}
            {this.state.transactionError && (
              <TransactionErrorMessage
                message={this._getRpcErrorMessage(this.state.transactionError)}
                dismiss={() => this._dismissTransactionError()}
              />
            )}
          </div>
        </div>
        <div id="dapp">
          <Switch>
            <Route path="/" exact>
              <Home
              />
            </Route>
            <Route path="/agreement">
              <Container className="my-4 p-4">
                <Agreement
                  minifyHash={this._minifyHash}
                  optIn={() => this._optIn()}
                  optOut={() => this._optOut()}
                  selectedAddress={this.state.selectedAddress}
                />
                <Member
                  addMembers={() => this._addMembers()}
                  adminAddress={this.state.adminAddress}
                  minifyHash={this._minifyHash}
                  optedInAccounts={this.state.optedInAccounts}
                  optedOutAccounts={this.state.optedOutAccounts}
                  selectedAddress={this.state.selectedAddress}
                  totalAccounts={this.state.totalAccounts}
                />
              </Container>
            </Route>
          </Switch>
        </div>
        <Footer/>
      </Router>
    );
  }
}
