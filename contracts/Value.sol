//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.7.0;

// We import this library to be able to use console.log
import "hardhat/console.sol";


// This is the main building block for smart contracts.
contract Value {
    function getMsgValue() public payable returns(uint256, uint256) {
        return (msg.value, msg.sender.balance);
    }
}
