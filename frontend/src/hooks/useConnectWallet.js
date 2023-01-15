import { useEffect, useState } from "react";
// We'll use ethers to interact with the Ethereum network and our contract
import { ethers } from "ethers";
// We import the contract's artifacts and address here, as we are going to be
// using them with ethers
import TokenArtifact from "../contracts/Token.json";
import contractAddress from "../contracts/contract-address.json";

// This is the Hardhat Network id that we set in our hardhat.config.js.
// Here's a list of network ids https://docs.metamask.io/guide/ethereum-provider.html#properties
// to use when deploying to other networks.
const HARDHAT_NETWORK_ID = "31337";

// This is an error code that indicates that the user canceled a transaction
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

const getTokenData = async (token) => {
  const [name, symbol] = await Promise.all([token.name(), token.symbol()]);
  return { name, symbol };
};

const useConnectWallet = () => {
  const [provider, setProvider] = useState();
  const [token, setToken] = useState();
  const [tokenData, setTokenData] = useState();
  const [selectedAddress, setSelectedAddress] = useState();
  const [balance, setBalance] = useState();
  const [txBeingSent, setTxBeingSent] = useState();
  const [transactionError, setTransactionError] = useState();
  const [networkError, setNetworkError] = useState();

  const _resetState = () => {
    setTokenData(undefined);
    setSelectedAddress(undefined);
    setBalance(undefined);
    setTxBeingSent(undefined);
    setTransactionError(undefined);
    setNetworkError(undefined);
  };

  const _initialize = async (selectedAddress) => {
    setSelectedAddress(selectedAddress);

    // We first initialize ethers by creating a provider using window.ethereum
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    // Then, we initialize the contract using that provider and the token's
    // artifact. You can do this same thing with your contracts.
    const token = new ethers.Contract(
      contractAddress.Token,
      TokenArtifact.abi,
      provider.getSigner(0)
    );
    setToken(token);

    const tokenData = await getTokenData(token);
    console.log("tokenData", tokenData);
    setTokenData(tokenData);
  };

  // This method checks if Metamask selected network is Localhost:8545
  const checkNetwork = () => {
    if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
      return true;
    }

    setNetworkError("Please connect Metamask to Localhost:8545");

    return false;
  };

  const updateBalance = async () => {
    const balance = await token.balanceOf(selectedAddress);
    setBalance(balance);
  };

  const connectWallet = async () => {
    // This method is run when the user clicks the Connect. It connects the
    // dapp to the user's wallet, and initializes it.

    // To connect to the user's wallet, we have to run this method.
    // It returns a promise that will resolve to the user's address.
    const [selectedAddress] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // Once we have the address, we can initialize the application.

    // First we check the network
    if (!checkNetwork()) {
      return;
    }

    _initialize(selectedAddress);
  };

  // This method sends an ethereum transaction to transfer tokens.
  // While this action is specific to this application, it illustrates how to
  // send a transaction.
  const transferTokens = async (to, amount) => {
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
      setTransactionError(undefined);

      // We send the transaction, and save its hash in the Dapp's state. This
      // way we can indicate that we are waiting for it to be mined.
      const tx = await token.transfer(to, amount);
      setTxBeingSent(tx.hash);

      // We use .wait() to wait for the transaction to be mined. This method
      // returns the transaction's receipt.
      const receipt = await tx.wait();

      // The receipt, contains a status flag, which is 0 to indicate an error.
      if (receipt.status === 0) {
        // We can't know the exact error that made the transaction fail when it
        // was mined, so we throw this generic one.
        throw new Error("Transaction failed");
      }

      // If we got here, the transaction was successful, so you may want to
      // update your state. Here, we update the user's balance.
      await updateBalance();
    } catch (error) {
      // We check the error code to see if this error was produced because the
      // user rejected a tx. If that's the case, we do nothing.
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }

      // Other errors are logged and stored in the Dapp's state. This is used to
      // show them to the user, and for debugging.
      console.error(error);
      setTransactionError(error);
    } finally {
      // If we leave the try/catch, we aren't sending a tx anymore, so we clear
      // this part of the state.
      setTxBeingSent(undefined);
    }
  };

  useEffect(() => {
    const handleAccountsChanged = ([newAddress]) => {
      // `accountsChanged` event can be triggered with an undefined newAddress.
      // This happens when the user removes the Dapp from the "Connected
      // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
      // To avoid errors, we reset the dapp state
      if (newAddress === undefined) {
        return _resetState();
      }

      connectWallet();
    };

    const handleChainChanged = ([networkId]) => {
      _resetState();
    };

    // We reinitialize it whenever the user changes their account.
    window.ethereum.on("accountsChanged", handleAccountsChanged);

    // We reset the dapp state if the network is changed
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  useEffect(() => {
    if (!token || !selectedAddress) {
      return;
    }
    updateBalance();

    if (selectedAddress) {
      const pollDataInterval = setInterval(() => updateBalance(), 1000);

      return () => {
        clearInterval(pollDataInterval);
      };
    }
  }, [selectedAddress, token, updateBalance]);

  return {
    connectWallet,
    transferTokens,
    tokenData,
    selectedAddress,
    balance,
    txBeingSent,
    transactionError,
    networkError,
    setTransactionError,
  };
};

export default useConnectWallet;
