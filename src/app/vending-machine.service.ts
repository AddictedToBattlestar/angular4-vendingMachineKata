import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class VendingMachineService {
  private display: BehaviorSubject<String>;
  private coinReturn: BehaviorSubject<Array<String>>;
  private dispenser: BehaviorSubject<Array<String>>;
  private currentAmount: number;

  constructor() {
    this.display = new BehaviorSubject('INSERT COIN');
    this.coinReturn = new BehaviorSubject([]);
    this.dispenser = new BehaviorSubject([]);
    this.currentAmount = 0;
  }

  getDisplayObservable() {
    return this.display.asObservable();
  }

  getCoinReturnObservable() {
    return this.coinReturn.asObservable();
  }

  getDispenserObservable() {
    return this.dispenser.asObservable();
  }

  insert(insertedObject: String) {
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
      default:
        this.addInsertedCoinToCoinReturn(insertedObject);
    }
  }

  selectProduct(desiredProduct: String) {
    if (this.currentAmount >= 100) {
      const dispenserToManipulate: Array<String> = this.dispenser.value;
      dispenserToManipulate.push('COLA');
      this.dispenser.next(dispenserToManipulate);
      this.display.next('THANK YOU');
    } else {
      this.display.next('PRICE $1.00');
    }
  }

  private recalculateDisplay(amount: number) {
    this.currentAmount += amount;
    this.display.next('$' + (this.currentAmount / 100).toFixed(2));
  }

  private addInsertedCoinToCoinReturn(coinToReturn: String) {
    const coinReturnToManipulate: Array<String> = this.coinReturn.value;
    coinReturnToManipulate.push(coinToReturn);
    this.coinReturn.next(coinReturnToManipulate);
  }
}
