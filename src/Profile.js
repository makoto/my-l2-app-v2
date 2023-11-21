import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button, LockSVG } from '@ensdomains/thorin' 
import { getNetwork } from '@wagmi/core'

export function Profile() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { chain } = getNetwork()
  console.log({chain})
  const { disconnect } = useDisconnect()
 
  if (isConnected)
    return (
      <div>
        Connected to {chain.name} as {address}
        <Button onClick={() => disconnect()}>Disconnect</Button>
      </div>
    )
  return <Button onClick={() => connect()}>Connect Wallet</Button>
}