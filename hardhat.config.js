require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");


const INFURA_URL = 'https://kovan.infura.io/v3/222c051f43234109894f69a042bb2539';
const { INFURA_API_KEY, mnemonic, privateKey1, privateKey2, etherApiKey } = require('./secrets.json');

module.exports = {
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "8AG8KS1HVME8ZZK2U7MZG8ZJA1KE789CP8"
  },
  networkderfu: "koven",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
      accounts: { mnemonic: mnemonic }
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [privateKey1, privateKey2],
      apiKey: [etherApiKey]
    },
    bsctestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [privateKey1, privateKey2]
    }
  },
  solidity: "0.5.16"
};

