import { useAccount, useNetwork, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button,Input, Spinner } from '@ensdomains/thorin' 
import { getNetwork } from '@wagmi/core'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useContractWrite, useContractRead } from 'wagmi'
import {encodeName } from './utils'

const abi = [
  // "function approve(bytes,address,bool)"
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "name",
        "type": "bytes"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
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
// const OWNER_ADDRESS = '0xDBBC2C0fe2a1D0fB4056B35a22e543bEb715E7FC'
// const l2resolverAddress = await DelegatableResolverFactory.predictAddress(OWNER_ADDRESS)

// const DELEGATABLE_RESOLVER_FACTORY_ADDRESSES = {
//   84531:'0x7d56Bc48F0802319CB7C79B421Fa5661De905AF7',
//   420:'0xacB9771923873614d77C914D716d8E25dAF09b8d',
// }
const l2ExplorerUrl = "https://goerli.basescan.org"
export function Register({canRegister, parent, label, setLabel}) {
  const { open } = useWeb3Modal()
  const { chain } = useNetwork()
  const { address, isConnected } = useAccount()
  // const DELEGATABLE_RESOLVER_FACTORY_ADDRESS = DELEGATABLE_RESOLVER_FACTORY_ADDRESSES[chain.id]
  // const DELEGATABLE_RESOLVER_FACTORY_ADDRESS = '0x7d56Bc48F0802319CB7C79B421Fa5661De905AF7'
  const L2_RESOLVER_ADDRESS = '0xE4B18eFbF71d516046514598FD7FcFbad4beC742'
  console.log('*Profile', chain)
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  console.log({chain, address, isConnected})
  const { disconnect } = useDisconnect()
  
  // const { data, error, isError, isLoading } = useContractRead({
  //   address: DELEGATABLE_RESOLVER_FACTORY_ADDRESS,
  //   abi: factoryabi,
  //   args: [ OWNER_ADDRESS ],
  //   enabled:!(chain.id),
  //   functionName: 'predictAddress',
  //   chainId: chain.id
  // })
  // console.log('***REGISTER1', {chainId:chain.id, OWNER_ADDRESS})
  // console.log('***REGISTER2', {data, error, isError, isLoading, DELEGATABLE_RESOLVER_FACTORY_ADDRESS})
  const { data:approveData, isLoading:approveIsLoading, isSuccess:approveIsSuccess, write:writeApprove } = useContractWrite({
    address: L2_RESOLVER_ADDRESS,
    abi: abi,
    functionName:'approve',
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
            writeApprove({args:[encodedName, address, true], from:address})
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