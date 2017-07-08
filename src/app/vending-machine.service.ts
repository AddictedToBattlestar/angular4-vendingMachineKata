import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class VendingMachineService {
  private display: BehaviorSubject<string>;
  private currentAmount: number;

  constructor() {
    this.display = new BehaviorSubject('INSERT COIN');
    this.currentAmount = 0;
  }

  getDisplayObservable() {
    return this.display.asObservable();
  }

  insert(insertedObject: String) {
    this.display.next('$0.05');
    switch (insertedObject) {
      case 'NICKEL':
        this.recalculateDisplay(5);
        break;
      case 'DIME':
        this.recalculateDisplay(10);
        break;
      case 'QUARTER':
        this.recalculateDisplay(25);
        break;
    }
  }

  private recalculateDisplay(amount: number) {
    this.currentAmount += amount;
    this.display.next('$' + (this.currentAmount / 100).toFixed(2));
  }
}
