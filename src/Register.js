import { useAccount, useNetwork, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button,Input, Spinner } from '@ensdomains/thorin' 
import { getNetwork } from '@wagmi/core'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useContractWrite, useContractRead } from 'wagmi'
import { CHAIN_INFO, encodeName } from './utils'

// const abi = [
//   {
//     "inputs": [
//       {
//         "internalType": "bytes",
//         "name": "name",
//         "type": "bytes"
//       },
//       {
//         "internalType": "address",
//         "name": "operator",
//         "type": "address"
//       }
//     ],
//     "name": "register",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ]

  
const abi = [{"inputs":[{"internalType":"contract DelegatableResolver","name":"_resolver","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"bytes","name":"name","type":"bytes"},{"internalType":"address","name":"operator","type":"address"}],"name":"register","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"resolver","outputs":[{"internalType":"contract DelegatableResolver","name":"","type":"address"}],"stateMutability":"view","type":"function"}]
const factoryabi = [
  // "function predictAddress(address) views returns (address clone)"
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

export function Register({canRegister, parent, label, setLabel}) {
  const { open } = useWeb3Modal()
  const { chain } = useNetwork()
  const { address, isConnected } = useAccount()
  const { L2_REGISTRAR_ADDRESS, blockExplorerUrls } = CHAIN_INFO[chain?.id]
  const l2ExplorerUrl = blockExplorerUrls[0]
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  console.log({chain, address, isConnected, L2_REGISTRAR_ADDRESS})
  const { disconnect } = useDisconnect()
  
  // const { data, error, isError, isLoading } = useContractRead({
  //   address: DELEGATABLE_RESOLVER_FACTORY_ADDRESS,
  //   abi: factoryabi,
  //   args: [ OWNER_ADDRESS ],
  //   enabled:!(chain.id),
  //   functionName: 'predictAddress',
  //   chainId: chain.id
  // })
  const { data:approveData, isLoading:approveIsLoading, isSuccess:approveIsSuccess, write:writeApprove } = useContractWrite({
    address: L2_REGISTRAR_ADDRESS,
    abi: abi,
    functionName:'register',
    chainId: chain.id
  })

//   if (isConnected)
//     return (
//       <div>
//         Connected to {chain.name} as {address}
//         <Button  style={{ width: '180px' }} onClick={() => disconnect()}>Disconnect</Button>
//       </div>
//     )
//   return <Button  style={{ width: '180px' }} onClick={() => open({ view: 'Networks' })}>Connect Wallet</Button>

  return(
    <div style={{display:"flex"}} >
    <Input
        label="Pick a subname"
        placeholder="nick"
        suffix={parent}
        width='128'
        onChange={(evt) => {setLabel(evt.target.value)}}
    />
    <Button
        width="45" style={{marginTop:"28px",marginLeft:"15px"}}
        disabled={!label && canRegister}
        onClick={(evt) => {
            const name = `${label}${parent}`
            const encodedName = encodeName(name)
            console.log('***clicked', {name, encodedName, address})
            writeApprove({args:[encodedName, address], from:address})
        }}
    >{approveIsLoading ? (<Spinner></Spinner>): (<div>Register</div>)}</Button>
      {approveData? (<div>
        <a style={{color:"blue", marginTop:"40px", marginLeft:"5px"}}
          target="_blank" href={`${l2ExplorerUrl}/tx/${approveData.hash}`}>
          {approveData.hash}
        </a>
      </div>) : '' }
    </div>
  )
}