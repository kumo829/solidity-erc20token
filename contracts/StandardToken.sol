pragma solidity ^0.4.24;

import "../contracts/ERC20Interface.sol";


/**
* @title StandardToken
* @notice Implementacion del estándar ERC20 para el manejo de tokens
 */
contract StandardToken is ERC20Interface{
    ///Balance de cada usuario
    mapping (address => uint256) balances;

    ///Usuarios a los que se les permite usar tokens de otro usuario
    mapping (address => mapping (address => uint256)) allowed;

    //Número total de Tokens
    uint256 public totalSupply;

    /**
    * @notice indica el balance (número de tokens) que tiene el usuario indicado.
    * @param tokenOwner dirección del usuario del que se quieren conocer los tokens
    * @return el balance actual del usuario
    */
    function balanceOf(address tokenOwner) public view returns (uint balance){
        return balances[tokenOwner];
    }

    /**
    * @notice indica cuántos tokens tiene permitido usar el cliente indicado
    * @param tokenOwner la dirección que permite que se use un número de sus tokens
    * @param spender la dirección a la qu se le permite usar un número de tokens
    */
    function allowance(address tokenOwner, address spender) public view returns (uint remaining) {
        return allowed[tokenOwner][spender];
    }

    /**
    * @notice transfiere un número de tokens a la dirección indicada
    * @dev la dirección origen es la que invoca el contrato (msg.sender)
    * @dev al final del proceso se emite un mensaje de transferencia
    * @param to dirección a la que se transfieren los tokens
    * @param tokens el número de tokens que se tranfieren
    * @return el resultado de la operación (true normalmente)
    */
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


    /**
    * @notice transfiere tokens de una dirección a otra
    * @dev se debe verificar si la dirección origen tiene permitido usar el número de tokens indicado
    * @param from la dirección origen de los tokens (debe permiter que el emisor use tokens)
    * @param to dirección a la que se envían tokens
    * @param tokens número de tokens que se envían
    * @return el resultado de la operación (true normalmente)
    */
    function transferFrom(address from,  address to, uint tokens) public returns (bool success){
        //burning ether
        require(to != 0x0);

        //se validan overflows
        require(balances[to] + tokens >= balances[to]);

        //se valida que se tenga el saldo suficiente y que se envíe un número válido de tokens
        require(balances[from] >= tokens && tokens > 0);

        //se valida que se tenga permitido realizar el envío de tokens y que se permita envíae el número indicado
        require(allowed[from][msg.sender] >= tokens);

        balances[from] -= tokens;
        balances[to] += tokens;
        allowed[from][msg.sender] -= tokens;

        emit Transfer(from, to, tokens);
        return true;
    }
}