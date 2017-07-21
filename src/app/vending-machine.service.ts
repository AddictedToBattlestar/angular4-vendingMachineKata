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
  private productPrices: { [index: string]: number } = {
    'COLA': 100,
    'CHIPS': 50,
    'CANDY': 65
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

  insertCoin(insertedObject: string) {
    let coinValueInserted = this.acceptableCoins[insertedObject];
    if (coinValueInserted) {
      this.recalculateDisplay(coinValueInserted);
    } else {
      this.addCoinToCoinReturn(insertedObject);
    }
  }

  selectProduct(desiredProduct: string) {
    const productPrice: number = this.productPrices[desiredProduct];
    if (this.currentAmount >= productPrice) {
      this.addProductToDispenser(desiredProduct);
      this.currentAmount -= productPrice;
      this.returnRemainingChange();
      this.display.next('THANK YOU');
      this.display.next('INSERT COIN');
    } else {
      this.display.next('PRICE ' + this.getDisplayFriendlyValue(productPrice));
    }
  }

  returnInsertedCoins() {
    this.returnRemainingChange();
    this.display.next('INSERT COIN');
  }

  private recalculateDisplay(amount: number) {
    this.currentAmount += amount;
    this.display.next(this.getDisplayFriendlyValue(this.currentAmount));
  }

  private getDisplayFriendlyValue(amount: number) {
    return '$' + (amount / 100).toFixed(2)
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
