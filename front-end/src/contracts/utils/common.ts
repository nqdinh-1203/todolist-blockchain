// import * as dotenv from 'dotenv';
// dotenv.config()

export type AddressType = {
    97: string;
    56: string;
}

export enum CHAIN_ID {
    TESTNET = 97,
    MAINNET = 56
}

// export default function getChainIdFromEnv(): number {
//     const env = process.env.NEXT_PUBLIC_CHAIN_ID;
//     if (!env) {
//         return 97;
//     }
//     return parseInt(env)
// }

export const getRPC = () => {
    // if (getChainIdFromEnv() === CHAIN_ID.MAINNET) {
    //     return process.env.NEXT_PUBLIC_RPC_MAINNET;
    // }
    // console.log(process.env.NEXT_PRIVATE_RPC_TESTNET);
    return "http://127.0.0.1:7545";
}

export const SMART_ADDRESS = {
    TODO: { 97: "0x58D639cDC7774B927A5736Bbd5ed977Bf1B891f8", 56: "" },
}