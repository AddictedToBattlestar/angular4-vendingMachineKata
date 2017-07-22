import { Component } from '@angular/core';
import { VendingMachineInterface } from './vending-machine.service/vending-machine.interface'
import { VendingMachineService } from './vending-machine.service/vending-machine.service'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  vendingMachineService: VendingMachineService;

  constructor(vendingMachineServiceProvided: VendingMachineService) {
    this.vendingMachineService = vendingMachineServiceProvided;
  }
}
