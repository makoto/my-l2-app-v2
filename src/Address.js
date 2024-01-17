import { useAccount, useNetwork, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button, LockSVG } from '@ensdomains/thorin' 
import { getNetwork } from '@wagmi/core'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useParams, Link } from 'react-router-dom';
import { useContractRead } from 'wagmi'
import { CHAIN_INFO, L2_CHAIN_IDS } from './utils'
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
    const CHAIN_0 = CHAIN_INFO[L2_CHAIN_IDS[0]]
    const { data } = useContractRead({
        address: CHAIN_0.L2_RESOLVER_FACTORY_ADDRESS,
        abi,
        args:[address],
        functionName: 'predictAddress',
        chainId:L2_CHAIN_IDS[0]
    })
    const CHAIN_1 = CHAIN_INFO[L2_CHAIN_IDS[1]]
    const { data:data1 } = useContractRead({
        address: CHAIN_1.L2_RESOLVER_FACTORY_ADDRESS,
        abi,
        args:[address],
        functionName: 'predictAddress',
        chainId:L2_CHAIN_IDS[1]
    })
    const CHAIN_2 = CHAIN_INFO[L2_CHAIN_IDS[2]]
    const { data:data2 } = useContractRead({
        address: CHAIN_2.L2_RESOLVER_FACTORY_ADDRESS,
        abi,
        args:[address],
        functionName: 'predictAddress',
        chainId:L2_CHAIN_IDS[2]
    })

    if(data){
        return(
            <div>
                <h2>
                    L2 Resolver Address for {address}    
                </h2>
                <div>
                    <ul>
                        <li>
                            {CHAIN_0.alias}: <Link to={CHAIN_0.blockExplorerUrls[0] + '/address/' + data}>{data}</Link>
                        </li>
                        <li>
                            {CHAIN_1.alias}: <Link to={CHAIN_1.blockExplorerUrls[0] + '/address/' + data1}>{data1}</Link>
                        </li>
                        <li>
                            {CHAIN_2.alias}: <Link to={CHAIN_2.blockExplorerUrls[0] + '/address/' + data2}>{data2}</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )    
    }
}