import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { VendingMachineService } from './vending-machine.service/vending-machine.service'
import { AppComponent } from './app.component';
import { CoinSlotComponent } from './coin-slot/coin-slot.component';
import { ProductSelectionComponent } from './product-selection/product-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    CoinSlotComponent,
    ProductSelectionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [VendingMachineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
