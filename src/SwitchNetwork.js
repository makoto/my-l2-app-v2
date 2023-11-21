import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button, LockSVG } from '@ensdomains/thorin' 
import { getNetwork } from '@wagmi/core'
import { WagmiConfig, createConfig,configureChains, mainnet, useNetwork, useSwitchNetwork } from 'wagmi'

export function SwitchNetwork(chainParam) {
  const { chain } = useNetwork()
  const a = useSwitchNetwork()
  console.log({a, chain})
  // console.log({chain, chains, error, isLoading, pendingChainId, switchNetwork, switchNetworkAsync})
  // const { address, isConnected } = useAccount()
  // const { connect } = useConnect({
  //   connector: new InjectedConnector(),
  // })
  // const { chain } = getNetwork()
  // console.log({chain, chainParam})
  // const { disconnect } = useDisconnect()
 
  return(
    <Button
    style={{width:'16em', marginTop:"-10px"}}
    onClick={()=>{
      console.log('**clicked', {chainParam})
      // useSwitchNetwork(chainParam.id)
      // window.ethereum.request({
      //   method: "wallet_addEthereumChain",
      //   params: [chainParam]
      // }).catch((error)=>{
      //   console.log('*** Add network error', {error})
      // });  
    }}
    >Switch Network </Button>
  )
}


