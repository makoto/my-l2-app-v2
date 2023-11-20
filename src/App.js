
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
  console.log(label)
  return (
    <ApolloProvider client={client}>
    <ThemeProvider theme={lightTheme}>
      <ThorinGlobalStyles />
      <div style={{ width: '180px' }}>
        <Button prefix={<LockSVG />} variant="primary">
          Connect Wallet
        </Button>
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
            </div>
            {chainName && (
              <div style={{display:"flex"}} >
                <Input
                  label="Pick a subname"
                  placeholder="nick"
                  suffix={parent}
                  width='128'
                  onChange={(evt) => {setLabel(evt.target.value)}}
                />
                <Button
                  shape="rounded" width="45" style={{marginTop:"28px",marginLeft:"15px"}}
                  disabled={!label}
                  onClick={(evt) => {console.log("****")}}
                >Register</Button>
              </div>
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
  )
}
export default App;
