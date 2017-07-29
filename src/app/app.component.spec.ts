import { TestBed, async } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { instance, mock, reset, when, verify } from 'ts-mockito';

import { VendingMachineService } from './vending-machine.service/vending-machine.service';
import { AppComponent } from './app.component';
import { CoinSlotComponent } from './coin-slot/coin-slot.component';
import { ProductSelectionComponent } from './product-selection/product-selection.component';
import { DisplayComponent } from './display/display.component';
import { DispenserComponent } from './dispenser/dispenser.component';
import { CoinReturnComponent } from './coin-return/coin-return.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: any;
  let vendingMachineServiceMock: VendingMachineService;
  let vendingMachineServiceMockInstance: VendingMachineService;
  let fakeCoinReturnBehaviorSubject: BehaviorSubject<Array<String>>;
  let fakeCoinReturnObservable: Observable<Array<String>>;
  let fakeDisplayBehaviorSubject: BehaviorSubject<String>;
  let fakeDisplayObservable: Observable<String>;
  let fakeDispenserBehaviorSubject: BehaviorSubject<Array<String>>;
  let fakeDispenserObservable: Observable<Array<String>>;

  beforeEach(async(() => {
    setupMocks();
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CoinSlotComponent,
        ProductSelectionComponent,
        DisplayComponent,
        DispenserComponent,
        CoinReturnComponent
      ],
      providers: [
        { provide: VendingMachineService, useValue: vendingMachineServiceMockInstance }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  describe('when a coin is inserted', () => {
    beforeEach(() => {
      app.onCoinInserted('foo');
    });

    it('tells the VendingMachineService about the inserted coin', () => {
      verify(vendingMachineServiceMock.insertCoin('foo')).once();
    });
  });

  function setupMocks() {
    vendingMachineServiceMock = mock(VendingMachineService);
    vendingMachineServiceMockInstance = instance(vendingMachineServiceMock);

    // These are still needed as the template calls them and the tests will throw errors unless mocked.
    fakeDisplayBehaviorSubject = new BehaviorSubject<String>('');
    fakeDisplayObservable = fakeDisplayBehaviorSubject.asObservable();
    fakeDispenserBehaviorSubject = new BehaviorSubject<Array<String>>([]);
    fakeDispenserObservable = fakeDispenserBehaviorSubject.asObservable();
    fakeCoinReturnBehaviorSubject = new BehaviorSubject<Array<String>>([]);
    fakeCoinReturnObservable = fakeCoinReturnBehaviorSubject.asObservable();
    when(vendingMachineServiceMock.getDisplayObservable()).thenReturn(fakeDisplayObservable);
    when(vendingMachineServiceMock.getDispenserObservable()).thenReturn(fakeDispenserObservable);
    when(vendingMachineServiceMock.getCoinReturnObservable()).thenReturn(fakeCoinReturnObservable);
  }
});
