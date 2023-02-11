import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "@ethersproject/contracts";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import * as chai from "chai";
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe('TodoList Contract', () => {
    let todoList: Contract;
    let signer: SignerWithAddress;

    async function deployVaultFixture() {
        await ethers.provider.send("hardhat_reset", []);
        [signer] = await ethers.getSigners();

        const TodoList = await ethers.getContractFactory("TodoList", signer);
        todoList = await TodoList.deploy();
        await todoList.deployed();

        return { todoList, signer };
    }

    it('Should create a task', async () => {
        const { todoList } = await loadFixture(deployVaultFixture);

        const task = 'Go to the gym';
        await todoList.createTask(task);
        const result = await todoList.tasks(1);

        // console.log(result);

        expect(result.content).to.eq(task);
        expect(result.completed).to.be.false;
    });

    it('should remove a task', async () => {
        const { todoList } = await loadFixture(deployVaultFixture);

        const task = 'Go to the grocery store';
        await todoList.createTask(task);
        await todoList.removeTask(1);
        const result = await todoList.tasks(1);

        expect(result.content).to.eq('');
        expect(result.completed).to.be.false;
    });

    it('should toggle the completed state of a task', async () => {
        const { todoList } = await loadFixture(deployVaultFixture);

        const task = 'Do laundry';
        await todoList.createTask(task);
        await todoList.toggleCompleted(1);

        const result = await todoList.tasks(1);

        expect(result.content).to.eq(task);
        expect(result.completed).to.be.true;
    });

    it("gets all tasks", async () => {
        const { todoList } = await loadFixture(deployVaultFixture);

        await todoList.createTask("Task 1");
        await todoList.createTask("Task 2");

        const result = await todoList.getTasks();

        console.log(result);

        expect(result.length).to.equal(3);
        expect(result[1].content).to.equal("Task 1");
        expect(result[2].content).to.equal("Task 2");
    });
});
