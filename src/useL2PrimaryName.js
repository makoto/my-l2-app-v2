import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Base L1 address
const L1_RESOLVER_ADDRESS = '0x3c332a23a6052afE947F47656d1fD0f450F4C237'
const abi = [
  "function name(bytes32) view returns(string)",
  "function resolve(bytes,bytes) view returns (bytes)"
]
// Cannot use wagmi while  l2 gateway is hosted locally 
// Because wagmi uses UniversalResolver that tries to hit gateway from CloudFlare and CF cannot reach localhost
export default function useL2PrimaryName(provider, address) {
  const namespace       = "base.reverse.evmgateway.eth";
  const [data, setData] = useState('');
  console.log('UsePrimaryName1', {address})
  useEffect(() => {
    if (address) {
        const name            = address.substring(2).toLowerCase() + "." + namespace
        const reversenode     = ethers.namehash(name)    
        const resolver = new ethers.Contract(L1_RESOLVER_ADDRESS, abi, provider);
        console.log('UsePrimaryName2')
        resolver.name(reversenode, { enableCcipRead: true }).then(r => {
          console.log('UsePrimaryName3', r)
          setData(r)
        })
      }
  }, [address]);
  return data
}