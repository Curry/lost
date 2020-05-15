import {
  Component,
  OnInit,
  HostListener,
  AfterViewInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { SystemComponent } from '../system/system.component';
import { mergeMap } from 'rxjs/operators';
import { Node } from '../graphql';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChildren(SystemComponent) systems!: QueryList<SystemComponent>;

  system: Observable<Node[]>;
  source: string;

  constructor(private service: AppService) {}

  @HostListener('window:resize')
  onResize = () => {
    this.service.redraw();
  };

  ngOnInit() {
    this.system = this.service.watchChanges(1);
  }

  ngAfterViewInit() {
    this.systems.changes
      .pipe(mergeMap(() => this.service.getConnectionsByMapId(1)))
      .subscribe();
  }

  setMode = () => {
    this.service.mode = !this.service.mode;
  };

  redraw = () => {
    console.log('potato');
    this.service.redraw();
  }
}
