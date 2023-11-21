import { useAccount, useNetwork, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button, LockSVG } from '@ensdomains/thorin' 
import { getNetwork } from '@wagmi/core'
import { useWeb3Modal } from '@web3modal/wagmi/react'

export function Profile() {
  const { open } = useWeb3Modal()
  const { chain } = useNetwork()
  const { address, isConnected } = useAccount()
  console.log('*Profile', chain)
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  console.log({chain, address, isConnected})
  const { disconnect } = useDisconnect()
 
  if (isConnected){
    return (
      <div>
        Connected to {chain.name} as {address}
        <Button  style={{ width: '180px' }} onClick={() => disconnect()}>Disconnect</Button>
      </div>)
  }else{
    // return <w3m-button />
    return (<Button  style={{ width: '180px' }} onClick={() => open({ view: 'Connect' })}>Connect Wallet</Button>)
  }
}