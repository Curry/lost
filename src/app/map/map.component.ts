import {
  Component,
  OnInit,
  HostListener,
  AfterViewInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Observable } from 'rxjs';
import { System } from '../models/system.model';
import { AppService } from '../app.service';
import { SystemComponent } from '../system/system.component';
import { mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChildren(SystemComponent) systems!: QueryList<SystemComponent>;

  system: Observable<System[]>;
  source: string;

  constructor(private service: AppService) {}

  @HostListener('window:resize')
  onResize = () => {
    this.service.redraw();
  };

  ngOnInit() {
    // this.system = this.service.getSystems(1);
  }

  ngAfterViewInit() {
    this.systems.changes
      // .pipe(mergeMap(() => this.service.getConnections(1)))
      // .subscribe();
  }

  setMode = () => {
    this.service.mode = !this.service.mode;
  };
}
