import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs/Subject';

import { CoinReturnComponent } from './coin-return.component';

describe('CoinReturnComponent', () => {
  let component: CoinReturnComponent;
  let fixture: ComponentFixture<CoinReturnComponent>;
  let mockCoinReturn: Subject<String>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinReturnComponent);
    component = fixture.componentInstance;
    mockCoinReturn = new Subject();
    component.coinReturnObservable = mockCoinReturn;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('when coins are returned', () => {
    const fakeCoins = ['fakeCoin1', 'fakeCoin3'];

    beforeEach(() => {
      mockCoinReturn.next(fakeCoins[0]);
      mockCoinReturn.next(fakeCoins[1]);
      fixture.detectChanges();
    });

    it('shows them in the coin return', () => {
      expect(component.coinsReturned).toEqual(fakeCoins);
    });
  });
});
