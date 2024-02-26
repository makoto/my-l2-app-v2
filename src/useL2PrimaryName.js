import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CHAIN_INFO, isL2, encodeName } from './utils'

const abi = [
  "function supportsInterface(bytes4) view returns(bool)",
  "function name(bytes32) view returns(string)",
  "function resolve(bytes,bytes) view returns (bytes)"
]
const extendedResolverInterface = '0x9061b923'

// Cannot use wagmi while  l2 gateway is hosted locally 
// Because wagmi uses UniversalResolver that tries to hit gateway from CloudFlare and CF cannot reach localhost
export default function useL2PrimaryName(provider, address, chain) {
  const [data, setData] = useState('');
  useEffect(() => {
    if (address && isL2(chain?.id)) {
        const {coinType, L1_REVERSE_RESOLVER_ADDRESS}         = CHAIN_INFO[chain?.id]
        const namespace       = `${coinType}.reverse`;
        const name            = address.substring(2).toLowerCase() + "." + namespace
        const reversenode     = ethers.namehash(name)
        const encodedName     = encodeName(name)
        const resolver = new ethers.Contract(L1_REVERSE_RESOLVER_ADDRESS, abi, provider);
        resolver.supportsInterface(extendedResolverInterface).then(r =>{
          console.log('extendedResolverInterface1',{r})
          if(r){
            const i = new ethers.Interface(abi)
            const calldata = i.encodeFunctionData("name", [reversenode])
            resolver.resolve(encodedName, calldata, { enableCcipRead: true }).then(r => {
              if(r){
                setData(ethers.toUtf8String(r))
              }
            }).catch((e) =>{
              console.log('useL2PrimaryName new error', e)
            })    
          }
        })
        resolver.name(reversenode, { enableCcipRead: true }).then(r => {
          setData(r)
        }).catch((e) =>{
          console.log('useL2PrimaryName old error', e)
        })
      }
  }, [address, chain?.id]);
  return data
}