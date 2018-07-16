/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "addme";
var infuraToken = "addme";
 
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    "private": {
      network_id: 829,
      host: "127.0.0.1",
      port: 8545   // Different than the default below
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/" + infuraToken)
      },
      gas: 4500000,
      gasPrice: 10000000000,
      network_id: 3
    }/*,
     ropsten: {
      host: "localhost",
      port: 8545,
      gas: 4700000,
      from: "0xc362947f76bE7de81A5eE9cDEbDF6B835EAa6252",
      gasPrice: 1000000000,
      network_id: "3"
    }*/
  }
};
