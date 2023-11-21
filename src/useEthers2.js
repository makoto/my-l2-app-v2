import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Base L1 address
const L1_RESOLVER_ADDRESS = '0x052D7E10D55Ae12b4F62cdE18dBb7E938efa230D'
const abi = [
  "function addr(bytes32) view returns (address)",
  "function resolve(bytes,bytes) view returns (bytes)"
]
// Cannot use wagmi while  l2 gateway is hosted locally 
// Because wagmi uses UniversalResolver that tries to hit gateway from CloudFlare and CF cannot reach localhost
export default function useEthers2(encodedname, node, chainId) {
  const i = new ethers.Interface(abi)
  const calldata = i.encodeFunctionData("addr", [node])
  const [data, setData] = useState('');
  useEffect(() => {
    if (encodedname && window.ethereum !== null && chainId === 5) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const resolver = new ethers.Contract(L1_RESOLVER_ADDRESS, abi, provider);
        resolver.resolve(encodedname, calldata, { enableCcipRead: true }).then(r => {
            const decoded = i.decodeFunctionResult("addr", r)
            setData(decoded)
        })
      }    
  }, [encodedname]);
  return data
}