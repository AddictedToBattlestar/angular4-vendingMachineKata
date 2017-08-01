import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements AfterViewChecked, OnInit {
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

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log('DisplayComponent.scrollToBottom error: ' + JSON.stringify(err));
    }
  }
}
