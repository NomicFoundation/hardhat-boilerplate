const { ethers } = require("hardhat")

console.log('wei/eth: ', ethers.constants.WeiPerEther)
console.log('wei/eth: ', ethers.BigNumber.from("42"))
console.log('wei/eth: ', ethers.constants.One)


console.log('wei/eth: ', ethers.BigNumber.from("42").toNumber())
console.log('wei/eth: ', ethers.constants.One.toNumber())
console.log('wei/eth: ', ethers.constants.WeiPerEther.toString())

console.log('wei/eth: ', ethers.constants.WeiPerEther.toString()) 

console.log('wei/eth: ', ethers.BigNumber.from("100000000000000000").toString() )

 
// 0.1 ETH  
let bn1 = ethers.BigNumber.from("100000000000000000");
console.log( bn1);
console.log( bn1.toString() )

console.log("multiply :" ,ethers.constants.WeiPerEther.mul( 500 ).toString()) 

console.log("MAX: ",  Number.MAX_SAFE_INTEGER)
console.log("exp: ", (10e2))