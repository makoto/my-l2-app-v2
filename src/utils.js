import packet from 'dns-packet';
export const L1_CHAIN_ID = 11155111
export const ARB_CHAIN_ID = 421614
export const OP_CHAIN_ID = 11155420
export const BASE_CHAIN_ID = 84532
export const L2_CHAIN_IDS = [ARB_CHAIN_ID,BASE_CHAIN_ID,OP_CHAIN_ID]
export const CHAIN_INFO={
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
      L2_REGISTRAR_ADDRESS: '0xb8569e4811bca03a7eeec01366a75c830f75f56c',
      L1_RESOLVER_ADDRESS:'0x57C1f50093C1017AE81EBAF336511ACcc48061e2',
      L1_REVERSE_RESOLVER_ADDRESS:'0xF7e3a2861FfA833C39544B7bbE9D94f3219E5b70',
      L2_RESOLVER_ADDRESS:'0xbC2A58FFB3D82FC683d405e6776C3ecAA8A507F1',
      L2_RESOLVER_FACTORY_ADDRESS:'0x79b784075600c5C420aC3CEd45f04EEA50306a96',
      L2_REVERSE_REGISTRAR_ADDRESS:'0x83C058D2139a6eFA32E42BeB415409000C075563'
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
      L2_REGISTRAR_ADDRESS: '0x364b72c37b7e1848fe85fd1d506d94bd9791a0e0',
      L1_RESOLVER_ADDRESS:'0xF6EfB10e47d6D4C1023BBFa5e6396B00915FbD41',
      L1_REVERSE_RESOLVER_ADDRESS:'0x302096e94FC120A21053f7563e2Ed554d523ba41',
      L2_RESOLVER_ADDRESS:'0xE67A951Df182554d270b8d52F6280271Cf7dd7E5',
      L2_RESOLVER_FACTORY_ADDRESS:'0xCcFC8Be7f65E1D46Af71cf6C06668DDA25f51e3e',
      L2_REVERSE_REGISTRAR_ADDRESS:'0x913CC39C2A6aa4A1531429C079bA5f8DcF6a2FC2'
    },
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
      L2_REGISTRAR_ADDRESS: '0xc3c252341f1a3896afd9ab821bd9d1d452146a53',
      L1_RESOLVER_ADDRESS:'0xA47b9B72571e23604f067dfd4F22785c33E9cF9c',
      L1_REVERSE_RESOLVER_ADDRESS:'0x935510B4270F69c6fa4Fadab75B4EA0A1Fb68349',
      L2_RESOLVER_ADDRESS:'0xE3A21622D05E182f6212125fFc8a9023FFb21Df8',
      L2_RESOLVER_FACTORY_ADDRESS:'0xF2c102E96A183fC598d83fDccF4e30cfE83aedCd',
      L2_REVERSE_REGISTRAR_ADDRESS:'0x60a384Cfbb088Aa8c1750A04548b1b983CDc0418'
    }
    
}

export function isL2(chainId){
    return chainId === OP_CHAIN_ID || chainId === BASE_CHAIN_ID  || chainId === ARB_CHAIN_ID
}

export const encodeName = (name) => '0x' + packet.name.encode(name).toString('hex')