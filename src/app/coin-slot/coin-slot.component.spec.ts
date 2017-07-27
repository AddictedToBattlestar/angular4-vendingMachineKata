import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinSlotComponent } from './coin-slot.component';

describe('CoinSlotComponent', () => {
  let component: CoinSlotComponent;
  let fixture: ComponentFixture<CoinSlotComponent>;
  let onCoinInsertedSpy: Array<String>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinSlotComponent);
    component = fixture.componentInstance;
    this.onCoinInsertedSpy = new Array<string>();
    component.onCoinInserted.subscribe((value) => this.onCoinInsertedSpy.push(value));
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('when a coin is inserted', () => {
    beforeEach(() => {
    component.insertCoin('fakeCoin');
    fixture.detectChanges();
    });

    it('emits the event to the parent', () => {
      expect(this.onCoinInsertedSpy[0]).toEqual('fakeCoin');
    });
  });
});
