pragma solidity ^0.4.24;

import "../contracts/ERC20Interface.sol";

contract StandardToken is ERC20Interface{
    mapping (address => uint256) balances;
    mapping (address => mapping (address => uint256)) allowed;
    uint256 public totalSupply;

    function balanceOf(address tokenOwner) public view returns (uint balance){
        return balances[tokenOwner];
    }

    function allowance(address tokenOwner, address spender) public view returns (uint remaining) {
        return allowed[tokenOwner][spender];
    }

    function transfer(address to, uint tokens) public returns (bool success) {
        //burning ether
        require(to != 0x0);

        //validamos overflow
        require(balances[to] + tokens >= balances[to]);

        //validamos que tenga suficiente saldo y tokens
        require(balances[msg.sender] >= tokens && tokens > 0);

        balances[msg.sender] -= tokens;
        balances[to] += tokens;

        emit Transfer(msg.sender, to, tokens);
        return true;
    }
}