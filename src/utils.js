import packet from 'dns-packet';
export const L1_CHAIN_ID = 5
export const ARB_CHAIN_ID = 421613
export const OP_CHAIN_ID = 420
export const BASE_CHAIN_ID = 84531
export const CHAIN_INFO={
    [ARB_CHAIN_ID]:{
      id:ARB_CHAIN_ID,
      alias:'arb',
      chainId: "0x66eed",
      rpcUrls: ["https://rpc.goerli.arbitrum.gateway.fm"],
      chainName: "Arbitrum Goerli Testnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18
      },
      blockExplorerUrls: ["https://goerli.arbiscan.io"],
      L2_REGISTRAR_ADDRESS: '0x50200c7Ccb1abD927184396547ea8dD1A18CAA3A',
      L1_RESOLVER_ADDRESS:'0xFb42a2d1A28A10607ee426764BdcdA7d121731AD',
      L1_REVERSE_RESOLVER_ADDRESS:'0x2fed4238EfD49d0ECCeEED943BCf4D5C3a299418',
      L2_RESOLVER_ADDRESS:'0xa0Ed81518Bf5Dadb75AC5d5565fCEC2529CBC286',
      L2_REVERSE_REGISTRAR_ADDRESS:'0x4166B7e70F14C48980Da362256D1Da9Cc8F95e13'
    },
    [OP_CHAIN_ID]:{
      id:OP_CHAIN_ID,
      alias:'op',
      chainId: "0x1a4",
      rpcUrls: ["https://endpoints.omniatech.io/v1/op/goerli/public"],
      chainName: "Optimism Goerli Testnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18
      },
      blockExplorerUrls: ["https://goerli-optimism.etherscan.io"],
      L2_REGISTRAR_ADDRESS: '0x2b07cf3ef421a5ff1cb6f437036bdef132eea37b',
      L1_RESOLVER_ADDRESS:'0x65a0963A2941A13a96FcDCfE36c94c6a341f26E5',
      L1_REVERSE_RESOLVER_ADDRESS:'0xeEB5832Ea8732f7EF06d468E40F562c9D7347795',
      L2_RESOLVER_ADDRESS:'0x96753bd0D9bdd98d3a84837B5933078AF49aF12d',
      L2_REVERSE_REGISTRAR_ADDRESS:'0x7D006EFd21eb282C8B0a425BAB546517bfEC2cc2'
    },
    [BASE_CHAIN_ID]:{
      id:BASE_CHAIN_ID,
      alias:'base',
      chainId: "0x14a33",
      rpcUrls: ["https://goerli.base.org"],
      chainName: "Base Goerli Testnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18
      },
      blockExplorerUrls: ["https://goerli.basescan.org"],
      L2_REGISTRAR_ADDRESS: '0xe0356133c3c43cbb623543488e607e4e349eaa10',
      L1_RESOLVER_ADDRESS:'0x052D7E10D55Ae12b4F62cdE18dBb7E938efa230D',
      L1_REVERSE_RESOLVER_ADDRESS:'0x3c332a23a6052afE947F47656d1fD0f450F4C237',
      L2_RESOLVER_ADDRESS:'0xE4B18eFbF71d516046514598FD7FcFbad4beC742',
      L2_REVERSE_REGISTRAR_ADDRESS:'0xDC317ef697b3A9903a24abcC325d9C1C80B19D87'
    }  
}

export function isL2(chainId){
    return chainId === OP_CHAIN_ID || chainId === BASE_CHAIN_ID  || chainId === ARB_CHAIN_ID
}

export const encodeName = (name) => '0x' + packet.name.encode(name).toString('hex')