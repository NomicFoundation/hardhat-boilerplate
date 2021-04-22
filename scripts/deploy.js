const { saveFrontendFiles } = require("./_utils");

// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
      "gets automatically created and destroyed every time. Use the Hardhat" +
      " option '--network localhost'"
    );
  }

  // ethers is avaialble in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy all the contracts here
  const contractsObj = {
    "Token": await deployContract("Token"),
    "CrazyExperiments": await deployExperiments("Experiments", "Crazy experiments"),
    "WiseExperiments": await deployExperiments("Experiments", "Wise experiments"),
  };

  // Save the frontend related files
  saveFrontendFiles(contractsObj);
}

/**
 * Generic deploy contract
 * @param {String} contractName 
 * @returns Object
 */
async function deployContract(contractName) {
  const Contract = await ethers.getContractFactory(contractName);
  const instance = await Contract.deploy();
  await instance.deployed();
  console.log(`${contractName} address: ${instance.address}`);
  return {
    contractName,
    address: instance.address
  };
}

/**
 * Deploy an Experiments contract with its custom initialisers
 * @param {String} name Experiment name
 * @returns Object
 */
async function deployExperiments(contractName, name) {
  const Experiments = await ethers.getContractFactory(contractName);
  const instance = await Experiments.deploy(name);
  await instance.deployed();
  console.log(`${contractName}(${name}) address: ${instance.address}`);
  return {
    contractName,
    address: instance.address
  };
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
