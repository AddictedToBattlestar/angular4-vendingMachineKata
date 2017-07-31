import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs/Subject';

import { DispenserComponent } from './dispenser.component';

describe('DispenserComponent', () => {
  let component: DispenserComponent;
  let fixture: ComponentFixture<DispenserComponent>;
  let mockDispenser: Subject<String>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DispenserComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispenserComponent);
    component = fixture.componentInstance;
    mockDispenser = new Subject();
    component.dispenserObservable = mockDispenser.asObservable();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('when items are placed in the dispenser', () => {
    const fakeItems = ['fakeItem1', 'fakeItem2'];

    beforeEach(() => {
      mockDispenser.next(fakeItems[0]);
      mockDispenser.next(fakeItems[1]);
      fixture.detectChanges();
    });

    it('shows them in the dispenser', () => {
      expect(component.dispenserItems).toEqual(fakeItems);
    });
  });
});
