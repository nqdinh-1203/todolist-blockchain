import { ITask } from "@/_types_";
import { ethers } from "ethers";
import { BaseInterface } from "./interfaces";
import { getTodoAbi } from "./utils/getAbi";
import { getTodoListAddress } from "./utils/getAddress";

export default class TodoContract extends BaseInterface {
    constructor(provider: ethers.providers.Web3Provider) {
        super(provider, getTodoListAddress(), getTodoAbi());
    }

    async createTask(content: string) {
        const tx = await this._contract.createTask(content, this._option);
        return this._handleTransactionRespone(tx);
    }

    async removeTask(id: number) {
        const tx = await this._contract.removeTask(id, this._option);
        return this._handleTransactionRespone(tx);
    }

    async getTasks(): Promise<ITask[]> {
        const tasks = await this._contract.getTasks();
        const list: ITask[] = tasks.map((task: any) => ({
            id: this._toNumber(task.id),
            content: task.content,
            completed: task.completed
        }))
        return list;
    }

    async toggleCompleted(id: number) {
        const tx = await this._contract.toggleCompleted(id, this._option);
        return this._handleTransactionRespone(tx);
    }
}