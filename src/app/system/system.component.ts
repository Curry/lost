import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from '../app.service';
import { Node } from '../graphql';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
})
export class SystemComponent implements AfterViewInit {
  @Input()
  node: Node;

  constructor(private service: AppService) {
  }

  ngAfterViewInit() {
    this.service.draggable(this.node.id);
  }
  getStatics = () =>
    this.node.system.statics.map(val => val.name).join('\t');

  onClick = (element: HTMLElement) => {
    this.service.connect(element, true);
  };

  onRClick = (element: HTMLElement) => {
    this.service.connect(element, false);
  }

  redraw = () => {
    // this.service.redraw();
  }
}
