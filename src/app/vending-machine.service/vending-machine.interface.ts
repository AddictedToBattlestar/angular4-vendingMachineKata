import { Observable } from 'rxjs/Observable';

export interface VendingMachineInterface {
    getDisplayObservable(): Observable<String>;
    getCoinReturnObservable(): Observable<Array<String>>;
    getDispenserObservable(): Observable<Array<String>>;
    insertCoin(insertedObject: string): void;
    selectProduct(desiredProduct: string): void;
    returnInsertedCoins(): void;
}
