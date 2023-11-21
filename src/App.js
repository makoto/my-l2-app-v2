
import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { ThorinGlobalStyles, lightTheme } from '@ensdomains/thorin'
import { Button, LockSVG } from '@ensdomains/thorin'
import { Input, SearchSVG } from '@ensdomains/thorin'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { Tag } from '@ensdomains/thorin'
import moment from 'moment';
import { RadioButton,CheckboxRow,Card,FieldSet } from '@ensdomains/thorin'
import { WagmiConfig, createConfig,configureChains, mainnet } from 'wagmi'
import { createPublicClient, http } from 'viem'
import { publicProvider} from 'wagmi/providers/public'
import { goerli, optimismGoerli, baseGoerli } from 'wagmi/chains'
import { Profile } from './Profile'
import { Register } from './Register'
import { SwitchNetwork } from './SwitchNetwork'
import { getNetwork } from '@wagmi/core'
import { CHAIN_INFO,isL2 } from './utils'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'


// 1. Get projectId
const projectId = process.env.REACT_APP_WC_ID
// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}


const { chains, publicClient, webSocketPublicClient} = configureChains([goerli, optimismGoerli, baseGoerli], [publicProvider()])
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })
createWeb3Modal({ wagmiConfig, projectId, chains })

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http()
  }),
})

const baseuri = 'https://api.studio.thegraph.com/query/1397/ens-delegatable-resolver-baseg/version/latest'
const opuri = 'https://api.studio.thegraph.com/query/1397/ens-delegatable-resolver-opg/version/latest'

const GET_APPROVALS = gql`
  query getApprovals {
    approvals(first:20) {
      name
      operator
      blockNumber
      blockTimestamp
    }
  }
`;
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: baseuri
});
const opclient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: opuri
});
const App = () => {
  const { chain } = getNetwork()
  const [chainName, setChainName] = useState();
  const [label, setLabel] = useState("");
  const { data:baseQueryData = [] } = useQuery(GET_APPROVALS, {
    client
  });
  const { data:opQueryData = []} = useQuery(GET_APPROVALS, {
    client: opclient
  });
  const opapprovals = (opQueryData?.approvals || []).map(a => { return {...a, ...{chain:'op'}} })
  const baseapprovals = (baseQueryData?.approvals || []).map(a => { return {...a, ...{chain:'base'}} })
  const approvals = [...baseapprovals,...opapprovals]
  const parent = `.${chainName || ''}.evmgateway.eth`
  const chainParam = CHAIN_INFO[chainName]
  const isInL2 = isL2(chain?.id)
  const canRegister = isInL2 && chainParam?.id === chain?.id
  console.log({label, canRegister,preferred:chainParam?.id, connected:chain?.id, isInL2})
  return (
    <WagmiConfig config={wagmiConfig}>
    <ApolloProvider client={client}>
    <ThemeProvider theme={lightTheme}>
      <ThorinGlobalStyles />
      <div>
        <Profile />
      </div>
      <div>
        <h1>Register L2 subnames</h1>
        <Card padding="4" shadow>
          <FieldSet style={{display:"flex", margin:"2em"} }>
            <h3 style={{color:"rgb(155, 155, 166)",marginLeft:"10px"}} >Choose the chain</h3>
            <div style={{display:"flex", margin:"5px"} }>
            <RadioButton label="Op" name="RadioButtonGroup" value="op"  width="26"
              onClick={(evt) =>  setChainName('op')}
            />
            <RadioButton label="Base" name="RadioButtonGroup" value="base"   width="26"
              onClick={(evt) =>  setChainName('base')}
            />
            {chainName && (
              <SwitchNetwork chainId={chainParam.id} />
            )}
            </div>
            {canRegister && (
              <Register canRegister={canRegister} parent={parent} label={label} setLabel={setLabel} />
            )}

          </FieldSet>
        </Card>
      </div>
      <h3>Subname registrations</h3>
      <ul>
      {
        approvals.sort((a,b) => {return b.blockTimestamp - a.blockTimestamp} ).map((approval)=> {
          const blockTimestamp = approval.blockTimestamp
          const approvedAt = new Date(blockTimestamp * 1000)
          return (<li style={{margin:"5px"}}>
            {approval.chain === 'op' ? (
              <Tag  style={{ display: 'inline', marginRight:"1em"   }} colorStyle="redPrimary">OP</Tag>
            ):(
              <Tag  style={{ display: 'inline', marginRight:"1em"   }} colorStyle="bluePrimary">Blue</Tag>
            )}
            {approval.name} is granted to {approval.operator.slice(0,5)}... at {moment(approvedAt).format("YYYY-MM-DD hh:mm")}
          </li>)
        })
      }
      </ul>
    </ThemeProvider>
    </ApolloProvider>
    </WagmiConfig>
  )
}
export default App;
