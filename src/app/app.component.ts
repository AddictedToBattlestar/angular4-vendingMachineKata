import { Component } from '@angular/core';
import { VendingMachineService } from './vending-machine.service/vending-machine.service'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private vendingMachineService: VendingMachineService;
  coinReturn: Observable<Array<String>>;
  display: Observable<String>;

  constructor(vendingMachineServiceProvided: VendingMachineService) {
    this.vendingMachineService = vendingMachineServiceProvided;
    this.coinReturn = vendingMachineServiceProvided.getCoinReturnObservable();
    this.display = vendingMachineServiceProvided.getDisplayObservable();
  }

  insertCoin(coinInserted: string): void {
    this.vendingMachineService.insertCoin(coinInserted);
  }
}
