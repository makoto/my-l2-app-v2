import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CHAIN_INFO,isL2 } from './utils'
const abi = [
  "function name(bytes32) view returns(string)",
  "function resolve(bytes,bytes) view returns (bytes)"
]
// Cannot use wagmi while  l2 gateway is hosted locally 
// Because wagmi uses UniversalResolver that tries to hit gateway from CloudFlare and CF cannot reach localhost
export default function useL2PrimaryName(provider, address, chain) {
  const [data, setData] = useState('');
  useEffect(() => {
    if (address && isL2(chain?.id)) {
        const {alias, L1_REVERSE_RESOLVER_ADDRESS}         = CHAIN_INFO[chain?.id]
        const namespace       = `${alias}.reverse.evmgateway.eth`;
        const name            = address.substring(2).toLowerCase() + "." + namespace
        const reversenode     = ethers.namehash(name)    
        const resolver = new ethers.Contract(L1_REVERSE_RESOLVER_ADDRESS, abi, provider);
        resolver.name(reversenode, { enableCcipRead: true }).then(r => {
          setData(r)
        })
      }
  }, [address, chain?.id]);
  return data
}