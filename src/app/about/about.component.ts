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
 
  }


}
