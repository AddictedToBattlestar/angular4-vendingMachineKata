import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VendingMachineService {
  private display: BehaviorSubject<String>;
  private coinReturn: Subject<String>;
  private dispenser: Subject<String>;
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
    this.display = new BehaviorSubject('INSERT COIN');  // new BehaviorSubject('INSERT COIN');
    this.coinReturn = new Subject();
    this.dispenser = new Subject();
    this.currentAmount = 0;
  }

  getDisplayObservable(): Observable<String> {
    return this.display.asObservable();
  }

  getCoinReturnObservable(): Observable<String> {
    return this.coinReturn.asObservable();
  }

  getDispenserObservable(): Observable<String> {
    return this.dispenser.asObservable();
  }

  insertCoin(insertedObject: string): void {
    const coinValueInserted = this.acceptableCoins[insertedObject];
    if (coinValueInserted) {
      this.recalculateDisplay(coinValueInserted);
    } else {
      this.addCoinToCoinReturn(insertedObject);
    }
  }

  selectProduct(desiredProduct: string): void {
    const productPrice = this.productPrices[desiredProduct];
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

  returnInsertedCoins(): void {
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
    this.coinReturn.next(coinToReturn);
  }

  private addProductToDispenser(productToDispense: String) {
    this.dispenser.next(productToDispense);
  }

  private returnRemainingChange() {
    this.returnCoinsOfTheGivenDenomination('QUARTER');
    this.returnCoinsOfTheGivenDenomination('DIME');
    this.returnCoinsOfTheGivenDenomination('NICKEL');
  }

  private returnCoinsOfTheGivenDenomination(coinType: string) {
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
