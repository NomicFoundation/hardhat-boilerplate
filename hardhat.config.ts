import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { config as dotEnvConfig } from "dotenv";
// To load all available tasks you should it via manual import.
// Thus, we imported index.ts of the ./tasks module.
import "./tasks";

dotEnvConfig();

const DEFAULT_GAS_PRICE = 100_000_000_000
const PRIVATE_KEYS = process.env?.["PRIVATE_KEY"] ? [process.env?.["PRIVATE_KEY"]] : undefined


const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    testnet: {
      url: process.env["TESTNET_RPC"] ?? "",
      accounts: PRIVATE_KEYS,
      chainId: 80001,
      gasPrice: DEFAULT_GAS_PRICE,
    },
    testnetSepolia: {
      url: process.env["TESTNET_SEPOLIA_RPC"] ?? "",
      accounts: PRIVATE_KEYS,
      chainId: 11155111,
      gasPrice: DEFAULT_GAS_PRICE,
    },
    // For the Hardhat dev node.
    hardhatDevNode: {
      url: process.env["HARDHAT_DEV_NODE_RPC"] ?? "",
      accounts: process.env?.["HARDHAT_DEV_NODE_PRIVATE_KEY"] ? [process.env?.["HARDHAT_DEV_NODE_PRIVATE_KEY"]] : undefined,
      chainId: 31337,
      gasPrice: DEFAULT_GAS_PRICE,
    },
  }
};

export default config;

