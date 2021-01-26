import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delayWhen, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

    constructor() {

    }

    ngOnInit() {

const http$ = createHttpObservable('/api/courses');

/** shareReplay Operator helps to ensure that the data stream fetched from backend is reused, rather than fetching the data
 * with each observable using the data stream, So it Optimizes the backend calls.
 */
const courses$ = http$.pipe(
  catchError(err => { // simulation of error The catchError, Finalize combination can be used multiple times on observable chain
    console.log('Error occurred', err);
    return throwError(err);
  }),
  finalize( () => console.log('Finalize Executed')),
  map(res => <Course[]>Object.values( res['payload'])),
  shareReplay()

);

this.beginnerCourses$ = courses$.pipe(
  map(courses => courses.filter(course =>  (course).category == 'BEGINNER')));

  this.advancedCourses$ = courses$.pipe(
    map(courses => courses.filter(course =>  (course).category == 'ADVANCED')));

    }

}
