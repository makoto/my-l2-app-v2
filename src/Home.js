
import React, { useState } from 'react'
import { Button, Tag } from '@ensdomains/thorin'
import moment from 'moment';
import { RadioButton,Card,FieldSet } from '@ensdomains/thorin'
import { Register } from './Register'
import { SwitchNetwork } from './SwitchNetwork'
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useAccount, useNetwork, useConnect, useDisconnect, useContractRead } from 'wagmi'
import { getNetwork } from '@wagmi/core'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { gql, useQuery } from '@apollo/client';
import { CHAIN_INFO,isL2, OP_CHAIN_ID, BASE_CHAIN_ID } from './utils'
import {ethers} from 'ethers'

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

// export function Home({chainName, setChainName, chainParam, canRegister, label, setLabel, approvals}) {
export function Home({client, opclient}) {
  
  const { chain } = useNetwork()
  const { chain:chain2 } = getNetwork()
  console.log({chain, chain2})
  const [chainId, setChainId] = useState();
  const [label, setLabel] = useState("");
  const { data:baseQueryData = [] } = useQuery(GET_APPROVALS, {
    client
  });
  const { data:opQueryData = []} = useQuery(GET_APPROVALS, {
    client: opclient
  });
  const opapprovals = (opQueryData?.approvals || []).map(a => {
    return {...a, ...{chain:'op', chainId:OP_CHAIN_ID, operator:ethers.getAddress(a.operator)}}
  })
  const baseapprovals = (baseQueryData?.approvals || []).map(a => {
    return {...a, ...{chain:'base', chainId:BASE_CHAIN_ID, operator:ethers.getAddress(a.operator)}}
  })
  const approvals = [...baseapprovals,...opapprovals]
  const chainParam = CHAIN_INFO[chainId]
  const chainName = chainParam?.alias
  const parent = `.${chainName || ''}.evmgateway.eth`
  const isInL2 = isL2(chain?.id)
  const canRegister = isInL2 && chainParam?.id === chain?.id
  console.log({chainParam})

  const { address, isConnected } = useAccount()
  console.log('*Profile', chain)
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  console.log({chain, address, isConnected})
  return (
    <div>
      {isConnected && (
      <div>
        <h1>Register L2 subnames</h1>
        <Card padding="4" shadow>
          <FieldSet style={{display:"flex", margin:"2em"} }>
            <h3 style={{color:"rgb(155, 155, 166)",marginLeft:"10px"}} >Choose the chain</h3>
            <div style={{display:"flex", margin:"5px"} }>
            <RadioButton label="Op" name="RadioButtonGroup" value="op"  width="26"
              onClick={(evt) =>  setChainId(OP_CHAIN_ID)}
            />
            <RadioButton label="Base" name="RadioButtonGroup" value="base"   width="26"
              onClick={(evt) =>  setChainId(BASE_CHAIN_ID)}
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
      )}
      <h3>Subname registrations</h3>
      <ul>
      {
        approvals.sort((a,b) => {return b.blockTimestamp - a.blockTimestamp} ).map((approval)=> {
          const blockTimestamp = approval.blockTimestamp
          console.log('****' ,{approval})
          const approvedAt = new Date(blockTimestamp * 1000)
          return (<li style={{margin:"5px"}}>
            {approval.chain === 'op' ? (
              <Tag  style={{ display: 'inline', marginRight:"1em"   }} colorStyle="redPrimary">OP</Tag>
            ):(
              <Tag  style={{ display: 'inline', marginRight:"1em"   }} colorStyle="bluePrimary">Blue</Tag>
            )}
            <Link to={`/name/${approval.name}/${approval.operator}/${approval.chainId}`}>{approval.name} is granted to {approval.operator.slice(0,5)}... at {moment(approvedAt).format("YYYY-MM-DD hh:mm")}</Link>
          </li>)
        })
      }
      </ul>
    </div>
  )
}