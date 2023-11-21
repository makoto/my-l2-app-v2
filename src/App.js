
import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { ThorinGlobalStyles, lightTheme } from '@ensdomains/thorin'
import { Button, LockSVG } from '@ensdomains/thorin'
import { Input, SearchSVG } from '@ensdomains/thorin'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Tag } from '@ensdomains/thorin'
import moment from 'moment';
import { RadioButton,CheckboxRow,Card,FieldSet } from '@ensdomains/thorin'
import { WagmiConfig, createConfig,configureChains, mainnet } from 'wagmi'
import { createPublicClient, http } from 'viem'
import { publicProvider} from 'wagmi/providers/public'
import { goerli, optimismGoerli, baseGoerli } from 'wagmi/chains'
import { Profile } from './Profile'
import { Name } from './Name'
import { Home } from './Home'
import { getNetwork } from '@wagmi/core'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';

// 1. Get projectId
const projectId = process.env.REACT_APP_WC_ID
// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const { chains, publicClient, webSocketPublicClient} = configureChains([goerli,baseGoerli], [publicProvider()])
// const { chains, publicClient, webSocketPublicClient} = configureChains([mainnet, goerli, optimismGoerli, baseGoerli], [publicProvider()])
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })
createWeb3Modal({ wagmiConfig, projectId, chains })

const config = createConfig({
  autoConnect: true,
  publicClient
})

const baseuri = 'https://api.studio.thegraph.com/query/1397/ens-delegatable-resolver-baseg/version/latest'
const opuri = 'https://api.studio.thegraph.com/query/1397/ens-delegatable-resolver-opg/version/latest'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: baseuri
});
const opclient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: opuri
});
const App = () => {
  return (
    <Router>
    <WagmiConfig config={config}>
    <ApolloProvider client={client}>
    <ThemeProvider theme={lightTheme}>
      <ThorinGlobalStyles />
      <div>
        <Link to="/">Home</Link>
        <Profile />
      </div>
      <Routes>
        <Route path="/" element={<Home client={client} opclient={opclient} />} />
        <Route path="/name/:name/:operator/:chainId" element={<Name />} />
      </Routes>
    </ThemeProvider>
    </ApolloProvider>
    </WagmiConfig>
    </Router>
  )
}
export default App;
