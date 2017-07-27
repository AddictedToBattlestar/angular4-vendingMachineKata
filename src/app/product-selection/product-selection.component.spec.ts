import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSelectionComponent } from './product-selection.component';

describe('ProductSelectionComponent', () => {
  let component: ProductSelectionComponent;
  let fixture: ComponentFixture<ProductSelectionComponent>;
  let onProductSelectedSpy: Array<String>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductSelectionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSelectionComponent);
    component = fixture.componentInstance;
    this.onProductSelectedSpy = new Array<String>();
    component.onProductSelected.subscribe((value) => this.onProductSelectedSpy.push(value));
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('when a product is selected', () => {
    beforeEach(() => {
      component.selectProduct('fakeProduct');
      fixture.detectChanges();
    });

    it('emits the event to the parent', () => {
      expect(this.onProductSelectedSpy[0]).toEqual('fakeProduct');
    });
  });
});
