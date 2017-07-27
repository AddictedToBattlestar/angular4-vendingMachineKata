import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs/Rx';

import { DisplayComponent } from './display.component';

describe('DisplayComponent', () => {
  let component: DisplayComponent;
  let fixture: ComponentFixture<DisplayComponent>;
  let mockDisplay: BehaviorSubject<String>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayComponent);
    component = fixture.componentInstance;
    mockDisplay = new BehaviorSubject('fakeInitialMessage');
    component.displayObservable = mockDisplay.asObservable();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('when informed if a display update', () => {
    beforeEach(() => {
      mockDisplay.next('fakeDisplayMessageUpdate');
      fixture.detectChanges();
    });

    it('updates the current message on the display', () => {
      expect(component.currentDisplayMessage).toEqual('fakeDisplayMessageUpdate');
    });
  });
});
