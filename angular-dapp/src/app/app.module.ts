import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ModalContentComponent } from './app.component';
import { AppComponent } from './app.component';
import { Web3Service, StandardTokenService } from "./services/services";
import { ModalModule, TooltipModule, AlertModule } from 'ngx-bootstrap';

@NgModule({
  entryComponents:[ModalContentComponent],
  declarations: [
    ModalContentComponent, AppComponent
  ],
  imports: [
    BrowserModule,FormsModule, ModalModule.forRoot(), TooltipModule.forRoot(), AlertModule.forRoot()
  ],
  providers: [Web3Service, StandardTokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
