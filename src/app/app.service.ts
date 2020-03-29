import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, iif, Subject, ReplaySubject } from 'rxjs';
import { System, Connection } from './models/system.model';
import { jsPlumbInstance, jsPlumb } from 'jsplumb';
import { ESIToken } from './models/models';
import { tap, delay, skip, flatMap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {
    this.jsPlumbInstance = jsPlumb.getInstance({ Container: 'containerdiv' });
    this.mode = false;
  }

  length = 0;
  private sourceId: string;
  private jsPlumbInstance: jsPlumbInstance;
  private options = {
    anchors: [
      ['Top', 'Bottom'],
      ['Top', 'Bottom'],
    ],
    connector: 'Flowchart',
    endpoint: ['Blank', { width: 10, height: 10 }],
    detachable: false,
    cssClass: 'whnorm',
  };

  public mode: boolean;
  public url = 'http://localhost:3000';

  subject: ReplaySubject<boolean> = new ReplaySubject();

  redraw = () => this.jsPlumbInstance.repaintEverything();

  getEsiToken = (code: string) =>
    this.http.get<ESIToken>(`${this.url}/token/${code}`);

  getSystems = (mapId: number) =>
    this.http.get<System[]>(`${this.url}/map/${mapId}/systems`);

  getConnections = (mapId: number) =>
    this.http
      .get<Connection[]>(`${this.url}/map/${mapId}/connections`)
      .pipe(
        tap(conns =>
          conns.forEach(conn =>
            this.generateConnection(
              conn.source.toString(),
              conn.target.toString(),
            ),
          ),
        ),
      );

  createConnection = (systemNode: HTMLElement) => {
    if (this.mode) {
      if (!this.sourceId) {
        this.sourceId = systemNode.id;
        console.log(this.sourceId);
      } else if (this.sourceId === systemNode.id) {
        this.sourceId = undefined;
      } else {
        iif(
          () => this.generateConnection(this.sourceId, systemNode.id),
          this.http.post(`${this.url}/map/1/connection/add`, {
            source: this.sourceId,
            target: systemNode.id,
          }),
          of({}),
        ).subscribe(() => {
          this.sourceId = undefined;
        });
      }
    }
  };

  generateConnection = (sourceId: string, targetId: string) => {
      if (
        this.jsPlumbInstance.select({
          source: [sourceId, targetId],
          target: [sourceId, targetId],
          // @ts-ignore
        }).length === 0
      ) {
        this.jsPlumbInstance.connect(
          {
            source: sourceId,
            target: targetId,
          },
          this.options,
        );
        console.log(`Linking ${sourceId} and ${targetId}`);
        return true;
      }
      return false;
  };
}
