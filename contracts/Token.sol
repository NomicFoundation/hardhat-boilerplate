// Every contract should start with `pragma Solidity`.
// This will be used by the Solidity compiler.
pragma solidity ^0.5.15;

import "@nomiclabs/buidler/console.sol";

/**
 * This is the main building block for smart contracts.
 */
contract Token {

    // Some string type variables to identify the token.
    string public name = "My Buidler Token";
    string public symbol = "MBT";

    // The fixed amount of tokens stored in an unsigned integer type variable.
    uint256 public totalSupply = 1000;

    // An address type variable is used to store ethereum accounts.
    address public owner = address(0);

    // A mapping is a key/value map. Here we store each account balance.
    mapping(address => uint256) balances;
    
    /**
     * Contract initialization.
     *
     * The `constructor` is executed only once when the contract is created.
     * The `public` modifier makes a function callable from outside the contract.
     */
    constructor() public {
        
        // The totalSupply is assigned to transaction sender, which is the account
        // that is deploying the contract.
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    /**
     * A function to transfer tokens.
     *
     * The `external` modifier makes a function *only* callable from outside
     * the contract.
     */
    function transfer(address to, uint256 amount) external {
        // Check if the transaction sender has enough tokens.
        // If `require` evaluates `false` then the transaction will revert.
        require(balances[msg.sender] >= amount, "Not enough tokens");

	console.log("Transferring from %s to %s %s tokens", msg.sender, to, amount);

        // Transfer the amount.
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    /**
     * Read only function to retrieve the token balance of a given account.
     *
     * The `view` modifier allows us to call this function without executing a
     * transaction.
     */
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }

}
