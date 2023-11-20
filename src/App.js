
import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { ThorinGlobalStyles, lightTheme } from '@ensdomains/thorin'
import { Button, LockSVG } from '@ensdomains/thorin'
import { Input, SearchSVG } from '@ensdomains/thorin'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
const uri = 'https://api.studio.thegraph.com/query/1397/ens-delegatable-resolver-baseg/version/latest'

const GET_APPROVALS = gql`
  query getApprovals {
    approvals(first:20) {
      name
      blockNumber
      blockTimestamp
    }
  }
`;
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri
});
const App = () => {
  const { loading:queryLoading, error:queryError, data:queryData } = useQuery(GET_APPROVALS, {
    client
  });
  const approvals = queryData?.approvals || []
  console.log({approvals})
  return (
    <ApolloProvider client={client}>
    <ThemeProvider theme={lightTheme}>
      <ThorinGlobalStyles />
      {/* {children} */}
      <div style={{ width: '180px' }}>
        <Button prefix={<LockSVG />} variant="primary">
          Connect Wallet
        </Button>
      </div>
      <div>
        <Input
          label="Register subname"
          placeholder="nick"
          suffix=".evmgateway.eth"
          width='128'
        />
      </div>
      <h3>Subname registrations</h3>
      <ul>
      {
        approvals.map((approval)=> {
          const blockTimestamp = approval.blockTimestamp
          console.log(2, blockTimestamp)
          const approvedAt = new Date(blockTimestamp * 1000)
          console.log(3, approvedAt)
          return (<li>
            {approval.name} is registered at {approvedAt.toString()}
          </li>)
        })
      }
      </ul>
    </ThemeProvider>
    </ApolloProvider>
  )
}
export default App;
