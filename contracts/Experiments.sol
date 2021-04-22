//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.3;

// We import this library to be able to use console.log
import "hardhat/console.sol";


contract Experiments {

  address public owner;
  string public name;

  constructor(string memory _name) {
    owner = msg.sender;
    name = _name;
  }

}
