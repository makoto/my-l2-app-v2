export const L1_CHAIN_ID = 5
export const OP_CHAIN_ID = 420
export const BASE_CHAIN_ID = 84531
export const CHAIN_INFO={
    'op':{
      chainId: "0x1a4",
      rpcUrls: ["https://endpoints.omniatech.io/v1/op/goerli/public"],
      chainName: "Optimism Goerli Testnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18
      },
      blockExplorerUrls: ["https://goerli-optimism.etherscan.io"]
    },
    'base':{
      chainId: "0x14a33",
      rpcUrls: ["https://goerli.base.org"],
      chainName: "Base Goerli Testnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18
      },
      blockExplorerUrls: ["https://goerli.basescan.org"]
    }  
}

export function isL2(chainId){
    return chainId === OP_CHAIN_ID || chainId === BASE_CHAIN_ID
}