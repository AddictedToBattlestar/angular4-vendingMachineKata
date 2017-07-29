import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CoinReturnComponent } from './coin-return.component';

describe('CoinReturnComponent', () => {
  let component: CoinReturnComponent;
  let fixture: ComponentFixture<CoinReturnComponent>;
  let mockCoinReturn: BehaviorSubject<Array<String>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinReturnComponent);
    component = fixture.componentInstance;
    mockCoinReturn = new BehaviorSubject([]);
    component.coinReturnObservable = mockCoinReturn;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('when coins are returned', () => {
    const fakeCoins = ['fakeCoin1', 'fakeCoin3'];

    beforeEach(() => {
      mockCoinReturn.next(fakeCoins);
      fixture.detectChanges();
    });

    it('shows them in the coin return', () => {
      expect(component.coinsReturned).toEqual(fakeCoins);
    });
  });
});
