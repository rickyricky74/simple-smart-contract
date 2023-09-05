import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const { INFURA_API_KEY, LINEASCAN_API_KEY, PRIVATE_KEY } = process.env as any;

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      chainId: 31337
    },
    linea_testnet_infura: {
      url: `https://linea-goerli.infura.io/v3/${INFURA_API_KEY}}`,
      accounts: [PRIVATE_KEY]
    },
    linea_testnet: {
      url: "https://rpc.goerli.linea.build/",
      accounts: [PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: { 
      linea_testnet: LINEASCAN_API_KEY
    },
    customChains: [
      {
        network: "linea_testnet",
        chainId: 59140,
        urls: {
          apiURL: "https://api-testnet.lineascan.build/api",
          browserURL: "https://goerli.lineascan.build/address"
        }
      }
    ],
  },
  paths: {
    artifacts: "./dapp/src/abi",
  }
};

export default config;
