import React from 'react'
import { Button, Flex } from '@chakra-ui/react'

interface IProps {
    isCompleted: boolean;
    id: number;
    onToggleComplete?: (id: number) => void
}

export default function CompletedButton({ isCompleted, id, onToggleComplete }: IProps) {
    return (
        <Button
            bgColor={isCompleted ? 'green.400' : 'red.400'}
            mr="30px"
            onClick={() => { onToggleComplete && onToggleComplete(id) }}
        >
            {isCompleted ? 'Completed' : 'Uncomplete'}
        </Button>
    )
}