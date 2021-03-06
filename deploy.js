const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
  'ancient resource throw charge all initial treat galaxy session dune frame suggest',
  'https://rinkeby.infura.io/233df0a2a57a4335acac81af0a6c2719'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy to account: ', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['HI!']})
    .send({gas: '1000000', from: accounts[0]});

  console.log('Contract deployed to: ' + result.options.address);
};
deploy();
  
