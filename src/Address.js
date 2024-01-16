import { useAccount, useNetwork, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button, LockSVG } from '@ensdomains/thorin' 
import { getNetwork } from '@wagmi/core'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useParams, Link } from 'react-router-dom';
import { useContractRead } from 'wagmi'
import { CHAIN_INFO } from './utils'
const abi = [
    {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "predictAddress",
        "outputs": [
          {
            "internalType": "address",
            "name": "clone",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
]
  
export function Address(provider) {
    const { address } = useParams()
    const { chain } = useNetwork()
    const chainId = chain.id
    const { L2_RESOLVER_FACTORY_ADDRESS } = CHAIN_INFO[chainId]
    console.log('***chain', {chain, L2_RESOLVER_FACTORY_ADDRESS})
    const { data } = useContractRead({
        address: L2_RESOLVER_FACTORY_ADDRESS,
        abi,
        args:[address],
        functionName: 'predictAddress',
        chainId
    })
    if(data){
        return(
            <div>
                L2 Resolver Address for {address} is {data}
            </div>
        )    
    }
}