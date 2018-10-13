const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');

let accounts, inbox;

beforeEach(async () => {
  // Get a list of accounts
  accounts = await web3.eth.getAccounts();

  //Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode, arguments: ['Hi There!'] })
    .send({
      from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi There!');
  });

  it('changes default value', async () => {
    await inbox.methods.setMessage('LOL!').send({from: accounts[0]});
    const message = await inbox.methods.message().call();
    assert.equal(message, 'LOL!');
  });

});


// class Car{
//   park() {
//     return 'stopped';
//   }
//
//   drive() {
//     return 'vroom';
//   }
//
// }
//
// let car;
// beforeEach(() => {
//   car = new Car();
// });
//
// describe('Car Class', () => {
//   it('Attempting to test Park', () => {
//     assert.equal(car.park(), 'stopped');
//   });
//
//   it('Attempting to test drive', () => {
//     assert.equal(car.drive(), 'vroom');
//   });
// });
