import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CHAIN_INFO,} from './utils'

const abi = [
  "function addr(bytes32) view returns (address)",
  "function resolve(bytes,bytes) view returns (bytes)"
]
// Cannot use wagmi while  l2 gateway is hosted locally 
// Because wagmi uses UniversalResolver that tries to hit gateway from CloudFlare and CF cannot reach localhost
export default function useEthers(provider, encodedname, node, l2chainId) {
  const { L1_RESOLVER_ADDRESS } = CHAIN_INFO[l2chainId]
  const i = new ethers.Interface(abi)
  const calldata = i.encodeFunctionData("addr", [node])
  const [data, setData] = useState('');
  useEffect(() => {
    if (encodedname) {
        const resolver = new ethers.Contract(L1_RESOLVER_ADDRESS, abi, provider);
        resolver.resolve(encodedname, calldata, { enableCcipRead: true }).then(r => {
            const decoded = i.decodeFunctionResult("addr", r)
            setData(decoded)
        })
        .catch((e)=>{
          console.log("useEthers error", {encodedname,e})
        })
      }else{
        console.log("***NOT CONNECTED")
      }
  }, [encodedname]);
  return data
}