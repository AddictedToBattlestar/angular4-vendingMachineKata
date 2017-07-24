import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { VendingMachineService } from './vending-machine.service/vending-machine.service'
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [VendingMachineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
