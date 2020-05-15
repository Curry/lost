import { Injectable } from '@angular/core';
import { of, iif, ReplaySubject } from 'rxjs';
import { jsPlumbInstance, jsPlumb, Connections } from 'jsplumb';
import { tap, map, mergeMap } from 'rxjs/operators';
import {
  Node,
  NodesGQL,
  ConnectionsGQL,
  AddConnectionGQL,
  RemoveConnectionGQL,
  WatchNodesGQL,
  UpdatesGQL,
  Connection,
} from './graphql';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(
    private nodes: NodesGQL,
    private connections: ConnectionsGQL,
    private addConnection: AddConnectionGQL,
    private removeConnection: RemoveConnectionGQL,
    private watchGQL: WatchNodesGQL,
    private updates: UpdatesGQL,
  ) {
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

  draggable = (id) => this.jsPlumbInstance.setDraggable(id, true);

  subscribeNodes = (mapId: number) => this.watchGQL.subscribe({ map: mapId })

  getNodesByMapId = (mapId: number) =>
    this.nodes
      .fetch({ map: mapId })
      .pipe(map((val) => val.data.nodes as Node[]));

  watchChanges = (mapId: number) => {
    const queryRef = this.updates.watch({ map: mapId })
    queryRef.startPolling(1000);
    return queryRef.valueChanges.pipe(
      map(val => {
        this.regenerate(val.data.connections);
        return val.data.nodes as Node[];
      }),
    )
  }

  getConnectionsByMapId = (mapId: number) =>
    this.connections.fetch({ map: mapId }).pipe(
      tap((conns) => this.regenerate(conns.data.connections))
    );

  connect = (systemNode: HTMLElement, attach: boolean) => {
    this.jsPlumbInstance.setDraggable(systemNode.id, true);
    if (!this.sourceId) {
      this.sourceId = systemNode.id;
    } else if (this.sourceId === systemNode.id) {
      this.sourceId = undefined;
    } else {
      iif(
        () => attach,
        this.addConnection.mutate({
          map: 1,
          source: this.sourceId,
          target: systemNode.id,
        }),
        this.removeConnection.mutate({
          map: 1,
          source: this.sourceId,
          target: systemNode.id,
        })
      ).pipe(
        mergeMap(() => this.getConnectionsByMapId(1))
      )
      .subscribe(() => {
        this.sourceId = undefined;
      });
    }
  }

  regenerate = (connections: Connection[]) => {
    this.redraw();
    connections.forEach(conn => {
      this.generateConnection(conn.source, conn.target)
    });
    this.jsPlumbInstance.select().each((val) => {
      if (connections.filter(conn => conn.source === val.sourceId && conn.target === val.targetId).length === 0) {
        this.jsPlumbInstance.deleteConnection(val);
      }
    });
  }

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

  deleteConnection = (sourceId: string, targetId: string) => {
    const connections = this.jsPlumbInstance.select({
      source: [sourceId, targetId],
      target: [sourceId, targetId],
    });
    // @ts-ignore
    if (connections.length > 0) {
      connections.each(conn => this.jsPlumbInstance.deleteConnection(conn));
      return true;
    }
    return false;
  }
}
