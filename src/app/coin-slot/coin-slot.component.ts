import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-coin-slot',
  templateUrl: './coin-slot.component.html',
  styleUrls: ['./coin-slot.component.css']
})
export class CoinSlotComponent implements OnInit {
  @Output() onCoinInserted = new EventEmitter<String>();
  constructor() { }

  ngOnInit() { }

  insertCoin(coinInserted: String): void {
    this.onCoinInserted.emit(coinInserted);
  }

}
