//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.3;

// We import this library to be able to use console.log
import "hardhat/console.sol";


contract Experiments {

  uint privateValue = 123;
  uint public publicValue = 321;

  function getPrivateValue() public view returns (uint) {
    return privateValue;
  }

  function getPublicValue() public view returns (uint) {
    return publicValue;
  }

}
