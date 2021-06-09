// This is an exmaple test file. Hardhat will run every *.js file in `test/`,
// so feel free to add new ones.

// Hardhat tests are normally written with Mocha and Chai.

// We import Chai to use its asserting functions here.
const { expect } = require("chai");

// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` recieves the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe.only("Value test", function () {
  // Mocha has four functions that let you hook into the the test runner's
  // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

  // They're very useful to setup the environment for tests, and to clean it
  // up after they run.

  // A common pattern is to declare some variables, and assign them in the
  // `before` and `beforeEach` callbacks.

  let Factory__Value;
  let Value;


  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Factory__Value = await ethers.getContractFactory("Value");

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens onces its transaction has been
    // mined.
    Value = await Factory__Value.deploy();
    await Value.deployed();
  });

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {

    it("Should assign the total supply of tokens to the owner", async function () {
      const sender = await Value.signer.getAddress()
      const initialSenderBalance = await Value.provider.getBalance(sender)
      console.log('initialSenderBalance')
      console.log(initialSenderBalance)
      const moreValue = initialSenderBalance.add(100)
      const lessValue = initialSenderBalance.sub(100)
      console.log('moreValue:')
      console.log(moreValue)
      console.log('lessValue:')
      console.log(lessValue)

      const resEqual = await Value.callStatic.getMsgValue({value: initialSenderBalance, from: sender, gasPrice: 0})
      console.log('msg.value, msg.sender.balance (eth_call with EQUAL value than the account has:')
      console.log(resEqual)
      expect(resEqual[0]).to.eq(initialSenderBalance)
      expect(resEqual[1]).to.eq(0)

      const resLess = await Value.callStatic.getMsgValue({value: lessValue, from: sender, gasPrice: 0})
      console.log('msg.value, msg.sender.balance (eth_call with 0x64 LESS value than the account has:')
      console.log(resLess)
      expect(resLess[0]).to.eq(lessValue)
      expect(resLess[1]).to.eq(100)

      // believe it or not, eth_call with X + from.balance leaves X in from, and also sends a msg.value of X + from.balance.... WUT
      const resMore = await Value.callStatic.getMsgValue({value: moreValue, from: sender, gasPrice: 0})
      console.log('msg.value, msg.sender.balance (eth_call with 0x64 MORE value than the account has:')
      console.log(resMore)
      expect(resMore[0]).to.eq(moreValue)
      expect(resMore[1]).to.eq(100)

    });
  });

});
