import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-coin-return',
  templateUrl: './coin-return.component.html',
  styleUrls: ['./coin-return.component.scss']
})
export class CoinReturnComponent implements OnInit {
  @Input() coinReturnObservable: Observable<String>;
  coinsReturned: Array<String>;
  constructor() { }

  ngOnInit() {
    this.coinsReturned = [];
    this.coinReturnObservable.subscribe((value) => this.coinsReturned.push(value));
  }

}
