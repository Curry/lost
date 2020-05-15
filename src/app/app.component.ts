import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'lost';

  constructor(private service: AppService) {
  }

  ngOnInit() {
    // const queryRef = this.feedGQL.watch({map: 1});
    // queryRef.startPolling(1000);
    // this.stuff = queryRef.valueChanges.pipe(tap(val => console.log(val)), map(res => res.data.nodes));

    // const queryRef = this.watchGQL.subscribe({ map: 1 }).subscribe(val => console.log(val));
  }

  ngAfterViewInit() {
    // timer(0, 1000).pipe(
    //   mergeMap(val => this.feedGQL.watch({ map: 1}).valueChanges)
    // ).subscribe(val => console.log(val));
  }

  setMode = () => {
    this.service.mode = !this.service.mode;
  }
}
