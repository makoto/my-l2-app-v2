# ENS L2 demo app (v2)

This is the rewrite of [v1](https://github.com/makoto/my-l2-app) but using [EVM Gateway](https://github.com/ensdomains/evmgateway) instead of dm3's [Bedrock Resolver](https://github.com/corpus-io/ENS-Bedrock-Resolver).

The demo allows anyone to either register subnames under `op.evmgateway.eth` on Optimism Goerli chain or subnames under `base.evmgateway.eth` on $BASE chain.

## Setting up the server


```
gh repo clone makoto/my-l2-app-v2
cd my-l2-app-v2
yarn
yarn start
```

## Video Walkthrough

- https://www.loom.com/share/95e306023be74b0585f919e27db28a1a


## Setting up the subname registrar for your own name

### Set resolver of your name to one of these resolvers on Goerli

- OP L1Resolver = [0x65a0963A2941A13a96FcDCfE36c94c6a341f26E5](https://goerli.etherscan.io/address/0x65a0963A2941A13a96FcDCfE36c94c6a341f26E5) 

- Base L1Resolver = [0x052D7E10D55Ae12b4F62cdE18dBb7E938efa230D](https://goerli.etherscan.io/address/0x052D7E10D55Ae12b4F62cdE18dBb7E938efa230D)

### Find out the corresponding l2 resovler address via DelegatableResolverFactory

On L2, each parent name will own its own resolver and you issue subnames under your resolver.

- Optimism DelegatableResolverFactory = [0xacB9771923873614d77C914D716d8E25dAF09b8d](https://goerli-optimism.etherscan.io/address/0xacB9771923873614d77C914D716d8E25dAF09b8d)
- Base L2 DelegatableResolverFactory = [0x7d56Bc48F0802319CB7C79B421Fa5661De905AF7](https://goerli.basescan.org/address/0x7d56Bc48F0802319CB7C79B421Fa5661De905AF7)

```
const l2resolverAddress = await DelegatableResolverFactory.predictAddress(OWNER_ADDRESS)
```

### Set the l2 resolver address as a traget

```
YOURNAME = 'somenewname.eth'
node = ethers.namehash(`(base|op).{YOURNAME}`)
await L1Resolver.setTarget(node, l2resolverAddress)
```

### Deploy l2 subname registrar

- Deploy [DelegatableResolverRegistrar.sol](https://gist.github.com/makoto/7d83ca6530adc69fea27923ee8ae8986) to L2 with resolver address as `target` which you obtained at step 1.
Take notes of the deployed registrar address 

### Grant the subname registrar as the root

```
const DelegatableResolver = new ethers.Contract(l2resolverAddress, abi, l2provider);
await DelegatableResolver.approve(encodedname, DELEGATABLE_RESOLVER_REGISRTRAR_ADDRESS, true)
```

### Replace `evmgateway.eth` on this repo's code to your ENS name 
