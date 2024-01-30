# ENS L2 demo app (v2)

This is the rewrite of [v1](https://github.com/makoto/my-l2-app) but using [EVM Gateway](https://github.com/ensdomains/evmgateway) instead of dm3's [Bedrock Resolver](https://github.com/corpus-io/ENS-Bedrock-Resolver).

The demo allows anyone to either register subnames under `op.evmgateway.eth` on Optimism Goerli chain or subnames under `base.evmgateway.eth` on $BASE chain.

## Setting up the server

```
gh repo clone makoto/my-l2-app-v2
cd my-l2-app-v2
yarn
cp .env.example .env // Update the constants
yarn start
```

## Video Walkthrough

- https://www.loom.com/share/95e306023be74b0585f919e27db28a1a


## Setting up the subname registrar for your own name

### Set resolver of your name to one of these resolvers on Goerli

- OP L1Resolver = [0xE0356133C3c43cbb623543488E607E4e349eAA10](https://sepolia.etherscan.io/address/0xE0356133C3c43cbb623543488E607E4e349eAA10#code)
- Base L1Resolver = [0xE00739Fc93e27aBf44343fD5FAA151c67C0A0Aa3](https://sepolia.etherscan.io/address/0xE00739Fc93e27aBf44343fD5FAA151c67C0A0Aa3#code)
- Arb L1Resolver = [0x9F3C37A6cDd5ECA7b27140856753EDBF387c06bB](https://sepolia.etherscan.io/address/0x9F3C37A6cDd5ECA7b27140856753EDBF387c06bB#code)

### Find out the corresponding l2 resovler address via DelegatableResolverFactory

On L2, each parent name will own its own resolver and you issue subnames under your resolver.

- Optimism DelegatableResolverFactory = [0x4166B7e70F14C48980Da362256D1Da9Cc8F95e13](https://sepolia-optimism.etherscan.io/address/0x4166B7e70F14C48980Da362256D1Da9Cc8F95e13#code)
- Base L2 DelegatableResolverFactory = [0x0e8DA38565915B7e74e2d78F80ba1BF815F34116](https://sepolia.basescan.org/address/0x0e8DA38565915B7e74e2d78F80ba1BF815F34116#code)
- Arbitrum L2 DelegatableResolverFactory = [0x94fbCE7ca1a0152cfC99F90f4421d31cf356c896](https://api-sepolia.arbiscan.io/address/0x94fbCE7ca1a0152cfC99F90f4421d31cf356c896#code)


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
