import { map } from 'rxjs/operators';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { interval, noop, Observable } from 'rxjs';
import { createHttpObservable } from '../common/util';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
 /** The below is the example of the creation of Observable using promise and following the Observable Contract */
    const http$ = createHttpObservable('/api/courses');

    const courses$ = http$.pipe(
      map(res => Object.values( res['payload']))
    );

    courses$.subscribe(
      courses => console.log(courses),
      noop,
      () => console.log('completed')
    );
  }


}
