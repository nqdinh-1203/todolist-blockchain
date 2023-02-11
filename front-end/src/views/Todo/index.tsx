import React, { useEffect, useState } from 'react'
import {
    List,
    Flex,
    Button,
    Spacer,
    Heading,
    Input
} from '@chakra-ui/react'
import Task from './components/Task'
import { ITask, IWalletInfo } from '@/_types_'
import CompletedButton from './components/CompletedButton';
import { ethers } from 'ethers';
import ConnectWallet from '@/components/ConnectWallet';
import WalletInfo from '@/components/WalletInfo';
import TodoContract from '@/contracts/TodoListContract';

declare var window: any;

export default function Todo() {
    // const [taskInput, setTaskInput] = useState<string>('');
    const [task, setTask] = React.useState<ITask>({ id: 0, content: "", completed: false });
    const [list, setList] = useState<ITask[]>([]);
    const [count, setCount] = useState<number>(0);

    const [web3Provider, setWeb3Provider] = React.useState<ethers.providers.Web3Provider>();
    const [txHash, setTxHash] = React.useState<string>("");
    const [wallet, setWallet] = React.useState<IWalletInfo>();

    const handleConnectWeb3 = async () => {
        if (window.ethereum) {
            console.log("...connecting web3");

            const provider = new ethers.providers.Web3Provider(window.ethereum, undefined);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();

            const address = await signer.getAddress();
            const bigBalance = await signer.getBalance();
            const ethBalance = Number.parseFloat(ethers.utils.formatEther(bigBalance));
            setWallet({ address, amount: ethBalance });
            setWeb3Provider(provider);


            console.log("...connected web3");
        }
    }

    const getListTask = React.useCallback(async () => {
        if (!web3Provider || !wallet) return;

        console.log("...listing tasks");

        const todoContract = new TodoContract(web3Provider);
        const list = await todoContract.getTasks();

        setList(prev => list);

        console.log(list);

        console.log("...list done");
    }, [web3Provider, wallet]);

    useEffect(() => {
        getListTask()
    }, [getListTask]);

    // console.log(list);

    const handleCreateTask = async () => {
        // setTask(prev => ({ id: count, content: taskInput, completed: false }));
        if (!web3Provider || !wallet) return;

        console.log("...creating task");

        const todoContract = await new TodoContract(web3Provider);
        const tx = await todoContract.createTask(task.content);

        setTxHash(tx);
        setTask({ id: 0, content: "", completed: false });

        console.log("...create done");
        await getListTask();
    }

    const handleRemove = async (id: number) => {
        if (!web3Provider || !wallet) return;

        console.log("...removing task");

        const todoContract = await new TodoContract(web3Provider);
        const tx = await todoContract.removeTask(id);

        setTxHash(tx);
        setTask({ id: 0, content: "", completed: false });

        console.log("...remove done");
        await getListTask();
    }

    const handleToggleComplete = async (id: number) => {
        if (!web3Provider || !wallet) return;

        console.log("...toggling complete");

        const todoContract = await new TodoContract(web3Provider);
        const tx = await todoContract.toggleCompleted(id);

        setTxHash(tx);
        setTask({ id: 0, content: "", completed: false });

        console.log("...toggle done");
        await getListTask();
    }

    return (
        <Flex w={{ base: "full", lg: "70%" }}
            flexDirection="column"
            margin="50px auto"
        >
            <Flex paddingBottom="30px">
                <Heading size="lg" fontWeight="bold">
                    Blockchain Todo List
                </Heading>

                <Spacer />

                {/* <Button variant="primary">Connect Web3</Button> */}
                {!wallet && <ConnectWallet onClick={handleConnectWeb3} />}
                {wallet && <WalletInfo
                    address={wallet?.address}
                    amount={wallet?.amount || 0}
                />}
            </Flex>

            <Flex>
                <Input
                    w="60%"
                    value={task.content}
                    onChange={(e) => setTask({ id: count, content: e.target.value, completed: false })} placeholder="Input task here">
                </Input>
                <Button
                    marginLeft="30px"
                    fontSize="20px"
                    onClick={handleCreateTask}
                >
                    Add task
                </Button>
            </Flex>

            <List fontSize="30px" py="30px">
                {
                    list.map((task, index) => {
                        return task.content !== "" ?
                            <Flex key={index} py="5px">
                                <CompletedButton
                                    isCompleted={task.completed}
                                    id={task.id}
                                    onToggleComplete={() => handleToggleComplete(task.id)}
                                />

                                <Task
                                    task={task}
                                    onRemove={() => handleRemove(task.id)}
                                />
                            </Flex>
                            : <div key={index}></div>
                    }
                    )
                }
            </List>
        </Flex >
    )
}

// remove element in array of object have id in ts