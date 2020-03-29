import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from './app.service';
import { System } from './models/system.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'lost';
  system: Observable<System[]>;
  source: string;

  constructor(private service: AppService) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.service.generateConnection('31000714', '30004583');
  }

  setMode = () => {
    this.service.mode = !this.service.mode;
  }
}
