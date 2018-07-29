import { Component, Input, OnInit } from '@angular/core';
import { Web3Service, StandardTokenService } from './services/services';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ngCopy } from 'angular-6-clipboard';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  accounts: any;
  transferFrom = '0x0';
  transferTo: string;
  title = 'Angular Dapp';
  addr = 'Default Address';
  balance = '0 Eth';
  amount = 0;
  remarks = '';
  bsModalRef: BsModalRef;
  alerts: any[] = [];

  ngOnInit() {
    console.log('init');
    this.web3.getAccounts().subscribe(accountsInfo => {
      console.log(accountsInfo);
      this.accounts = accountsInfo;
    });
  }

  constructor(private tokenService: StandardTokenService, private web3: Web3Service,
    private modalService: BsModalService) {
    this.onReady();
  }

  onReady = () => {
    let that = this;

    this.web3.getCoinbase().subscribe(accountInfo => {
      that.transferFrom = accountInfo.fromAccount;
      console.info("coinbase", accountInfo.fromAccount);
      that.balance = accountInfo.balance;
    }, err => {
      alert(err);
      console.log(err);
    });
  }

  transfer = (event) => {
    let that = this;
    this.tokenService.transfer(this.transferTo, this.amount).subscribe(result => {
      alert("TX: " + result.transactionHash);
      console.log(result);

      let transactionEvent = result.event;

      transactionEvent.watch((err, result) => {
        console.log(err);
        console.log(result);

        if (err) {
          this.alerts.push({
            type: 'danger',
            dismissible: true,
            msg: `An error ocurred during transference ${err}`,
          });
        }
        else {
          this.alerts.push({
            type: 'success',
            dismissible: true,
            msg: `Transference completed ${result.transactionHash}`,
          });
        }
        transactionEvent.stopWatching();
      });

    }, err => alert(err));
  }

  balanceOf = () => {
    let that = this;
    this.tokenService.balanceOf(this.transferTo).subscribe(balance => {

      const initialState = {
        title: 'Balance',
        account: this.transferTo,
        balance: balance
      };
      this.bsModalRef = this.modalService.show(ModalContentComponent, { initialState });
      this.bsModalRef.content.closeBtnName = 'Close';
      console.log(balance);
    }, err => alert(err));
  }

  copyToClipboard = (address: string) => {
    ngCopy(address);
    this.alerts.push({
      type: 'success',
      dismissible: true,
      msg: `Address ${address} added to clipboard..`,
      timeout: 1000
    });
  };

  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
}



@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      Account: <strong>{{account}}</strong> <br />
      Balance: <strong>{{balance}}</strong>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">{{closeBtnName}}</button>
    </div>
  `
})
export class ModalContentComponent implements OnInit {
  title: string;
  closeBtnName: string;
  account: string;
  balance: string;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }
}