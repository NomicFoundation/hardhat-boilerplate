import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { config as dotEnvConfig } from "dotenv";

// To load all available tasks you should it via manual import.
// Thus, we imported index.ts of the ./tasks module.
import "./tasks";

dotEnvConfig();


const DEFAULT_GAS_PRICE = 100_000_000_000
const ENV_TESTNET_PRIVATE_KEY = process.env?.["PRIVATE_KEY"] ? [process.env?.["PRIVATE_KEY"]] : undefined
const GANACHE_PRIVATE_KEYS = ["0x8d69c158e4da48d8b4c17410149f5dc9d5e58a1f5c8b36e3aad3907234bb0810"]


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
      accounts: ENV_TESTNET_PRIVATE_KEY,
      chainId: 80001,
      gasPrice: DEFAULT_GAS_PRICE,
    },
    // One of the really available testnets with faucet coins (6 Aug 2023).
    testnetSepolia: {
      url: process.env["TESTNET_SEPOLIA_RPC"] ?? "",
      accounts: ENV_TESTNET_PRIVATE_KEY,
      chainId: 11155111,
      gasPrice: DEFAULT_GAS_PRICE,
    },
    // For the Ganache testnet.
    ganacheAws: {
      url: process.env["GANACHE_AWS_RPC"] ?? "",
      accounts: GANACHE_PRIVATE_KEYS,
      chainId: 1337,
      gasPrice: DEFAULT_GAS_PRICE,
    },
  }
};

export default config;

