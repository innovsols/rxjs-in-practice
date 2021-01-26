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

    /** Below is the example of merge operator, which merges the streams of data which it supposed to merge,
     * the merge continues untill all the values in the to be merged observable are completed.
     */
    const source1$ = interval(1000);

    const source2$ = source1$.pipe(map(val => 10* val));

    const result$ = merge(source1$, source2$);

    result$.subscribe(console.log);

  }


}
