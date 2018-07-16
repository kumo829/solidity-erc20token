pragma solidity ^0.4.24;

import "./openzeppelin-solidity/StandardToken.sol";
//import "github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/token/ERC20/StandardToken.sol";

contract TokenGenerator is StandardToken {
    string public name = "BACoin"; 
    string public symbol = "BAC";
    uint public decimals = 2;
    uint public INITIAL_SUPPLY = 10000 * (10 ** decimals);

    address public owner;

    constructor() public{
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
        owner = msg.sender;
    }
    
    function kill() public {
        if (msg.sender == owner) selfdestruct(owner);
    }
}