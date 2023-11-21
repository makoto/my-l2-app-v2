import { useAccount, useNetwork, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button, LockSVG } from '@ensdomains/thorin' 
import { getNetwork } from '@wagmi/core'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useParams, Link } from 'react-router-dom';

export function Name() {
  const { name, operator } = useParams()
  const { open } = useWeb3Modal()
  const { chain } = useNetwork()
  const { address, isConnected } = useAccount()
  console.log('*Name', {name, operator, address})
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  console.log({chain, address, isConnected})
  const { disconnect } = useDisconnect()
  return(<div>
    Hello {name}
  </div>)
  // if (isConnected)
  //   return (
  //     <div>
  //       Connected to {chain.name} as {address}
  //       <Button  style={{ width: '180px' }} onClick={() => disconnect()}>Disconnect</Button>
  //     </div>
  //   )
  // return <Button  style={{ width: '180px' }} onClick={() => open({ view: 'Networks' })}>Connect Wallet</Button>
}