import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @Input() displayObservable: Observable<String>;
  messages: Array<String>;

  constructor() {
    this.messages = new Array<String>();
  }

  ngOnInit() {
    this.displayObservable.subscribe((value) => {
      this.messages.push(value);
      console.log('display update: ' + value);
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  // TODO: need to delay the updates to the display in the event of concussive changes.
  //       how do I mock window.setInterval()?

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log('DisplayComponent.scrollToBottom error: ' + JSON.stringify(err));
    }
  }
}
