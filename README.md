# Hardhat Boilerplate

This repository contains a sample project that you can use as the starting point
for your Ethereum project. It's also a great fit for learning the basics of
smart contract development.

This project is intended to be used with the
[Hardhat Beginners Tutorial](https://hardhat.org/tutorial), but you should be
able to follow it by yourself by reading the README and exploring its
`contracts`, `tests`, `scripts` and `frontend` directories.

# Additional Feature
Additional to the first example that discussed in [Hardhat Beginners Tutorial](https://hardhat.org/tutorial) 
mentioned above.

- [x] support env
- [x] support ts
- [x] deploy pkg ci
- [ ] migrate to pnpm
- [x] npm package
- [x] add ci tests

# Typechain-types for Contracts
When typechain types integrated into Hardhat it allows you to use in hardhat scripts the next pattern:

```typescript
// E.g. inside scripts/deploy.ts.
import {Token} from "../typechain-types";
const token = await Token.deploy() as Token;
```

**Warn**
> When you run Hardhat scripts, e.g. `npx hardhat run scripts`, you allow hardhat runtime to firstly compile 
typechain types of your contracts and then run your scripts, but for a Hardhat tasks it is not the same. 

Thus, it is highly recommended running `npx hardhat run typechain` before running the Hardhat task.

# Frontend Integration
TL;DR: 

Suppose that the actual frontend needs to be used via NPM package (e.g. public registry.npmjs.org),
and even with help of predefined special backend-for-frontend class (e.g. ContractClient class).

But for some reasons, e.g. hackathons, it will be faster and simple to debug with local frontend app 
(i.e. in the same repo) with typechain types and contract address file injection, e.g. [example frontend](frontend), 
where typechain-types and contract address is accessible. 

Both variants of the usage will be discussed below.

## Mono-repo
**in progress...**

[frontend](frontend) in progress: should be replaced with ReactAppp on TS example

## Package Integration

[comment]: <> (In [package README.md]&#40;packages/zkturk-contract-artifacts/README.md&#41; all info collected on how to work in a real )

## Quick start

The first things you need to do are cloning this repository and installing its
dependencies:

```sh
git clone https://github.com/NomicFoundation/hardhat-boilerplate.git
cd hardhat-boilerplate
npm install
```

In the repo demonstration Hardhat scripts and tasks preserved. 
Below is ste-by-step flow about the iteratction with the features. 

Once installed, let's run Hardhat's testing network:

```sh
npx hardhat node
```

Then, on a new terminal, go to the repository's root folder and run this to
deploy your contract:

```sh
npx hardhat run scripts/deploy.ts --network localhost
```

To check that hardhat task, [faucet.ts](tasks/faucet.ts), will transfer 1 eth 
to provided address from **already deployed** contract, run the next command:

```sh
 npx hardhat faucet 0x795a04d0F74e892c452bB45747dFFdcDA286FBE7 --network localhost
```

Finally, we can run the frontend with:

```sh
cd frontend
npm install
npm start
```

Open [http://localhost:3000/](http://localhost:3000/) to see your Dapp. You will
need to have [Coinbase Wallet](https://www.coinbase.com/wallet) or [Metamask](https://metamask.io) installed and listening to
`localhost 8545`.

## User Guide

You can find detailed instructions on using this repository and many tips in [its documentation](https://hardhat.org/tutorial).

- [Writing and compiling contracts](https://hardhat.org/tutorial/writing-and-compiling-contracts/)
- [Setting up the environment](https://hardhat.org/tutorial/setting-up-the-environment/)
- [Testing Contracts](https://hardhat.org/tutorial/testing-contracts/)
- [Setting up your wallet](https://hardhat.org/tutorial/boilerplate-project#how-to-use-it)
- [Hardhat's full documentation](https://hardhat.org/docs/)

For a complete introduction to Hardhat, refer to [this guide](https://hardhat.org/getting-started/#overview).

## What's Included?

This repository uses our recommended hardhat setup, by using our [`@nomicfoundation/hardhat-toolbox`](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-toolbox). When you use this plugin, you'll be able to:

- Deploy and interact with your contracts using [ethers.js](https://docs.ethers.io/v5/) and the [`hardhat-ethers`](https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-ethers) plugin.
- Test your contracts with [Mocha](https://mochajs.org/), [Chai](https://chaijs.com/) and our own [Hardhat Chai Matchers](https://hardhat.org/hardhat-chai-matchers) plugin.
- Interact with Hardhat Network with our [Hardhat Network Helpers](https://hardhat.org/hardhat-network-helpers).
- Verify the source code of your contracts with the [hardhat-etherscan](https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-etherscan) plugin.
- Get metrics on the gas used by your contracts with the [hardhat-gas-reporter](https://github.com/cgewecke/hardhat-gas-reporter) plugin.
- Measure your tests coverage with [solidity-coverage](https://github.com/sc-forks/solidity-coverage).

This project also includes [a sample frontend/Dapp](./frontend), which uses [Create React App](https://github.com/facebook/create-react-app).

## Troubleshooting

- `Invalid nonce` errors: if you are seeing this error on the `npx hardhat node`
  console, try resetting your Metamask account. This will reset the account's
  transaction history and also the nonce. Open Metamask, click on your account
  followed by `Settings > Advanced > Clear activity tab data`.

## Setting up your editor

[Hardhat for Visual Studio Code](https://hardhat.org/hardhat-vscode) is the official Hardhat extension that adds advanced support for Solidity to VSCode. If you use Visual Studio Code, give it a try!

## Getting help and updates

If you need help with this project, or with Hardhat in general, please read [this guide](https://hardhat.org/hardhat-runner/docs/guides/getting-help) to learn where and how to get it.

For the latest news about Hardhat, [follow us on Twitter](https://twitter.com/HardhatHQ), and don't forget to star [our GitHub repository](https://github.com/NomicFoundation/hardhat)!

**Happy _building_!**
