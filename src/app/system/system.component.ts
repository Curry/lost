import { Component, Input } from '@angular/core';
import { System } from '../models/system.model';
import { AppService } from '../app.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
  host: { '[id]': 'system.id' },
})
export class SystemComponent {
  @Input()
  system: System;

  constructor(private service: AppService) {}

  getStatics = () =>
    this.system.statics.map(val => val.typeName.substring(9)).join('\t');

  onClick = (element: HTMLElement) => {
    this.service.createConnection(element);
  };
}
