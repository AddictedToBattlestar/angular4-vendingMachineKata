import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class VendingMachineService {
  private display: BehaviorSubject<String>;
  private coinReturn: BehaviorSubject<Array<String>>;
  private dispenser: BehaviorSubject<Array<String>>;
  private currentAmount: number;
  private acceptableCoins: { [index: string]: number } = {
    'QUARTER': 25,
    'DIME': 10,
    'NICKEL': 5
  };

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

  insertCoin(insertedObject: String) {
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
        this.addCoinToCoinReturn(insertedObject);
    }
  }

  selectProduct(desiredProduct: String) {
    if (this.currentAmount >= 100) {
      this.addProductToDispenser('COLA');
      this.currentAmount -= 100;
      this.returnRemainingChange();
      this.display.next('THANK YOU');
    } else {
      this.display.next('PRICE $1.00');
    }
  }

  private recalculateDisplay(amount: number) {
    this.currentAmount += amount;
    this.display.next('$' + (this.currentAmount / 100).toFixed(2));
  }

  private addCoinToCoinReturn(coinToReturn: String) {
    const coinReturnToManipulate: Array<String> = this.coinReturn.value;
    coinReturnToManipulate.push(coinToReturn);
    this.coinReturn.next(coinReturnToManipulate);
  }

  private addProductToDispenser(productToDispense: String) {
    const dispenserToManipulate: Array<String> = this.dispenser.value;
    dispenserToManipulate.push(productToDispense);
    this.dispenser.next(dispenserToManipulate);
  }

  private returnRemainingChange() {
    this.returnCoinsOfTheGivenDemonination('QUARTER');
    this.returnCoinsOfTheGivenDemonination('DIME');
    this.returnCoinsOfTheGivenDemonination('NICKEL');
  }

  private returnCoinsOfTheGivenDemonination(coinType: string) {
    const coinValue = this.identifyCoinValue(coinType);
    const numberOfCoinsToReturn = Math.floor(this.currentAmount / coinValue);
    for (let x = 0; x < numberOfCoinsToReturn; x++) {
      this.addCoinToCoinReturn(coinType);
      this.currentAmount -= coinValue;
    }
  }

  private identifyCoinValue(coinType: string) {
    return this.acceptableCoins[coinType];
  }
}
