// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
* 
* ██████████████████████▀████████████████████
* █▄─▄▄─█▄─▄─▀█─▄▄─█─▄▄▄▄███▄─▄▄▀██▀▄─██─▄▄─█
* ██─▄█▀██─▄─▀█─██─█─██▄─████─██─██─▀─██─██─█
* ▀▄▄▄▄▄▀▄▄▄▄▀▀▄▄▄▄▀▄▄▄▄▄▀▀▀▄▄▄▄▀▀▄▄▀▄▄▀▄▄▄▄▀
*
* Please read this participation ("agreement") 
* carefully before confirming your intent to 
* be bound by it and participating in the
* OG DAO. This agreement includes the terms
* of participation in the OG DAO. You 
* understand, agree and confirm that:
*
* 1.) The OG DAO is an experiment in the 
*     field of decentralized governance
*     structures, in which participation 
*     is entirely at your own risk.
* 2.) This agreement has legal consequences 
*     and by entering into this agreement 
*     you release all rights, claims, or 
*     other causes of action whether in 
*     equity or law you may have against 
*     OG DAO service providers or other
*     OG DAO participants. You also agree to
*     waive and limit any potential liability
*     of OG DAO service providers or other 
*     OG DAO participants. 
* 3.) You are sophisticated and have 
*     sufficient technical understanding of
*     the functionality, usage, storage, 
*     transmission mechanisms, and intricacies
*     associated with cryptographic tokens, 
*     token storage facilities (including 
*     wallets), blockchain technology, and 
*     blockchain-based software systems.
* 
* 
* There are 2 options:
* 1.) I, the owner of this address, 
*     Opt-out completely from the OG DAO.
* 
* 2.) I, the owner of this address, Opt-in
*     to the OG DAO. I have read and agreed 
*     to the participation agreement below.
* 
* 
* If you do not opt-in or out, you are still a 
* member of the OG DAO. You still have the same 
* voting power, however you will not receive 
* airdrops, payments, or other benefits. This is
* to protect the OG DAO, it’s members, and assets.
* 
*/


import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OGAgreement is AccessControl, Ownable {
    uint256   public totalAccounts = 0;
    address[] public optInAccounts;
    address[] public optOutAccounts;
    bool      public contractActive;

    mapping (address => bool) public optIn;
    mapping (address => bool) public optOut;

    // @dev Create the community role with the contract owner as a member.
    constructor() {
        contractActive = true;
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole('EBOG', msg.sender);
    }

    function optIntoEBOG() public onlyMember {
        require(contractActive, "The contract no longer allows opt-ins");
        require(!optIn[msg.sender] && !optOut[msg.sender], 'You have already voted');

        totalAccounts += 1;
        optIn[msg.sender] = true;
        optInAccounts.push(msg.sender);
    }

    function fetchOptInAccounts() public view returns (address[] memory) {
        return optInAccounts;
    }

    function optOutOfEBOG() public onlyMember {
        require(!optIn[msg.sender] && !optOut[msg.sender], 'You have already voted');

        totalAccounts += 1;
        optOut[msg.sender] = true;
        optOutAccounts.push(msg.sender);
    }

    function fetchOptOutAccounts() public view returns (address[] memory) {
        return optOutAccounts;
    }

    function getAddressStatus(address _address) public view returns (string memory) {
        require(isMember(msg.sender), "Restricted to members.");

        if (optIn[_address]) {
            return "This address voted to Opt In";
        } else if (optOut[_address]) {
            return "This address voted to Opt Out";
        } else {
            return "This address has not voted.";
        }
    }

    // @dev Restricted to members of the community.
    modifier onlyMember() {
        require(isMember(msg.sender), "Restricted to members.");
        _;
    }

    // @dev Return `true` if the `account` belongs to the community.
    function isMember(address account) public virtual view returns (bool) {
        return hasRole('EBOG', account);
    }

    // @dev Add a member of the community. Caller must already belong to the community.
    function addMember(address account) public virtual onlyOwner() {
        grantRole('EBOG', account);
    }

    // @dev Add a member of the community. Caller must already belong to the community.
    function addMembers(address[] memory accounts) public virtual onlyOwner() {
        for(uint i=0; i<accounts.length; i++)
        {
            grantRole('EBOG', accounts[i]);
        }
    }

    // @dev Remove oneself as a member of the community.
    function leaveCommunity() public virtual {
        renounceRole('EBOG', msg.sender);
    }
    
    function activationSwitch() public onlyOwner returns (string memory) {
        if (contractActive) {
            contractActive = false;
            return "Contract has been Deactivated";
        } else {
            contractActive = true;
            return "Contract has been Activated";
        }
    }

}
