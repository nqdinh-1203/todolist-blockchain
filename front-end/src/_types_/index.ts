export interface IWalletInfo {
    address: string,
    amount: number
}

export interface ITask {
    id: number;
    content: string;
    completed: boolean;
}