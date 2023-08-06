import {task} from "hardhat/config";
import * as fs from "fs";
import {readFileSync} from "fs";
import {HardhatRuntimeEnvironment} from "hardhat/types";

// This file is only here to make interacting with the Dapp easier,
// feel free to ignore it if you don't need it.

type Args = {
    receiver: string;
};

task("faucet", "Sends ETH and tokens to an address")
  .addPositionalParam("receiver", "The address that will receive them")
  .setAction(async (args: Args, hre: HardhatRuntimeEnvironment) => {
    const network = await hre.ethers.provider.getNetwork();
    if (network.chainId === 31337) {
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

    const addressJson = readFileSync(addressesFile, "utf-8");
    const address = JSON.parse(addressJson);

    if ((await hre.ethers.provider.getCode(address.Token)) === "0x") {
      console.error("You need to deploy your contract first");
      return;
    }

    const token = await hre.ethers.getContractAt("Token", address.Token);
    const [sender] = await hre.ethers.getSigners();

    const tx = await token.transfer(args.receiver, 100);
    await tx.wait();

    const tx2 = await sender.sendTransaction({
      to: args.receiver,
      value: hre.ethers.constants.WeiPerEther,
    });
    await tx2.wait();

    console.log(`Transferred 1 ETH and 100 tokens to ${args.receiver}`);
  });
