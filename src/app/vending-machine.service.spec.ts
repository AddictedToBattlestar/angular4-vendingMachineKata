import { TestBed, inject } from '@angular/core/testing';
import { VendingMachineService } from './vending-machine.service';

describe('VendingMachineService', () => {
  let currentDisplayFromVendingMachine: String;
  let currentCoinReturn: Array<String>;
  let currentDispenserContents: Array<String>;
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
    subject.getDispenserObservable().subscribe(val => currentDispenserContents = val);
  }));

  it('displays INSERT COIN', () => {
    expect(currentDisplayFromVendingMachine).toEqual('INSERT COIN');
  });

  it('has an empty coin return', () => {
    expect(currentCoinReturn.length).toBe(0);
  });

  describe('A nickel is inserted', () => {
    beforeEach(() => {
      subject.insert('NICKEL');
    });

    it('will display "$0.05"', () => {
      expect(currentDisplayFromVendingMachine).toEqual('$0.05');
    });
  });

  describe('A dime is inserted', () => {
    beforeEach(() => {
      subject.insert('DIME');
    });

    it('will display "$0.10"', () => {
      expect(currentDisplayFromVendingMachine).toEqual('$0.10');
    });
  });

  describe('A quarter is inserted', () => {
    beforeEach(() => {
      subject.insert('QUARTER');
    });

    it('will display "$0.25"', () => {
      expect(currentDisplayFromVendingMachine).toEqual('$0.25');
    });
  });

  describe('A dime and a quarter is inserted', () => {
    beforeEach(() => {
      subject.insert('DIME');
      subject.insert('QUARTER');
    });

    it('will display "$0.35"', () => {
      expect(currentDisplayFromVendingMachine).toEqual('$0.35');
    });
  });

  describe('An invalid coin (penny) is inserted', () => {
    beforeEach(() => {
      subject.insert('PENNY');
    });

    it('still displays INSERT COIN', () => {
      expect(currentDisplayFromVendingMachine).toEqual('INSERT COIN');
    });

    it('placed the invalid coin in the coin return', () => {
      expect(currentCoinReturn.length).toEqual(1);
      expect(currentCoinReturn[0]).toEqual('PENNY');
    });
  });

  describe('a cola is selected with no coins inserted', () => {
    beforeEach(() => {
      subject.selectProduct('COLA');
    });

    it('displays the price of cola', () => {
      expect(currentDisplayFromVendingMachine).toEqual('PRICE $1.00');
    });

    it('does not dispense anything', () => {
      expect(currentDispenserContents.length).toEqual(0);
    });
  });

  describe('a cola is selected with only 75 cents inserted', function () {
    beforeEach(() => {
      subject.insert('QUARTER');
      subject.insert('QUARTER');
      subject.insert('QUARTER');
      subject.selectProduct('COLA');
    });

    it('displays the price of cola', () => {
      expect(currentDisplayFromVendingMachine).toEqual('PRICE $1.00');
    });

    it('does not dispense anything', () => {
      expect(currentDispenserContents.length).toEqual(0);
    });
  });
});
