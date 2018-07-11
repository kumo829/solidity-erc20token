pragma solidity ^0.4.24;

import "../contracts/StandardToken.sol";

interface tokenRecipient {
    function receiveApproval(address from, uint256 tokens, address tokenAddress, byte extraData) external;
}

contract TokenGenerator is StandardToken {
    string public name;
    string public symbol;
    uint8 public decimals = 18;

    constructor(uint256 initialSupply, string tokenName, string tokenSymbol) 
                                                StandardToken(tokenName, tokenSymbol) public{
        totalSupply = initialSupply * uint256(10) ** decimals;
        balances[msg.sender] = totalSupply;
    }

    /**
    * @notice esta función es llamada cuando se quiere permitir a una dirección usar ciertos tokens
    * @param spenderAddress la dirección a la que se le permitirá usar tokens
    * @param tokens el número de tokens que se permitirá usar
    * @param extraData información adicional sobre esta autorización
    */
    function approveAndCall(address spenderAddress, uint256 tokens, byte extraData) public {
        tokenRecipient spender = tokenRecipient(spenderAddress);

        if(approve(spender, tokens)){
            spender.receiveApproval(msg.sender, tokens, this, extraData);
        }
    }
}