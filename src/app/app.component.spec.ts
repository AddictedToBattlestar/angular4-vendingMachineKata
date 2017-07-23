import { TestBed, async } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { instance, mock, reset, when, verify } from 'ts-mockito';

import { VendingMachineService } from './vending-machine.service/vending-machine.service';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: any;
  let vendingMachineServiceMock: VendingMachineService;
  let vendingMachineServiceMockInstance: VendingMachineService;
  let fakeCoinReturnBehaviorSubject: BehaviorSubject<Array<String>>;
  let fakeCoinReturnObservable: Observable<Array<String>>;
  let fakeDisplayBehaviorSubject: BehaviorSubject<String>;
  let fakeDisplayObservable: Observable<String>;

  beforeEach(async(() => {
    setupMocks();
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
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
      app.insertCoin('foo');
    });

    it('tells the VendingMachineService about the inserted coin', () => {
      verify(vendingMachineServiceMock.insertCoin('foo')).once();
    });
  });

  describe('when the service sends an update for the display', () => {
    beforeEach(() => {
      fakeDisplayBehaviorSubject.next('fake display update');
      fixture.detectChanges();
    });

    it('shows this update on the display', () => {
      expect(app.display).toEqual('fake display update');
    });
  });

  describe('when the service sends an update for the coin return', () => {
    let fakeCoinReturnListing: Array<String>;
    beforeEach(() => {
      fakeCoinReturnListing = new Array<String>();
      fakeCoinReturnListing.push('fakeCoin');
      fakeCoinReturnBehaviorSubject.next(fakeCoinReturnListing);
      fixture.detectChanges();
    });

    it('the coin return registers the correct content', () => {
      expect(app.coinReturn).toEqual(fakeCoinReturnListing);
    });
  });

  function setupMocks() {
    vendingMachineServiceMock = mock(VendingMachineService);
    fakeCoinReturnBehaviorSubject = new BehaviorSubject<Array<String>>([]);
    fakeCoinReturnObservable = fakeCoinReturnBehaviorSubject.asObservable();
    fakeDisplayBehaviorSubject = new BehaviorSubject<String>('');
    fakeDisplayObservable = fakeDisplayBehaviorSubject.asObservable();
    when(vendingMachineServiceMock.getCoinReturnObservable()).thenReturn(fakeCoinReturnObservable);
    when(vendingMachineServiceMock.getDisplayObservable()).thenReturn(fakeDisplayObservable);
    vendingMachineServiceMockInstance = instance(vendingMachineServiceMock);
  }
});
