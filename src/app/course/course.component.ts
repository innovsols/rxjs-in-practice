import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, shareReplay
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {Lesson} from '../model/lesson';
import { createHttpObservable } from '../common/util';
import { debug, RxJSLoggingLevel, setRxJSLoggingLevel } from '../common/debug';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    courseId: string;
    course$: Observable<Course>;
    lessons$: Observable<Lesson[]>;


    @ViewChild('searchInput', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute) {


    }

    ngOnInit() {

      this.courseId = this.route.snapshot.params['id'];

        this.course$ = createHttpObservable(`/api/courses/${this.courseId}`).pipe(
          debug(RxJSLoggingLevel.INFO, 'course value'));

          setRxJSLoggingLevel(RxJSLoggingLevel.DEBUG);


    }

    ngAfterViewInit() {

    /* const searchLessons$ =fromEvent<any>(this.input.nativeElement, 'keyup').pipe(
        map(event => event.target.value),
        debounceTime(400),  // This Operator ensure that stable values emited are considered every 400 msec
        distinctUntilChanged(), // this ensure duplicate values are not considered
        switchMap(search => this.loadLessons(search))
      );

      const initialLessons$ = this.loadLessons();
      // tslint:disable-next-line: deprecation
      this.lessons$ = concat(initialLessons$, searchLessons$);*/

      // Below is the same implementation using StartWith Operator with simplified refactoring of code

      this.lessons$ = fromEvent<any>(this.input.nativeElement, 'keyup').pipe(
        map(event => event.target.value),
        startWith(''),
        debug(RxJSLoggingLevel.TRACE, 'search'),
        debounceTime(800),  // This Operator ensure that stable values emited are considered every 400 msec
        distinctUntilChanged(), // this ensure duplicate values are not considered
        switchMap(search => this.loadLessons(search)),
        debug(RxJSLoggingLevel.DEBUG, 'Lessons Value'));
    }

    loadLessons(search = '') {

     return createHttpObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`).pipe(
        map(res => res['payload'])
      );
    }



}
