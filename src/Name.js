import React, { useState } from 'react'
import { useAccount, useNetwork, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button, Input, Spinner } from '@ensdomains/thorin' 
import { getNetwork } from '@wagmi/core'
import { useParams, Link } from 'react-router-dom';
import { useBlockNumber, useContractWrite, useContractRead, useSwitchNetwork, useEnsAddress } from 'wagmi'
import { CHAIN_INFO, L1_CHAIN_ID, encodeName } from './utils'
import {ethers} from 'ethers'
import useEthers from './useEthers';

// import { useWeb3Modal } from '@web3modal/wagmi/react'
// </div>
const abi = [{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"}],"name":"NotAuthorized","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":true,"internalType":"uint256","name":"contentType","type":"uint256"}],"name":"ABIChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":false,"internalType":"address","name":"a","type":"address"}],"name":"AddrChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"coinType","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"newAddress","type":"bytes"}],"name":"AddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bytes","name":"name","type":"bytes"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"hash","type":"bytes"}],"name":"ContenthashChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"name","type":"bytes"},{"indexed":false,"internalType":"uint16","name":"resource","type":"uint16"},{"indexed":false,"internalType":"bytes","name":"record","type":"bytes"}],"name":"DNSRecordChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"name","type":"bytes"},{"indexed":false,"internalType":"uint16","name":"resource","type":"uint16"}],"name":"DNSRecordDeleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":false,"internalType":"bytes","name":"lastzonehash","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"zonehash","type":"bytes"}],"name":"DNSZonehashChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":true,"internalType":"bytes4","name":"interfaceID","type":"bytes4"},{"indexed":false,"internalType":"address","name":"implementer","type":"address"}],"name":"InterfaceChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":false,"internalType":"string","name":"name","type":"string"}],"name":"NameChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"x","type":"bytes32"},{"indexed":false,"internalType":"bytes32","name":"y","type":"bytes32"}],"name":"PubkeyChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":true,"internalType":"string","name":"indexedKey","type":"string"},{"indexed":false,"internalType":"string","name":"key","type":"string"},{"indexed":false,"internalType":"string","name":"value","type":"string"}],"name":"TextChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":false,"internalType":"uint64","name":"newVersion","type":"uint64"}],"name":"VersionChanged","type":"event"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"uint256","name":"contentTypes","type":"uint256"}],"name":"ABI","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"}],"name":"addr","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"uint256","name":"coinType","type":"uint256"}],"name":"addr","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"name","type":"bytes"},{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"}],"name":"clearRecords","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"}],"name":"contenthash","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"bytes32","name":"name","type":"bytes32"},{"internalType":"uint16","name":"resource","type":"uint16"}],"name":"dnsRecord","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"name","type":"bytes"},{"internalType":"uint256","name":"offset","type":"uint256"},{"internalType":"address","name":"operator","type":"address"}],"name":"getAuthorisedNode","outputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"bool","name":"authorized","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"bytes32","name":"name","type":"bytes32"}],"name":"hasDNSRecords","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"bytes4","name":"interfaceID","type":"bytes4"}],"name":"interfaceImplementer","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"nodehash","type":"bytes32"},{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicallWithNodeCheck","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"}],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"}],"name":"pubkey","outputs":[{"internalType":"bytes32","name":"x","type":"bytes32"},{"internalType":"bytes32","name":"y","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"recordVersions","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"","type":"bytes"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"resolve","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"uint256","name":"contentType","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"setABI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"uint256","name":"coinType","type":"uint256"},{"internalType":"bytes","name":"a","type":"bytes"}],"name":"setAddr","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"address","name":"a","type":"address"}],"name":"setAddr","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"bytes","name":"hash","type":"bytes"}],"name":"setContenthash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"setDNSRecords","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"bytes4","name":"interfaceID","type":"bytes4"},{"internalType":"address","name":"implementer","type":"address"}],"name":"setInterface","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"string","name":"newName","type":"string"}],"name":"setName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"bytes32","name":"x","type":"bytes32"},{"internalType":"bytes32","name":"y","type":"bytes32"}],"name":"setPubkey","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"string","name":"key","type":"string"},{"internalType":"string","name":"value","type":"string"}],"name":"setText","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"bytes","name":"hash","type":"bytes"}],"name":"setZonehash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"string","name":"key","type":"string"}],"name":"text","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"}],"name":"zonehash","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"}]
const l1abi = [
  {
    "inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"}],"name":"addr",
    "outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"
  }  
]

