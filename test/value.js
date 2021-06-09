
const { expect } = require("chai");

describe.only("Value test", function () {
  
  let Factory__Value;
  let Value;
  beforeEach(async function () {

    Factory__Value = await ethers.getContractFactory("Value");

    Value = await Factory__Value.deploy();
    await Value.deployed();
  });


  describe("WTF value", function () {

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
