import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  @Input() displayObservable: Observable<String>;
  currentDisplayMessage: String;

  constructor() { }

  ngOnInit() {
    this.displayObservable.subscribe((value) => this.currentDisplayMessage = value);
  }

  // TODO: need to delay the updates to the display in the event of concussive changes.
  //       how do I mock window.setInterval()?
}
