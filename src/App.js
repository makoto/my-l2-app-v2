
import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { ThorinGlobalStyles, lightTheme } from '@ensdomains/thorin'
import { Button, LockSVG } from '@ensdomains/thorin'
import { Input, SearchSVG } from '@ensdomains/thorin'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { Tag } from '@ensdomains/thorin'
import moment from 'moment';

const baseuri = 'https://api.studio.thegraph.com/query/1397/ens-delegatable-resolver-baseg/version/latest'
const opuri = 'https://api.studio.thegraph.com/query/1397/ens-delegatable-resolver-opg/version/latest'

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
  uri: baseuri
});
const opclient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: opuri
});
const App = () => {
  const { data:baseQueryData = [] } = useQuery(GET_APPROVALS, {
    client
  });
  const { data:opQueryData = []} = useQuery(GET_APPROVALS, {
    client: opclient
  });
  console.log({opQueryData,baseQueryData})
  const opapprovals = (opQueryData?.approvals || []).map(a => { return {...a, ...{chain:'op'}} })
  const baseapprovals = (baseQueryData?.approvals || []).map(a => { return {...a, ...{chain:'base'}} })
  const approvals = [...baseapprovals,...opapprovals]
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
        approvals.sort((a,b) => {return b.blockTimestamp - a.blockTimestamp} ).map((approval)=> {
          const blockTimestamp = approval.blockTimestamp
          console.log(2, blockTimestamp)
          const approvedAt = new Date(blockTimestamp * 1000)
          console.log(3, approvedAt)
          return (<li style={{margin:"5px"}}>
            {approval.chain === 'op' ? (
              <Tag  style={{ display: 'inline', marginRight:"1em"   }} colorStyle="redPrimary">OP</Tag>
            ):(
              <Tag  style={{ display: 'inline', marginRight:"1em"   }} colorStyle="bluePrimary">Blue</Tag>
            )}
            {approval.name} is registered at {moment(approvedAt).format("YYYY-MM-DD hh:mm")}
          </li>)
        })
      }
      </ul>
    </ThemeProvider>
    </ApolloProvider>
  )
}
export default App;
