import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-coin-slot',
  templateUrl: './coin-slot.component.html',
  styleUrls: ['./coin-slot.component.css']
})
export class CoinSlotComponent implements OnInit {
  @Output() onCoinInserted = new EventEmitter<string>();
  constructor() { }

  ngOnInit() { }

  insertCoin(coinInserted: string): void {
    this.onCoinInserted.emit(coinInserted);
  }

}
