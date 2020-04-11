import { Injectable } from '@angular/core';
import { of, iif, Subject, ReplaySubject } from 'rxjs';
import { jsPlumbInstance, jsPlumb } from 'jsplumb';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  commentsQuery: QueryRef<any>;
  constructor(private apollo: Apollo) {
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

  subject: ReplaySubject<boolean> = new ReplaySubject();

  redraw = () => this.jsPlumbInstance.repaintEverything();

  // getSystems = (mapId: number) =>
  //   this.http.get<System[]>(`${this.url}/map/${mapId}/systems`);

  // getConnections = (mapId: number) =>
  //   this.http
  //     .get<Connection[]>(`${this.url}/map/${mapId}/connections`)
  //     .pipe(
  //       tap((conns) =>
  //         conns.forEach((conn) =>
  //           this.generateConnection(
  //             conn.source.toString(),
  //             conn.target.toString(),
  //           ),
  //         ),
  //       ),
  //     );

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
          // this.http.post(`${this.url}/map/1/connection/add`, {
          //   source: this.sourceId,
          //   target: systemNode.id,
          // }),
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
