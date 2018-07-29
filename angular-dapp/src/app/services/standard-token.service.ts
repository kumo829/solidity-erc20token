import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';
import * as TruffleContract from 'truffle-contract';
import { Observable } from 'rxjs';
import { TransactionResult } from '../model/TransactionResult';

declare let require: any;
const tokenAbi = require(`../../../../build/contracts/TokenGenerator.json`)

@Injectable()
export class StandardTokenService {

  contract;

  constructor(private web3Srv: Web3Service) {
    this.contract = TruffleContract(tokenAbi, '0xa02663f601d2badf0bf594e5b2fc85b2a6d1bf8a');
    this.contract.setProvider(web3Srv.web3.currentProvider);
    //this.contract.at('0xa02663f601d2badf0bf594e5b2fc85b2a6d1bf8a');
  }

  balanceOf(address): Observable<any> {
    let that = this;

    return Observable.create(observer => {
      this.contract.deployed().then(instance => {
        return instance.balanceOf.call(address);
      }).then(balance => {
        observer.next(balance);
        observer.complete();
      }).catch(err => {
        console.error(err);
        observer.error(err);
      });;
    });
  }

  transfer(transferTo, amount): Observable<any> {
    let that = this;
    return Observable.create(observer => {

      let result: TransactionResult = new TransactionResult();
      this.contract.deployed()
        .then(instance => {

          /*event = instance.Transfer();
          event.watch((err, result) => {
            console.log(err);
            console.log(result);
            event.stopWatching();
          });*/
          result.event = instance.Transfer();
          return instance.transfer.sendTransaction(transferTo, amount, { from: '0xb6e08874e9f1658ccffe0eef47f830b34dc7f006' });
        }).then(transactionHash => {
          console.log(transactionHash);
          result.transactionHash = transactionHash;
          observer.next(result);
          observer.complete();
        }).catch(err => {
          alert("ERROR! " + err.message);
          console.error(err);
          observer.error(err);
        });
    });
  }
}
