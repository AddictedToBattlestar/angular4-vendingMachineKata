import { Component } from '@angular/core';
import { VendingMachineService } from './vending-machine.service/vending-machine.service'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  vendingMachineService: VendingMachineService;
  coinReturn: Array<String>;
  display: String;

  constructor(vendingMachineServiceProvided: VendingMachineService) {
    this.vendingMachineService = vendingMachineServiceProvided;
    vendingMachineServiceProvided.getDisplayObservable().subscribe((value) => this.display = value);
    vendingMachineServiceProvided.getCoinReturnObservable().subscribe((value) => this.coinReturn = value);
  }

  insertCoin(coinInserted: string): void {
    this.vendingMachineService.insertCoin(coinInserted);
  }
}
