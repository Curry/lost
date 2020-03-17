import {
  Component,
  OnInit,
  AfterContentInit,
  OnChanges,
  AfterViewInit,
  AfterViewChecked,
} from '@angular/core';
import { AppService } from './app.service';
import { System } from './models/system.model';
import { Observable, of } from 'rxjs';
import { jsPlumb, jsPlumbInstance, Endpoint, EndpointOptions } from 'jsplumb';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'lost';
  system: Observable<System>;
  jsPlumbInstance: jsPlumbInstance;

  constructor(private service: AppService) {
    this.jsPlumbInstance = jsPlumb.getInstance();
  }

  plumb() {
    const s: Endpoint[] = this.jsPlumbInstance.addEndpoint('1div', {
      isSource: true,
      anchor: 'BottomCenter',
      connector: 'Straight',
      endpoint: ['Dot', { radius: 4 }],
      maxConnections: 1,
    }) as Endpoint[];
    const t2: Endpoint = this.jsPlumbInstance.addEndpoint('2div', {
      isTarget: true,
      anchor: 'TopCenter',
      endpoint: ['Dot', { radius: 4 }],
      maxConnections: 1,
    }) as Endpoint;
    const t3: Endpoint = this.jsPlumbInstance.addEndpoint('3div', {
      isTarget: true,
      anchor: 'TopCenter',
      endpoint: ['Dot', { radius: 4 }],
      maxConnections: 1,
    }) as Endpoint;
    const t4: Endpoint = this.jsPlumbInstance.addEndpoint('4div', {
      isTarget: true,
      anchor: 'TopCenter',
      endpoint: ['Dot', { radius: 4 }],
      maxConnections: 1,
    }) as Endpoint;
  }

  ngOnInit() {
    this.system = this.service.getSystemInfo('J163923');
  }

  ngAfterViewChecked() {
    this.plumb();
  }
}
