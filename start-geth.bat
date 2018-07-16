echo off
set account=%1

geth --unlock %account% --testnet --rpc --rpcapi eth,net,web3,personal