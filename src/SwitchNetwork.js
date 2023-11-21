import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button, LockSVG } from '@ensdomains/thorin' 
import { getNetwork } from '@wagmi/core'
import { WagmiConfig, createConfig,configureChains, mainnet, useNetwork, useSwitchNetwork } from 'wagmi'

export function SwitchNetwork({chainId}) {
  const { chain } = useNetwork()
  const {chains, error, isLoading, pendingChainId, switchNetwork, switchNetworkAsync} = useSwitchNetwork()
  console.log('*', {chainId, realId:chain.id, error, isLoading, pendingChainId})
  const { address, isConnected } = useAccount()
 
  return(
    <Button
    style={{width:'16em', marginTop:"-10px"}}
    onClick={()=>{
      console.log('***clicked1', {chainId, address, isConnected})
      console.log({chains, error, isLoading, pendingChainId, switchNetwork, switchNetworkAsync})
      
      // useSwitchNetwork(chainParam.id)
      switchNetwork?.(chainId)
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


