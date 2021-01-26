import {  map } from 'rxjs/operators';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { concat, interval, noop, Observable, of, merge } from 'rxjs';
import { createHttpObservable } from '../common/util';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // Below is the example of trigger unsubcribe on custom observable, please refer revised function used in below example
    const http$ = createHttpObservable('/api/courses');

    const sub = http$.subscribe(console.log);

    setTimeout(() => sub.unsubscribe(), 0);

  }


}
