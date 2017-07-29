import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-coin-return',
  templateUrl: './coin-return.component.html',
  styleUrls: ['./coin-return.component.css']
})
export class CoinReturnComponent implements OnInit {
  @Input() coinReturnObservable: Observable<Array<String>>;
  coinsReturned: Array<String>;
  constructor() { }

  ngOnInit() {
    this.coinReturnObservable.subscribe((value) => this.coinsReturned = value);
  }

}
