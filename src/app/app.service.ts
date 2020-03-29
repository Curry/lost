import { Injectable, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { System, Connection, MapModel } from './models/system.model';
import { jsPlumbInstance, jsPlumb } from 'jsplumb';
import { ESIToken } from './models/models';
import { tap, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {
    this.jsPlumbInstance = jsPlumb.getInstance();
    this.mode = false;
  }

  private source: HTMLElement;
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
      } else if (this.sourceId === systemNode.id) {
        this.sourceId = undefined;
      } else {
        this.http
          .post(`${this.url}/map/1/connection/add`, {
            source: this.source.id,
            target: systemNode.id,
          })
          .pipe(
            tap(() => this.generateConnection(this.source.id, systemNode.id)),
          )
          .subscribe(() => {
            this.source = undefined;
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
    }
  };
}
