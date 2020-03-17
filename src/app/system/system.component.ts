import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { System } from '../models/system.model';
import { AppService } from '../app.service';
import { timer, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
})
export class SystemComponent implements OnChanges {
  @Input()
  system: System;

  constructor(private service: AppService) { }

  getStatics = () => this.system.statics.map(val => val.typeName.substring(9)).join('\t');

  ngOnChanges() {
    console.log('potato');
  }
}
