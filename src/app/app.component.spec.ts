import { TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { VendingMachineService } from './vending-machine.service/vending-machine.service';
import { VendingMachineServiceMock } from './vending-machine.service/vending-machine.mock';
import { CommonHelpers } from './common-helpers';
import { AppComponent } from './app.component';
import { ComponentFixture } from '@angular/core/testing';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: VendingMachineService, useClass: VendingMachineServiceMock }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    expect(app.title).toEqual('app');
  }));

  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!!');
  }));

  it('should make the getCoinReturnObservable from the VendingMachineService accessible', async(() => {
    fixture.detectChanges();
    expect(app.vendingMachineService.insertCoinSpy).not.toHaveBeenCalled();
    expect(app.vendingMachineService.selectProductSpy).not.toHaveBeenCalled();
    expect(app.vendingMachineService.returnInsertedCoinsSpy).not.toHaveBeenCalled();
  }));
});
