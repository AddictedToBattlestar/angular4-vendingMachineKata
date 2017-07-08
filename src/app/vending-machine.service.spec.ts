import { TestBed, inject } from '@angular/core/testing';
import { VendingMachineService } from './vending-machine.service';

describe('VendingMachineService', () => {
  let currentDisplayFromVendingMachine: String;
  let subject: VendingMachineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VendingMachineService]
    });
  });

  beforeEach(inject([VendingMachineService], (vendingMachineService: VendingMachineService) => {
    subject = vendingMachineService;
    subject.getDisplayObservable().subscribe(val => currentDisplayFromVendingMachine = val);
  }));

  it('displays INSERT COIN', function () {
    expect(currentDisplayFromVendingMachine).toEqual('INSERT COIN');
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
});
