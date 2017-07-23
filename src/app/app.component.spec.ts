import { TestBed, async } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import {instance, mock, reset, when, verify} from 'ts-mockito';

import { VendingMachineService } from './vending-machine.service/vending-machine.service';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: any;
  let vendingMachineServiceMock: VendingMachineService;
  let vendingMachineServiceMockInstance: VendingMachineService;
  let fakeCoinReturnObservable: Observable<Array<String>>;
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

  it('should make the display from the service accessible', async(() => {
    fixture.detectChanges();
    expect(app.display).toEqual(fakeDisplayObservable);
  }));

  it('should make the coin return from the service accessible', async(() => {
    fixture.detectChanges();
    expect(app.coinReturn).toEqual(fakeCoinReturnObservable);
  }));

  describe('when a coin is inserted', () => {
    beforeEach(() => {
      app.insertCoin('foo');
    });

    it('tells the VendingMachineService about the inserted coin', () => {
      verify(vendingMachineServiceMock.insertCoin('foo')).once();
    });
  });

  function setupMocks() {
    vendingMachineServiceMock = mock(VendingMachineService);
    fakeCoinReturnObservable = new Observable<Array<String>>();
    fakeDisplayObservable = new Observable<String>();
    when(vendingMachineServiceMock.getCoinReturnObservable()).thenReturn(fakeCoinReturnObservable);
    when(vendingMachineServiceMock.getDisplayObservable()).thenReturn(fakeDisplayObservable);
    vendingMachineServiceMockInstance = instance(vendingMachineServiceMock);
  }
});