const l2WriteAbi = [
  {
    "inputs":[
        {"internalType":"bytes32","name":"node","type":"bytes32"},
        {"internalType":"address","name":"a","type":"address"}
    ],
    "name":"setAddr",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
}]

const l2ReverseAbi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "setName",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

export function Name(provider) {
  const { name, operator, chainId:chainIdString } = useParams()
  const chainId = parseInt(chainIdString)
  const { L2_RESOLVER_ADDRESS, L2_REVERSE_REGISTRAR_ADDRESS, blockExplorerUrls } = CHAIN_INFO[chainId]
  const l2ExplorerUrl = blockExplorerUrls[0]
  // const { open } = useWeb3Modal()
  const { chain } = useNetwork({chainId})
  const { address, isConnected } = useAccount();
  const [newAddress, setNewAddress] = useState("");
  const encodedName = encodeName(name)
  const node = ethers.namehash(name)
  const {chains} = useSwitchNetwork()
  // const args = [
  //   "0x066d616b6f746f04626173650a65766d676174657761790365746800",
  //   0,
  //   "0xffd1ac3e8818adcbe5c597ea076e8d3210b45df5"
  // ]
  const blockNumber = useBlockNumber({
    chainId,
  })
  // const { data, error, isError, isLoading } = useContractRead({
  //   address: L2_RESOLVER_ADDRESS,
  //   abi,
  //   args,
  //   functionName: 'getAuthorisedNode',
  //   chainId
  // })
  const { data:addrData, error:addrError } = useContractRead({
    address: L2_RESOLVER_ADDRESS,
    abi:l1abi,
    args:[node],
    functionName: 'addr',
    chainId: chainId
  })
  const l1blockNumber = useBlockNumber({
    chainId: L1_CHAIN_ID,
  })
  const canEdit = operator === address && chainId === chain?.id
  const cansetName = canEdit && address === addrData
  console.log(`*Name BlockNumber l1:${l1blockNumber.data}  l2:${blockNumber.data} ${canEdit}`)
  const l1address = (useEthers(provider, encodedName, node, chainId))[0]
  const { data:setAddrData, isLoading:setAddrIsLoading, isSuccess:setAddrIsSuccess, write:writeSetAddr } = useContractWrite({
    address: L2_RESOLVER_ADDRESS,
    abi: l2WriteAbi,
    functionName:'setAddr',
    chainId
  })

  const { data:setNameData, isLoading:setNameIsLoading, isSuccess:setNameIsSuccess, write:writeSetName } = useContractWrite({
    address: L2_REVERSE_REGISTRAR_ADDRESS,
    abi: l2ReverseAbi,
    functionName:'setName',
    chainId
  })

  return(
    <div style={{margin:"1em"}}>
    <h1 style={{marginBottom:"1em"}}>{name}</h1>
    <ul>
      <li>encodedName: {encodedName}</li>
      <li>node: {node}</li>
      <li>operator: {operator}</li>
      <li>address: {address}</li>
      <li>
        l1 address:{l1address}
      </li>
      <li>
        l2 address:{addrData}
      </li>
    </ul>
    {canEdit && (
      <div>
        <Input
            label="Add address"
            placeholder=""
            width='128'
            onChange={(evt) => {setNewAddress(evt.target.value)}}
        />
        <Button
            width="45" style={{marginTop:"28px",marginLeft:"15px"}}
            disabled={!newAddress}
            onClick={(evt) => {
                console.log('***clicked', {node, newAddress, address})
                writeSetAddr({args:[node, newAddress], from:address})
            }}
        >{setAddrIsLoading ? (<Spinner></Spinner>): (<div>Set Record</div>)}</Button>
          {setAddrData? (<div>
            <a style={{color:"blue", marginTop:"40px", marginLeft:"5px"}}
              target="_blank" href={`${l2ExplorerUrl}/tx/${setAddrData.hash}`}>
              {setAddrData.hash}
            </a>
          </div>) : '' }
          <Button
            width="45" style={{marginTop:"28px",marginLeft:"15px"}}
            disabled={!cansetName}
            onClick={(evt) => {
              console.log('***clicked', {name, address})
              writeSetName({args:[name], from:address})
            }}
        >{setNameIsLoading ? (<Spinner></Spinner>): (<div>Set Primary Name</div>)}</Button>
          {setNameData? (<div>
            <a style={{color:"blue", marginTop:"40px", marginLeft:"5px"}}
              target="_blank" href={`${l2ExplorerUrl}/tx/${setNameData.hash}`}>
              {setNameData.hash}
            </a>
          </div>) : '' }
        </div>
    )}
  </div>)
}