import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DispenserComponent } from './dispenser.component';

describe('DispenserComponent', () => {
  let component: DispenserComponent;
  let fixture: ComponentFixture<DispenserComponent>;
  let mockDispenser: BehaviorSubject<Array<String>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DispenserComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispenserComponent);
    component = fixture.componentInstance;
    mockDispenser = new BehaviorSubject([]);
    component.dispenserObservable = mockDispenser.asObservable();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('when items are placed in the dispenser', () => {
    const fakeitems = ['fakeItem1', 'fakeItem2'];

    beforeEach(() => {
      mockDispenser.next(fakeitems);
      fixture.detectChanges();
    });

    it('shows them in the dispenser', () => {
      expect(component.dispenserItems).toEqual(fakeitems);
    });
  });
});
