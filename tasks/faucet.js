const fs = require("fs");

// This file is only here to make interacting with the Dapp easier,
// feel free to ignore it if you don't need it.

task("faucet", "Sends ETH and tokens to an address")
  .addPositionalParam("receiver", "The address that will receive them")
  .setAction(async ({ receiver }) => {
    if (network.name === "hardhat") {
      console.warn(
        "You are running the faucet task with Hardhat network, which" +
          "gets automatically created and destroyed every time. Use the Hardhat" +
          " option '--network localhost'"
      );
    }

    const addressesFile =
      __dirname + "/../frontend/src/contracts/contract-address.json";

    if (!fs.existsSync(addressesFile)) {
      console.error("You need to deploy your contract first");
      return;
    }

    const addressJson = fs.readFileSync(addressesFile);
    const address = JSON.parse(addressJson);

    if ((await ethers.provider.getCode(address.Token)) === "0x") {
      console.error("You need to deploy your contract first");
      return;
    }

    const token = await ethers.getContractAt("Token", address.Token);
    const [sender] = await ethers.getSigners();
  
    // 0.1ETH
    let bn1 = ethers.BigNumber.from("100000000000000000");
    // 1 ETH
    console.log('wei/eth: ', ethers.constants.WeiPerEther)
    // ethers.constants.WeiPerEther.mul(5000);
    
    // const tokenAmount = Number.MAX_SAFE_INTEGER
    const tokenAmount = 9*(1e15)
    
    const tx = await token.transfer(receiver, tokenAmount );
    // const tx = await token.transfer(receiver, 1);
    await tx.wait();

    const tx2 = await sender.sendTransaction({
      to: receiver,
      value: bn1,
    });
    await tx2.wait();

    console.log(`Transferred ${bn1.toString()} Wei (ETH) and ${tokenAmount/(1e18)} PSU tokens to ${receiver}`);
  });
