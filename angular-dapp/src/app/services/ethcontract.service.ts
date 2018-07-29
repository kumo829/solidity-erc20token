import { Injectable, OnInit } from '@angular/core';
import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract';
import { resolve } from 'q';
import { Data } from '../model/Data';

declare let require: any;
declare let window: any;

let tokenAbi = require(`../../../../build/contracts/TokenGenerator.json`)

@Injectable({
  providedIn: 'root'
})
export class EthcontractService implements OnInit {

  private web3Provider: null;

  ngOnInit() {
    if (typeof window.web3 != 'undefined') {
      console.log("Widows provider");
      this.web3Provider = window.web3.currentProvider;
    } else {
      console.log("private network provider");
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }

    window.web3 = new Web3(this.web3Provider);
  }

  getAccountInfo() {
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase(function (err, account) {
        if (err === null) {
          window.web3.eth.getBalance(account, function (err, balance) {
            if (err === null) {
              var data = new Data();
              data.fromAccount = account;
              data.balance = window.web3.fromWei(balance, "ether");
              return resolve(data);
            } else {
              return reject("error!");
            }
          });
        }
      })
    });
  }

  balanceOf(_address) {
    let that = this;
    return new Promise((resolve, reject) => {
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(that.web3Provider);
      paymentContract.at('0xa02663f601d2badf0bf594e5b2fc85b2a6d1bf8a').then(function (instance) {
        return instance.balanceOf(_address);
      }).then(function (balance_of_account_two) {
        alert("Balance of account two is " + balance_of_account_two + "!") // => 1.5
      }).catch(function (err) {
        alert("ERROR! " + err.message);
      });;
    });
  }

  transfer(_transferTo, _amount) {
    let that = this;
    return new Promise((resolve, reject) => {
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(that.web3Provider);
      paymentContract.at('0xa02663f601d2badf0bf594e5b2fc85b2a6d1bf8a').then(function (instance) {
        console.log(_transferTo);
        return instance.transfer(_transferTo, _amount, { from: '0xb6e08874e9f1658ccffe0eef47f830b34dc7f006' });
      }).then(function (status) {
        console.log("status");
        console.log(status);
        if (status) {
          return resolve({ status: true });
        }
      }).catch(function (error) {
        console.error("Error:");
        console.error(error);
        return reject("Error in transferEther service call");
      })
    });
  }
}
