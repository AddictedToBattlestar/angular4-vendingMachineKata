import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dispenser',
  templateUrl: './dispenser.component.html',
  styleUrls: ['./dispenser.component.scss']
})
export class DispenserComponent implements OnInit {
  @Input() dispenserObservable: Observable<Array<String>>;
  dispenserItems: Array<String>;
  constructor() { }

  ngOnInit() {
    this.dispenserObservable.subscribe((value) => this.dispenserItems = value);
  }

}
