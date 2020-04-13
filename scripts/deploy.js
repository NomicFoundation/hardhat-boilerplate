const fs = require("fs");

async function main() {
  if (network.name === "buidlerevm") {
    throw new Error(
      `You are trying to deploy a contract to the Buidler EVM network, which gets automatically created and destroyed every time. Use the Buidler option '--network localhost'`
    );
  }

  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );
  
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();

  console.log("Token address:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

