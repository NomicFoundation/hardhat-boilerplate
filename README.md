# Buidler Hackathon Boilerplate
This repository contains a sample project that you can use as starting point for your Ethereum project. It's also a great fit for learning the basics of smart contract development.

This project is intended to be used for the [Buidler Beginners Tutorial](http://buidler.dev/tutorial), but you should be able to follow it by yourself by reading the README and exploring its `contracts`, `tests`, `scripts` and `frontend/src` directories.

## Quick Overview
Open a terminal, clone this repository and run:

```
npm install
npx buidler node
```

On a new terminal, go to this repository root folder and run:

```
npx buidler run scripts/deploy-frontend.js --network localhost
cd frontend
npm install
npm start
```

Then, open `http://localhost:3000/` to see your dapp. You will need to have [Metamask](http://metamask.io) installed and listening to `Localhost 8545`.

## User Guide
You can find detailed instructions on using this repository and many tips in [its documentation](http://buidler.dev/tutorial).

- [Project description (Token.sol)](http://buidler.dev/tutorial/4-contracts/)
- [Setting up the environment](http://buidler.dev/tutorial/1-setup/)
- [Testing with Buidler, Mocha and Waffle](http://buidler.dev/tutorial/5-test/)
- [Setting up Metamask](http://buidler.dev/tutorial/8-frontend/#setting-up-metamask)
- [Buidler's full documentation](https://buidler.dev/getting-started/)

For a complete introduction to Buidler, refer to [this guide](https://buidler.dev/getting-started/#overview).

## What’s Included?
Your environment will have everything you need to build a dapp powered by Buidler and React.

- [Buidler](https://buidler.dev/): An Ethereum development task runner and testing network.
- [Mocha](https://mochajs.org/): A JavaScript test runner.
- [Chai](https://www.chaijs.com/): A JavaScript assertion library.
- [ethers.js](https://docs.ethers.io/ethers.js/html/): A JavaScript library for interacting with Ethereum.
- [Waffle](https://github.com/EthWorks/Waffle/): To have Ethereum-specific Chai assertions/mathers.
- [Create React App](https://github.com/facebook/create-react-app): Create React apps with no build configuration.

## Troubleshooting  

- `Invalid nonce`: if you are seeing this error on the `buidler node` console, try resetting your Metamask account. This will reset the account's transaction history and also the nonce. Open Metamask, click on your account followed by `Settings > Advanced > Reset Account`. 

## Feedback, help and news

We'd love to have your feedback on this tutorial. Feel free to reach us through this repository or [our Telegram Support Group](https://t.me/BuidlerSupport).

Also you can [follow Nomic Labs on Twitter](https://twitter.com/nomiclabs).


**Happy *buidling*!**