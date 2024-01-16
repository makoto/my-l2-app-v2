import packet from 'dns-packet';
export const L1_CHAIN_ID = 11155111
export const ARB_CHAIN_ID = 421614
export const OP_CHAIN_ID = 11155420
export const BASE_CHAIN_ID = 84532
export const CHAIN_INFO={
    [ARB_CHAIN_ID]:{
      id:ARB_CHAIN_ID,
      alias:'arb',
      chainId: "0x66eee",
      rpcUrls: ["https://sepolia-rollup.arbitrum.io/rpc"],
      chainName: "Arbitrum Sepolia Testnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18
      },
      blockExplorerUrls: ["https://sepolia.arbiscan.io/"],
      L2_REGISTRAR_ADDRESS: '',
      L1_RESOLVER_ADDRESS:'0x9F3C37A6cDd5ECA7b27140856753EDBF387c06bB',
      L1_REVERSE_RESOLVER_ADDRESS:'0xDC317ef697b3A9903a24abcC325d9C1C80B19D87',
      L2_RESOLVER_ADDRESS:'',
      L2_REVERSE_REGISTRAR_ADDRESS:'0x7bB1207A7C23d620Cb22C2DcC96424CCb92272ae'
    },
    [OP_CHAIN_ID]:{
      id:OP_CHAIN_ID,
      alias:'op',
      chainId: "0xaa37dc",
      rpcUrls: ["https://sepolia.optimism.io"],
      chainName: "Optimism Sepolia Testnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18
      },
      blockExplorerUrls: ["https://sepolia-optimism.etherscan.io"],
      L2_REGISTRAR_ADDRESS: '',
      L1_RESOLVER_ADDRESS:'0xE0356133C3c43cbb623543488E607E4e349eAA10',
      L1_REVERSE_RESOLVER_ADDRESS:'0x2D6e4FDbC2CF9422CEa8fA79c4b6AC517D32cd18',
      L2_RESOLVER_ADDRESS:'',
      L2_REVERSE_REGISTRAR_ADDRESS:'0xc40cdB59896D02a500D892A5bdA1CDf54a392A1d'
    },
    [BASE_CHAIN_ID]:{
      id:BASE_CHAIN_ID,
      alias:'base',
      chainId: "0x14a34",
      rpcUrls: ["https://sepolia.base.org"],
      chainName: "Base Sepolia Testnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18
      },
      blockExplorerUrls: ["https://sepolia.basescan.org"],
      L2_REGISTRAR_ADDRESS: '',
      L1_RESOLVER_ADDRESS:'0xE00739Fc93e27aBf44343fD5FAA151c67C0A0Aa3',
      L1_REVERSE_RESOLVER_ADDRESS:'0x3d6BBfDCe5C484D9177F3a7d30e3bfe7Add5051E',
      L2_RESOLVER_ADDRESS:'',
      L2_REVERSE_REGISTRAR_ADDRESS:'0x4166B7e70F14C48980Da362256D1Da9Cc8F95e13'
    }  
}

export function isL2(chainId){
    return chainId === OP_CHAIN_ID || chainId === BASE_CHAIN_ID  || chainId === ARB_CHAIN_ID
}

export const encodeName = (name) => '0x' + packet.name.encode(name).toString('hex')