import * as dotenv from 'dotenv';
dotenv.config()

import Web3 from 'web3';

import { readJSONFile } from './helper';

// Call the function with a valid file name 
const data = readJSONFile('../artifacts/contracts/TodoList.sol/TodoList.json');

// Access an element in the json object by its key name  
const todoListAbi = data['abi'];

const todoListAddress = "0x58D639cDC7774B927A5736Bbd5ed977Bf1B891f8";

const myPrivateKey = `${process.env.GANACHE_PRIVATE_KEY}`;
const myAddress = `${process.env.GANACHE_PUBLIC_KEY}`;


async function interact() {
    let web3 = await new Web3("http://127.0.0.1:7545");

    let todoListContract = await new web3.eth.Contract(todoListAbi, todoListAddress);

    await web3.eth.accounts.wallet.add(myPrivateKey);

    let taskCount = await todoListContract.methods.taskCount().call();

    console.log(taskCount);

    // let result = await todoListContract.methods.createTask("Hoc Rust").send({
    //     from: myAddress,
    //     gas: 300000
    // })

    // console.log("create task: ", result);

    let list = await todoListContract.methods.getTasks().call();


    console.log("create task: ", list);
}

interact();