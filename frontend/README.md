# Sample React Dapp

This directory has a sample Dapp to interact with your contracts, built using
React.

## Running the Dapp

This project uses [`create-react-app`](https://create-react-app.dev/), so most
configuration files are handled by it.

To run it, you just need to execute `npm start` in a terminal, and open
[http://localhost:3000](http://localhost:3000).

To learn more about what `create-react-app` offers, you can read
[its documentation](https://create-react-app.dev/docs/getting-started).

## Architecture of the Dapp

This Dapp consists of multiple React Components, which you can find in
`src/components`.

Most of them are presentational components, have no logic, and just render HTML.

The core functionality is implemented in `src/components/Dapp.js`, which has
examples of how to connect to the user's wallet, initialize your Ethereum
connection and contracts, read from the contract's state, and send transactions.

You can use the `Dapp` component as a starting point for your project. It has
comments explaining each part of its code, and indicating what's specific to
this project, and what can be reused.

## Getting help and news

If you need help with this project or with Hardhat in general, please read [this guide](https://hardhat.org/hardhat-runner/docs/guides/getting-help) to learn where and how to get it.

[Follow us on Twitter](https://twitter.com/HardhatHQ) to get the latest news about Hardhat, and don't forget to star [our GitHub repository](https://github.com/NomicFoundation/hardhat)!

**Happy _building_!**
