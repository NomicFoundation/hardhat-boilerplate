require("@nomiclabs/hardhat-waffle");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

const { INFURA_API_KEY, mnemonic, privateKey1, privateKey2 } = require('./secrets.json');

module.exports = { 
  networks: { 
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`, 
      accounts: { mnemonic: mnemonic }
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_API_KEY}`, 
      accounts: [privateKey1, privateKey2]
    },
  },
  solidity: "0.5.16"
};
