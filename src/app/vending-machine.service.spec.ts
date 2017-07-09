import { TestBed, inject } from '@angular/core/testing';
import { VendingMachineService } from './vending-machine.service';

describe('VendingMachineService', () => {
  let currentDisplayFromVendingMachine: String;
  let currentCoinReturn: Array<String>;
  let subject: VendingMachineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VendingMachineService]
    });
  });

  beforeEach(inject([VendingMachineService], (vendingMachineService: VendingMachineService) => {
    subject = vendingMachineService;
    subject.getDisplayObservable().subscribe(val => currentDisplayFromVendingMachine = val);
    subject.getCoinReturnObservable().subscribe(coinReturned => currentCoinReturn = coinReturned);
  }));

  it('displays INSERT COIN', function () {
    expect(currentDisplayFromVendingMachine).toEqual('INSERT COIN');
  });

  it('has an empty coin return', function () {
    expect(currentCoinReturn.length).toBe(0);
  });

  describe('A nickel is inserted', function () {
    beforeEach(function () {
      subject.insert('NICKEL');
    });

    it('will display "$0.05"', function () {
      expect(currentDisplayFromVendingMachine).toEqual('$0.05');
    });
  });

  describe('A dime is inserted', function () {
    beforeEach(function () {
      subject.insert('DIME');
    });

    it('will display "$0.10"', function () {
      expect(currentDisplayFromVendingMachine).toEqual('$0.10');
    });
  });

  describe('A quarter is inserted', function () {
    beforeEach(function () {
      subject.insert('QUARTER');
    });

    it('will display "$0.25"', function () {
      expect(currentDisplayFromVendingMachine).toEqual('$0.25');
    });
  });

  describe('A dime and a quarter is inserted', function () {
    beforeEach(function () {
      subject.insert('DIME');
      subject.insert('QUARTER');
    });

    it('will display "$0.35"', function () {
      expect(currentDisplayFromVendingMachine).toEqual('$0.35');
    });
  });

  describe('An invalid coin (penny) is inserted', function () {
    beforeEach(function () {
      subject.insert('PENNY');
    });

    it('still displays INSERT COIN', function () {
      expect(currentDisplayFromVendingMachine).toEqual('INSERT COIN');
    });

    it('placed the invalid coin in the coin return', function () {
      expect(currentCoinReturn.length).toEqual(1);
      expect(currentCoinReturn[0]).toEqual('PENNY');
    });
  });
});
