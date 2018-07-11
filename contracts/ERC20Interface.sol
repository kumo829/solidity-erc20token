// Abstract contract for the full ERC 20 Token standard
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
pragma solidity ^0.4.24;

/**
* @title ERC20Interface
* @author Tomado del código de Fabian Vogelsteller, Vitalik Buterin
* @dev Este contrato fue modificado por Alex Montoya
 */
contract ERC20Interface {
    /* This is a slight change to the ERC20 base standard.
    function totalSupply() constant returns (uint256 supply);
    is replaced with:
    uint256 public totalSupply;
    This automatically creates a getter function for the totalSupply.
    This is moved to the base contract since public getter functions are not
    currently recognised as an implementation of the matching abstract
    function by the compiler.
    */
    /// Returns the total token supply.
    uint256 public totalSupply;

    /// Returns the name of the token - e.g. "MyToken"
    string public name;

    ///Returns the symbol of the token. E.g. "HIX".
    string public symbol;


    ///Returns the number of decimals the token uses - e.g. 8, means to divide the token amount by 100000000 to get its user representation.
    uint8 public decimals;


    /// @param _owner The address from which the balance will be retrieved
    /// @return The balance
    function balanceOf(address _owner) public view returns (uint256 balance);

    /// @notice send `_value` token to `_to` from `msg.sender`
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transfer(address _to, uint256 _value) public returns (bool success);

    /// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`
    /// @param _from The address of the sender
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success);

    /// @notice `msg.sender` approves `_spender` to spend `_value` tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @param _value The amount of tokens to be approved for transfer
    /// @return Whether the approval was successful or not
    function approve(address _spender, uint256 _value) public returns (bool success);

    /// @param _owner The address of the account owning tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @return Amount of remaining tokens allowed to spent
    function allowance(address _owner, address _spender) public view returns (uint256 remaining);

    // solhint-disable-next-line no-simple-event-func-name
    /**
    * @dev MUST trigger when tokens are transferred, including zero value transfers.
    * @notice A token contract which creates new tokens SHOULD trigger a Transfer event with the _from address set to 0x0 when tokens are created.
    * @param _from origin address
    * @param _to destination address (recipient)
    * @param _value number of tokens
    */
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    /** MUST trigger on any successful call to approve(address _spender, uint256 _value).*/
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}
