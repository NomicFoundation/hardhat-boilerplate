// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

/**
██████████████████████▀████████████████████
█▄─▄▄─█▄─▄─▀█─▄▄─█─▄▄▄▄███▄─▄▄▀██▀▄─██─▄▄─█
██─▄█▀██─▄─▀█─██─█─██▄─████─██─██─▀─██─██─█
▀▄▄▄▄▄▀▄▄▄▄▀▀▄▄▄▄▀▄▄▄▄▄▀▀▀▄▄▄▄▀▀▄▄▀▄▄▀▄▄▄▄▀
There are 2 options;
a.) I, the owner of this address, Opt-out completely from the EBOG DAO.
b.) I, the owner of this address, Opt-in to the EBOG DAO. I have read and agreed to the participation agreement below.
If you do not opt-in or out, you are still a member of the EBOG DAO. You still have the same voting power, however you will not receive airdrops, payments, or other benefits. This to protect the EBOG DAO, it’s members, and assets.
Participation Agreement
Please read this participation agreement ("agreement") carefully before confirming your intent to be bound by it and participating in the EBOG DAO. This agreement includes the terms of participation in the EBOG DAO. You understand, agree and confirm that:
1. The EBOG DAO is an experiment in the field of decentralized governance structures, in which participation is entirely at your own risk;
2. This agreement has legal consequences and by entering into this agreement you release all rights, claims, or other causes of action whether in equity or law you may have against EBOG DAO service providers or other EBOG DAO participants.
    You also agree to waive and limit any potential liability of EBOG DAO service providers or other EBOG DAO participants;
3. You are sophisticated and have sufficient technical understanding of the functionality, usage, storage, transmission mechanisms, and intricacies associated with cryptographic tokens, token storage facilities (including wallets), blockchain technology, and blockchain-based software systems.
*/

contract EBOGAgreement {
    string public name = "EBOG Agreement";
    string public symbol = "OPT";

    mapping (address => bool) optIn;
    mapping (address => bool) optOut;

    function optIntoEBOG() public {
        require(!optIn[msg.sender], 'You have already voted: Opted In');
        require(!optOut[msg.sender], 'You have already voted: Opted Out');

        optIn[msg.sender]  = true;
    }

    function optOutOfEBOG() public {
        require(!optIn[msg.sender], 'You have already voted: Opted In');
        require(!optOut[msg.sender], 'You have already voted: Opted Out');

        optOut[msg.sender] = true;
    }

    function getAddressStatus(address _address) public view returns (string memory) {
        if (optIn[_address]) {
            return "This address voted to Opt In";
        } else if (optOut[_address]) {
            return "This address voted to Opt Out";
        } else {
            return "This address has not voted.";
        }
    }
}
