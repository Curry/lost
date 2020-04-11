import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from './app.service';
import { System } from './models/system.model';
import { Observable, timer } from 'rxjs';
import { NodesGQL, Node } from './generated/graphql';
import { tap, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'lost';
  system: Observable<System[]>;
  stuff: Observable<Node[]>
  source: string;

  constructor(private service: AppService, private feedGQL: NodesGQL) {
  }

  ngOnInit() {
    this.stuff = this.feedGQL.watch({ map: 1}).valueChanges.pipe(map(res => res.data.nodes), tap(val => console.log(val)));
  }

  ngAfterViewInit() {
    timer(0, 1000).pipe(
      mergeMap(val => this.feedGQL.fetch({ map: 1}))
    ).subscribe(val => console.log(val));
  }

  setMode = () => {
    this.service.mode = !this.service.mode;
  }
}
