import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-selection',
  templateUrl: './product-selection.component.html',
  styleUrls: ['./product-selection.component.scss']
})
export class ProductSelectionComponent implements OnInit {
  @Output() onProductSelected = new EventEmitter<String>();
  constructor() { }

  ngOnInit() {
  }

  selectProduct(desiredProduct: String) {
    this.onProductSelected.emit(desiredProduct);
  }

}
