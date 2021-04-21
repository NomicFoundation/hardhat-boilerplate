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

  // Deploy contracts
  await deployToken();
  await deployExperiments();
}


async function deployToken() {
  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();
  saveFrontendFiles(token);
  console.log("Token address:", token.address);
}


async function deployExperiments() {
  const Experiments = await ethers.getContractFactory("Experiments");
  const experiments = await Experiments.deploy();
  await experiments.deployed();
  saveFrontendFiles(experiments);
  console.log("Experiments address:", experiments.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
