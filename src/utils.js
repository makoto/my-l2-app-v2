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
      L1_REVERSE_RESOLVER_ADDRESS:'0xCCe95773C00b924c9EB60822c970eBA2884Ef6A3',
      L2_RESOLVER_ADDRESS:'0xbC2A58FFB3D82FC683d405e6776C3ecAA8A507F1',
      L2_RESOLVER_FACTORY_ADDRESS:'0x79b784075600c5C420aC3CEd45f04EEA50306a96',
      L2_REVERSE_REGISTRAR_ADDRESS:'0xfdF30e5E06d728704A42bac6E0326538E659a67B'
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
      L1_REVERSE_RESOLVER_ADDRESS:'0x2B07Cf3ef421A5ff1cb6f437036bdEF132eEA37B',
      L2_RESOLVER_ADDRESS:'0xE67A951Df182554d270b8d52F6280271Cf7dd7E5',
      L2_RESOLVER_FACTORY_ADDRESS:'0xCcFC8Be7f65E1D46Af71cf6C06668DDA25f51e3e',
      L2_REVERSE_REGISTRAR_ADDRESS:'0xF2c102E96A183fC598d83fDccF4e30cfE83aedCd'
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
      L1_REVERSE_RESOLVER_ADDRESS:'0x065cB486e830bc5517D2a4287e0857cd564a476D',
      L2_RESOLVER_ADDRESS:'0xE3A21622D05E182f6212125fFc8a9023FFb21Df8',
      L2_RESOLVER_FACTORY_ADDRESS:'0xF2c102E96A183fC598d83fDccF4e30cfE83aedCd',
      L2_REVERSE_REGISTRAR_ADDRESS:'0xeC6D530EDc9c783F58Da1aD41C3c5B63C3095720'
    }
    
}

export function isL2(chainId){
    return chainId === OP_CHAIN_ID || chainId === BASE_CHAIN_ID  || chainId === ARB_CHAIN_ID
}

export const encodeName = (name) => '0x' + packet.name.encode(name).toString('hex')