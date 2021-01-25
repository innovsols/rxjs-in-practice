import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, noop, Observable, of, timer} from 'rxjs';
import {catchError, delayWhen, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses: Course[];
  advancedCourses: Course[];

    constructor() {

    }

    ngOnInit() {
/** The below is the example of the creation of Observable using promise and following the Observable Contract */
const http$ = createHttpObservable('/api/courses');

const courses$ = http$.pipe(
  map(res => Object.values( res['payload']))
);

// tslint:disable-next-line: deprecation
courses$.subscribe(
  courses => {
    this.beginnerCourses = (<Course[]>courses.filter(course =>  (<Course>course).category == 'BEGINNER'));
    this.advancedCourses = (<Course[]>courses.filter(course =>  (<Course>course).category == 'ADVANCED'));
  },
  noop,
  () => console.log('completed')
);


    }

}
