import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { VendingMachineInterface } from './vending-machine.interface';

@Injectable()
export class VendingMachineServiceMock implements VendingMachineInterface {
    public fakeDisplay: Observable<String>;
    public fakeCoinReturn: Observable<String[]>;
    public fakeDispenser: Observable<String[]>;

    public insertCoinSpy: any;
    public selectProductSpy: any;
    public returnInsertedCoinsSpy: any

    constructor() {
        this.fakeDisplay = new Observable<String>();
        this.fakeCoinReturn = new Observable<String[]>();
        this.fakeDispenser = new Observable<String[]>();
        this.insertCoinSpy = jasmine.createSpy('insertCoinSpy');
        this.selectProductSpy = jasmine.createSpy('selectProductSpy');
        this.returnInsertedCoinsSpy = jasmine.createSpy('returnInsertedCoinsSpy');
    }

    getDisplayObservable(): Observable<String> {
        return this.fakeDisplay;
    }
    getCoinReturnObservable(): Observable<String[]> {
        return this.fakeCoinReturn;
    }
    getDispenserObservable(): Observable<String[]> {
        return this.fakeDispenser;
    }
    insertCoin(insertedObject: string): void {
        this.insertCoinSpy(insertedObject);
    }
    selectProduct(desiredProduct: string): void {
        this.selectProductSpy(desiredProduct);
    }
    returnInsertedCoins(): void {
        this.returnInsertedCoinsSpy();
    }
}
