# Pay Machine Smart Contract and Demo Dapp

## Overview 

This is a demo decentralized application (dapp) that uses two smart contracts deployed to the Linea Testnet below. 

* SomeToken Contract
* PayMachine Contract

## PayMachine Smart Contract 

The PayMachine smart contract is a simple smart contract that contains two functions documented below and deployed to the Linea Testnet. 

#### Record of Deployment
The record of deployment can be found in Linea's Testnet Etherscan here:

https://goerli.lineascan.build//address/0x18f96F834328d7Da797fBa05eBf86303eba6D29e

#### Smart Contract Address
0xD61DbCc1FC10f6255c25B53a0c8826aB1833EB17

#### LineaScan URL
https://goerli.lineascan.build/address/0xd61dbcc1fc10f6255c25b53a0c8826ab1833eb17

### The  ```transferEth``` Function

```transferEth(address payable _recipient)```

This smart contract function demonstrates the ability to transfer ETH to a recipient via a smart contract instead of directly using a wallet or exchange. While it does nothing special, it shows that other rules can be built into a smart contract function that pays the ETH. 

### The ```transferToken``` Function

```transferToken(address _tokenAddress, address payable _recipient, uint256 _amount)```

This smart contract function demonstrates the ability to transfer the specified amount of an ERC20 token to the specified recipient. To demonstrate this function, the SomeToken ERC20 token was created (below).

## SomeToken
This is a simple ERC20 token smart contract deriving from OpenZeppelin's implementation of the ERC20 token standard and uses ```SMTKN``` as its symbol. This token was deployed with a mint of ```1,000,000,000 SMTKN``` total supply. 

#### Record of Deployment
The record of deployment can be found in Linea's Testnet Etherscan here:

https://goerli.lineascan.build//address/0x18f96F834328d7Da797fBa05eBf86303eba6D29e

#### Smart Contract Address
0x7eEcB2CDe57e098E8936Bb315C5368cbe0660d8d

#### LineaScan URL
https://goerli.lineascan.build/address/0x7eecb2cde57e098e8936bb315c5368cbe0660d8d

#### LineaScan Token Tracker URL
https://goerli.lineascan.build/token/0x7eecb2cde57e098e8936bb315c5368cbe0660d8d

## The Decentralized Application (Dapp)

In order to demonstrate the use of the PayMachine smart contract and its associated `SMTKN` token, the PayMachine Demo Dapp was created as a UI that executes ETH and token transfers using the PayMachine smart contract above. 

### Requirements

* This Dapp has only been tested with Metamask so if you want to try it you should have the Metamask extension installed and connected to the Linea Testnet using the network details below. 

  **ChainId**: 59140\
  **RPC URL**: https://rpc.goerli.linea.build \
  **Currency Symbol**: ETH\
  **Block explorer URL**: https://goerli.lineascan.build/

* You will need an address with a little bit of `LineaETH` in it to execute a transfer of ETH. See the **Usage** instructions below.
  
* You will need a recipient address to send ETH to

* In order to send ```SMTKN``` you will need to use an address that contains some ```SMTKN``` and a recipient address to receive it. Since ```SMTKN``` is not a real token, it isn't exchanged anywhere, and there is no faucet for it, an account with its private key is provided below. You are free to add it to Metamask and transfer some ```SMTKN``` to a recipient address of your choice to test. 

  **Test Acct:**` 0x13caaf6bBdE3651b40447B461A42B9F60c5E8b11`\
  **Test PKey:**`  c3f31d6d889c98fa14cb88b5ef07d83c5b6609da6acf515fe8a7f4cba2e3378f`

  PLEASE FOLLOW THE RULES BELOW

  * Don't transfer the whole amount. One ```SMTKN``` or two is enough to give it a go and leave some for others to test.

  * Don't use this account for anything meaningful. The private key is shared here for the world to see and use. You have been warned.

### Usage 

* Login to your Metamask extension 

* Select a test account. 

* Click "connect" when prompted in Metamask after selecting the account.

* If you don't have any Tesnet ETH in the account then get some using the faucet at the link below. 

  https://faucet.goerli.linea.build/

  
* Add the test account provided above if you want to test the transfer of `SMTKN` tokens

  **Note:** When switching accounts in Metamask, the dapp will automatically update about every 20 seconds. However, there is a limit to the polling so it will not update automatically if it's reached its polling limit. It is recommended to refresh the page to update the currently selected Metamask account in the Dapp. It will save you some time anyway.

* Ensure the source account is displayed in the purple header at the top

* Select the token you want to transfer (ETH or SMTKN) from the drop-down

* Enter the amount to send

* Select a recipient address from the list or enter one manually

  * The list will contain any Metamask accounts that you've connected to the dapp. If you haven't connected the recipient account using Metamask, then switch to that account temporarily and connect it to get it to show up in the list. Otherwise, you will have to enter that account's public receive address manually. 

* Click the "Send" button to execute the transfer

  * Metamask will prompt you to approve the amount. You should add a bit to the amount to account for the gas fees. 
  
  * Confirm the transaction in Metamask when you are prompted 

* Examine the resulting transactions

  * The dapp will display transactions **sent** by the current account in the transaction table below. It will not show transactions received.

  * You can examine the transactions in the LineaScan block explorer using the link template below

    https://goerli.lineascan.build//address/`[address-here]`

  * You can examine transfers of `SMTKN` at the smart contract address below

    https://goerli.lineascan.build/token/0x7eecb2cde57e098e8936bb315c5368cbe0660d8d



