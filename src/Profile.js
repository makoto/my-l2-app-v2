import { useAccount, useNetwork, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button, LockSVG } from '@ensdomains/thorin' 
import { getNetwork } from '@wagmi/core'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import useL2PrimaryName from './useL2PrimaryName';

export function Profile(provider) {
  const { open } = useWeb3Modal()
  const { chain } = useNetwork()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const l2name = (useL2PrimaryName(provider, address, chain))
  let displayName
  if(l2name){
    displayName = `${l2name}(${address?.slice(0,5)}...)`
  }else{
    displayName = address
  }
  if (isConnected){
    return (
      <div>
        Connected to {chain.name} as {displayName}
        <Button  style={{ width: '180px' }} onClick={() => disconnect()}>Disconnect</Button>
      </div>)
  }else{
    // return <w3m-button />
    return (<Button  style={{ width: '180px' }} onClick={() => open({ view: 'Connect' })}>Connect Wallet</Button>)
  }
}