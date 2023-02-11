import { Button, HStack, Image, Text, Spacer } from "@chakra-ui/react"
import React from 'react'
import { numberFormat, showSortAddress } from "@/utils"

interface IProp {
    address?: string,
    amount: number,
}

//showSortAddress(address)}
// {numberFormat(amount)}
//

export default function WalletInfo({ address, amount }: IProp) {
    return (
        <Button variant="outline" ml="10px">
            <HStack>
                <Text>{showSortAddress(address)}</Text>
                <Spacer />
                <Text>{numberFormat(amount)} ETH</Text>
            </HStack>
        </Button>
    )
}