import { Button, Flex, ListItem } from '@chakra-ui/react'
import React from 'react';
import { ITask } from '@/_types_';

interface IProps {
    task: ITask,
    onRemove?: (id: number) => void,
    // 
}

export default function Task({ task, onRemove }: IProps) {
    return (
        <Flex flexDirection="row">
            <ListItem>
                <Flex flexDirection="row">
                    {task.content}
                </Flex>
            </ListItem >

            <Button bgColor="yellow.400" mx="20px" mt="5px" size="sm" onClick={() => onRemove && onRemove(task.id)}>Remove</Button>
        </Flex>
    )
}

// how to remove element in array via ts