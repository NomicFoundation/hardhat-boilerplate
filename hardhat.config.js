require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");


<<<<<<< HEAD
const INFURA_URL = 'https://kovan.infura.io/v3/${INFURA_API_KEY}';
const { INFURA_API_KEY, mnemonic, privateKey1, privateKey2, etherApiKey } = require('./secrets.json');

module.exports = {
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: [etherApiKey]
  },
  networkderfu: "koven",
  networks: {
=======
const INFURA_URL = 'https://kovan.infura.io/v3/222c051f43234109894f69a042bb2539';
const { INFURA_API_KEY, mnemonic, privateKey1, privateKey2,etherApiKey } = require('./secrets.json');

module.exports = { 
   etherscan: {
  // Your API key for Etherscan
  // Obtain one at https://etherscan.io/
  apiKey: "A463IBMU5GBGC2MJZ5KPVW2GATQGFIXY59"
},
  networkderfu:"koven",
  networks: { 
>>>>>>> parent of 4d2a9d7 (**)
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`, 
      accounts: { mnemonic: mnemonic }
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_API_KEY}`, 
      accounts: [privateKey1, privateKey2],
      apiKey: [etherApiKey]
    },
<<<<<<< HEAD
    bsctestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasPrice: 20000000000,
      accounts: [privateKey1, privateKey2]
    }
=======
>>>>>>> parent of 4d2a9d7 (**)
  },
  solidity: {
    compilers: [
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
    version: "0.7.0",
    settings: {},
  }
};

