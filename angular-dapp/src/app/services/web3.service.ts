import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import { Observable } from 'rxjs';
import { Data } from '../model/Data';

declare var window: any;

@Injectable()
export class Web3Service {
  public web3: any;


  constructor() { this.intantiateWeb3(); }

  intantiateWeb3 = () => {
    if (typeof window.web3 !== 'undefined') {
      console.log("Widows provider");
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log("private network provider");
      this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }
  };

  getAccounts(): Observable<any> {
    return Observable.create(observer => {
      this.web3.eth.getAccounts((error, accounts) => {
        if (error != null) {
          observer.error("There was an error fetching your accounts");
        }

        if (accounts.length === 0) {
          observer.error("Couldn't get any accounts. Make sure your Ethereum client is configured correctly.");
        }

        observer.next(accounts);
        observer.complete();
      });
    });
  }

  getCoinbase(): Observable<Data> {
    return Observable.create(observer => {
      this.web3.eth.getCoinbase((error, coinbase) => {
        if (error != null) {
          observer.error("There was an error fetching coinbase account");
        }

        this.web3.eth.getBalance(coinbase, (error, balance) => {
          if (error != null) {
            observer.error("There was an error fetching  balance from account " + coinbase);
          }

          var data = new Data();
          data.fromAccount = coinbase;
          data.balance = this.web3.fromWei(balance, "ether");
          observer.next(data);
          observer.complete();
        });
      });
    });
  }
}
