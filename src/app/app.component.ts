import { Component } from '@angular/core';
import { VendingMachineService } from './vending-machine.service/vending-machine.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private vendingMachineService: VendingMachineService;
  coinReturn: Array<String>;
  display: String;

  constructor(vendingMachineServiceProvided: VendingMachineService) {
    this.vendingMachineService = vendingMachineServiceProvided;
    vendingMachineServiceProvided.getDisplayObservable().subscribe((value) => this.display = value);
  }

  onCoinInserted(coinInserted: string): void {
    this.vendingMachineService.insertCoin(coinInserted);
  }
}
