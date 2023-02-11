import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const config: HardhatUserConfig = {
  solidity: "0.8.17",

  networks: {
    ganache: {
      url: `http://127.0.0.1:7545`,
      accounts: [`${process.env.GANACHE_PRIVATE_KEY}`]
    }
  },
};

export default config;
