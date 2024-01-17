import packet from 'dns-packet';
export const L1_CHAIN_ID = 11155111
export const ARB_CHAIN_ID = 421614
export const OP_CHAIN_ID = 11155420
export const BASE_CHAIN_ID = 84532
export const L2_CHAIN_IDS = [ARB_CHAIN_ID,BASE_CHAIN_ID,OP_CHAIN_ID]
export const CHAIN_INFO={
    [ARB_CHAIN_ID]:{
      id:ARB_CHAIN_ID,
      alias:'arb',
      chainId: "0x66eee",
      coinType:2147905262,
      rpcUrls: ["https://sepolia-rollup.arbitrum.io/rpc"],
      chainName: "Arbitrum Sepolia Testnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18
      },
      blockExplorerUrls: ["https://sepolia.arbiscan.io/"],
      L2_REGISTRAR_ADDRESS: '0xdd8f96e422681e7ea04b46b0151a5b9043348ff1',
      L1_RESOLVER_ADDRESS:'0x9F3C37A6cDd5ECA7b27140856753EDBF387c06bB',
      L1_REVERSE_RESOLVER_ADDRESS:'0xDC317ef697b3A9903a24abcC325d9C1C80B19D87',
      L2_RESOLVER_ADDRESS:'0xa0Ed81518Bf5Dadb75AC5d5565fCEC2529CBC286',
      L2_RESOLVER_FACTORY_ADDRESS:'0x94fbCE7ca1a0152cfC99F90f4421d31cf356c896',
      L2_REVERSE_REGISTRAR_ADDRESS:'0x7bB1207A7C23d620Cb22C2DcC96424CCb92272ae'
    },
    [OP_CHAIN_ID]:{
      id:OP_CHAIN_ID,
      alias:'op',
      chainId: "0xaa37dc",
      coinType:2158639068,
      rpcUrls: ["https://sepolia.optimism.io"],
      chainName: "Optimism Sepolia Testnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18
      },
      blockExplorerUrls: ["https://sepolia-optimism.etherscan.io"],
      L2_REGISTRAR_ADDRESS: '0x6cc65ef364f16d31f1386be1e4b69171925ffc04',
      L1_RESOLVER_ADDRESS:'0xE0356133C3c43cbb623543488E607E4e349eAA10',
      L1_REVERSE_RESOLVER_ADDRESS:'0x2D6e4FDbC2CF9422CEa8fA79c4b6AC517D32cd18',
      L2_RESOLVER_ADDRESS:'0xea8729D2007380b15207cA29aE1c7124e0fCbFf6',
      L2_RESOLVER_FACTORY_ADDRESS:'0x4166B7e70F14C48980Da362256D1Da9Cc8F95e13',
      L2_REVERSE_REGISTRAR_ADDRESS:'0xc40cdB59896D02a500D892A5bdA1CDf54a392A1d'
    },
    [BASE_CHAIN_ID]:{
      id:BASE_CHAIN_ID,
      alias:'base',
      chainId: "0x14a34",
      coinType:2147568180,
      rpcUrls: ["https://sepolia.base.org"],
      chainName: "Base Sepolia Testnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18
      },
      blockExplorerUrls: ["https://sepolia.basescan.org"],
      L2_REGISTRAR_ADDRESS: '0x7bb1207a7c23d620cb22c2dcc96424ccb92272ae',
      L1_RESOLVER_ADDRESS:'0xF9610D220975D38346B2355A32ed854aa798C883',
      L1_REVERSE_RESOLVER_ADDRESS:'0x3d6BBfDCe5C484D9177F3a7d30e3bfe7Add5051E',
      L2_RESOLVER_ADDRESS:'0x7Db35126375e1EEAde3751B2BaEb0254d773F7b2',
      L2_RESOLVER_FACTORY_ADDRESS:'0x0e8DA38565915B7e74e2d78F80ba1BF815F34116',
      L2_REVERSE_REGISTRAR_ADDRESS:'0x4166B7e70F14C48980Da362256D1Da9Cc8F95e13'
    }  
}

export function isL2(chainId){
    return chainId === OP_CHAIN_ID || chainId === BASE_CHAIN_ID  || chainId === ARB_CHAIN_ID
}

export const encodeName = (name) => '0x' + packet.name.encode(name).toString('hex')