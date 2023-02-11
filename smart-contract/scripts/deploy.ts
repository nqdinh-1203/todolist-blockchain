import { ethers, hardhatArguments } from "hardhat";
import * as Config from "./config";

import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

async function main() {
  await Config.initConfig();
  const network = hardhatArguments.network ? hardhatArguments.network : "dev";
  const [deployer] = await ethers.getSigners();
  console.log("Deploying from address: ", deployer.address);

  // const Hero = await ethers.getContractFactory("Hero");
  // const hero = await Hero.deploy();
  // console.log("Hero address: ", await hero.address);
  // Config.setConfig(network + '.Hero', await hero.address);

  const Todo = await ethers.getContractFactory("TodoList");
  const todo = await Todo.deploy();
  console.log("Todo List address: ", await todo.address);
  Config.setConfig(network + '.TodoList', await todo.address);

  await Config.updateConfig();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// IERC721Receiver for what?
