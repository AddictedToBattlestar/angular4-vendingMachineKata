import { TestBed, inject } from '@angular/core/testing';
import { VendingMachineService } from './vending-machine.service';

describe('VendingMachineService', () => {
  let messagesDisplayed: Array<String>;
  let currentCoinReturnContents: Array<String>;
  let currentDispenserContents: Array<String>;
  let subject: VendingMachineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VendingMachineService]
    });
  });

  beforeEach(inject([VendingMachineService], (vendingMachineService: VendingMachineService) => {
    subject = vendingMachineService;
    initializeAndSetupAllOfTheSpies();
  }));

  it('displays "INSERT COIN"', () => {
    expect(messagesDisplayed[0]).toEqual('INSERT COIN');
  });

  it('has an empty coin return', () => {
    expect(currentCoinReturnContents.length).toBe(0);
  });

  describe('A nickel is inserted', () => {
    beforeEach(() => {
      subject.insertCoin('NICKEL');
    });

    it('will display "$0.05"', () => {
      expect(messagesDisplayed[1]).toEqual('$0.05');
    });
  });

  describe('A dime is inserted', () => {
    beforeEach(() => {
      subject.insertCoin('DIME');
    });

    it('will display "$0.10"', () => {
      expect(messagesDisplayed[1]).toEqual('$0.10');
    });
  });

  describe('A quarter is inserted', () => {
    beforeEach(() => {
      subject.insertCoin('QUARTER');
    });

    it('will display "$0.25"', () => {
      expect(messagesDisplayed[1]).toEqual('$0.25');
    });
  });

  describe('A dime and a quarter is inserted', () => {
    beforeEach(() => {
      subject.insertCoin('DIME');
      subject.insertCoin('QUARTER');
    });

    it('will display "$0.35"', () => {
      expect(messagesDisplayed[2]).toEqual('$0.35');
    });
  });

  describe('An invalid coin (penny) is inserted', () => {
    beforeEach(() => {
      subject.insertCoin('PENNY');
    });

    it('still displays INSERT COIN', () => {
      expect(messagesDisplayed[0]).toEqual('INSERT COIN');
    });

    it('placed the invalid coin in the coin return', () => {
      expect(currentCoinReturnContents.length).toEqual(1);
      expect(currentCoinReturnContents[0]).toEqual('PENNY');
    });
  });

  describe('a cola is selected with no coins inserted', () => {
    beforeEach(() => {
      subject.selectProduct('COLA');
    });

    it('displays the price of cola', () => {
      expect(messagesDisplayed[1]).toEqual('PRICE $1.00');
    });

    it('does not dispense anything', () => {
      expect(currentDispenserContents.length).toEqual(0);
    });
  });

  describe('a cola is selected with too little money inserted', function () {
    beforeEach(() => {
      subject.insertCoin('QUARTER');
      subject.insertCoin('QUARTER');
      subject.insertCoin('QUARTER');
      subject.selectProduct('COLA');
    });

    it('displays the price of cola', () => {
      expect(messagesDisplayed[4]).toEqual('PRICE $1.00');
    });

    it('does not dispense anything', () => {
      expect(currentDispenserContents.length).toEqual(0);
    });
  });

  describe('a cola is selected with enough money inserted', function () {
    beforeEach(() => {
      subject.insertCoin('QUARTER');
      subject.insertCoin('QUARTER');
      subject.insertCoin('QUARTER');
      subject.insertCoin('QUARTER');
      subject.selectProduct('COLA');
    });

    it('displays a thank you message', () => {
      expect(messagesDisplayed[5]).toEqual('THANK YOU');
    });

    it('dispenses a cola', () => {
      expect(currentDispenserContents.length).toEqual(1);
      expect(currentDispenserContents[0]).toEqual('COLA');
    });
  });

  describe('a cola is selected with too much money inserted', function () {
    beforeEach(() => {
      subject.insertCoin('QUARTER');
      subject.insertCoin('QUARTER');
      subject.insertCoin('QUARTER');
      subject.insertCoin('QUARTER');
      subject.insertCoin('DIME');
      subject.selectProduct('COLA');
    });

    it('displays a thank you message', () => {
      expect(messagesDisplayed[6]).toEqual('THANK YOU');
    });

    it('dispenses a cola', () => {
      expect(currentDispenserContents.length).toEqual(1);
      expect(currentDispenserContents[0]).toEqual('COLA');
    });

    it('places the excess money in the coin return', () => {
      expect(currentCoinReturnContents.length).toEqual(1);
      expect(currentCoinReturnContents[0]).toEqual('DIME');
    });
  });

  describe('a cola is selected with too much money inserted (2nd variation of money inserted)', function () {
    beforeEach(() => {
      subject.insertCoin('QUARTER');
      subject.insertCoin('QUARTER');
      subject.insertCoin('QUARTER');
      subject.insertCoin('QUARTER');
      subject.insertCoin('QUARTER');
      subject.insertCoin('DIME');
      subject.insertCoin('DIME');
      subject.insertCoin('NICKEL');
      subject.selectProduct('COLA');
    });

    it('displays a thank you message', () => {
      expect(messagesDisplayed[9]).toEqual('THANK YOU');
    });

    it('dispenses a cola', () => {
      expect(currentDispenserContents.length).toEqual(1);
      expect(currentDispenserContents[0]).toEqual('COLA');
    });

    it('places the excess money in the coin return', () => {
      expect(currentCoinReturnContents.length).toEqual(2);
      expect(currentCoinReturnContents.filter(coin => coin === 'QUARTER').length).toEqual(2);
    });
  });

  describe('a cola is selected with too much money inserted (3rd variation of money inserted)', function () {
    beforeEach(() => {
      subject.insertCoin('QUARTER');
      subject.insertCoin('QUARTER');
      subject.insertCoin('QUARTER');
      subject.insertCoin('QUARTER');
      subject.insertCoin('QUARTER');
      subject.insertCoin('DIME');
      subject.insertCoin('NICKEL');
      subject.selectProduct('COLA');
    });

    it('displays a thank you message', () => {
      expect(messagesDisplayed[8]).toEqual('THANK YOU');
    });

    it('dispenses a cola', () => {
      expect(currentDispenserContents.length).toEqual(1);
      expect(currentDispenserContents[0]).toEqual('COLA');
    });

    it('places the excess money in the coin return', () => {
      expect(currentCoinReturnContents.length).toEqual(3);
      expect(currentCoinReturnContents.filter(coin => coin === 'QUARTER').length).toEqual(1);
      expect(currentCoinReturnContents.filter(coin => coin === 'DIME').length).toEqual(1);
      expect(currentCoinReturnContents.filter(coin => coin === 'NICKEL').length).toEqual(1);
    });
  });

  describe('a chips is selected with too little money inserted', function () {
    beforeEach(() => {
      subject.insertCoin('QUARTER');
      subject.selectProduct('CHIPS');
    });

    it('displays the price of chips', () => {
      expect(messagesDisplayed[2]).toEqual('PRICE $0.50');
    });

    it('does not dispense anything', () => {
      expect(currentDispenserContents.length).toEqual(0);
    });
  });

  describe('a chips is selected with enough money inserted', function () {
    beforeEach(() => {
      subject.insertCoin('QUARTER');
      subject.insertCoin('QUARTER');
      subject.selectProduct('CHIPS');
    });

    it('displays a thank you message', () => {
      expect(messagesDisplayed[3]).toEqual('THANK YOU');
    });

    it('dispenses a chips', () => {
      expect(currentDispenserContents.length).toEqual(1);
      expect(currentDispenserContents[0]).toEqual('CHIPS');
    });
  });

  describe('a candy is selected with too little money inserted', function () {
    beforeEach(() => {
      subject.insertCoin('QUARTER');
      subject.insertCoin('QUARTER');
      subject.insertCoin('DIME');
      subject.selectProduct('CANDY');
    });

    it('displays the price of chips', () => {
      expect(messagesDisplayed[4]).toEqual('PRICE $0.65');
    });

    it('does not dispense anything', () => {
      expect(currentDispenserContents.length).toEqual(0);
    });
  });

  describe('a candy is selected with enough money inserted', function () {
    beforeEach(() => {
      subject.insertCoin('QUARTER');
      subject.insertCoin('QUARTER');
      subject.insertCoin('DIME');
      subject.insertCoin('NICKEL');
      subject.selectProduct('CANDY');
    });

    it('displays a thank you message', () => {
      expect(messagesDisplayed[5]).toEqual('THANK YOU');
    });

    it('dispenses a chips', () => {
      expect(currentDispenserContents.length).toEqual(1);
      expect(currentDispenserContents[0]).toEqual('CANDY');
    });
  });

  describe('once the machine display says thank you', () => {
    beforeEach(() => {
      subject.insertCoin('QUARTER');
      subject.insertCoin('QUARTER');
      subject.insertCoin('QUARTER');
      subject.insertCoin('QUARTER');
      subject.selectProduct('COLA');
    });

    it('displays a thank you message', () => {
      expect(messagesDisplayed[5]).toEqual('THANK YOU');
    });

    it('will then prompt "INSERT COIN" afterwards', () => {
      expect(messagesDisplayed[6]).toEqual('INSERT COIN');
    });
  });

  describe('when coins are inserted and and the coin return is pressed', () => {
    beforeEach(() => {
      subject.insertCoin('QUARTER');
      subject.insertCoin('QUARTER');
      subject.insertCoin('DIME');
      subject.insertCoin('NICKEL');
      subject.returnInsertedCoins();
    });

    it('places the excess money in the coin return', () => {
      expect(currentCoinReturnContents.length).toEqual(4);
      expect(currentCoinReturnContents.filter(coin => coin === 'QUARTER').length).toEqual(2);
      expect(currentCoinReturnContents.filter(coin => coin === 'DIME').length).toEqual(1);
      expect(currentCoinReturnContents.filter(coin => coin === 'NICKEL').length).toEqual(1);
    });

    it('displays "INSERT COIN"', () => {
      expect(messagesDisplayed[0]).toEqual('INSERT COIN');
    });
  });

  function initializeAndSetupAllOfTheSpies() {
    messagesDisplayed = [];
    currentCoinReturnContents = [];
    currentDispenserContents = [];

    subject.getDisplayObservable().subscribe(val => messagesDisplayed.push(val));
    subject.getCoinReturnObservable().subscribe(coinReturned => currentCoinReturnContents = coinReturned);
    subject.getDispenserObservable().subscribe(val => currentDispenserContents = val);
  }
});
