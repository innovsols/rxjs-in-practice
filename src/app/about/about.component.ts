import {  map } from 'rxjs/operators';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { concat, interval, noop, Observable, of } from 'rxjs';
import { createHttpObservable } from '../common/util';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    /** Below is the example of concat observable, which sequently concates the streams of data which it supposed to contact,
     * this means that once the source1 complete the emition of data, the further sources of data are emitted and concatenated.
     */
    const source1$ = of(1, 2, 3);

    const source2$ = of(4, 5, 6);

    const source3$ = of(4, 5, 6);


    const result$ = concat(source1$, source2$, source3$);

    result$.subscribe(console.log);

  }


}
