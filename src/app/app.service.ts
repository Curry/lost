import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { System } from './models/system.model';
import { jsPlumbInstance, jsPlumb } from 'jsplumb';
import { ESIToken } from './models/models';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {
    this.jsPlumbInstance = jsPlumb.getInstance();
    this.mode = false;
  }

  private source: HTMLElement;
  private jsPlumbInstance: jsPlumbInstance;
  private options = {
    anchors: [
      ['Top', 'Bottom'],
      ['Top', 'Bottom'],
    ],
    connector: 'Straight',
    endpoint: ['Blank', { width: 10, height: 10 }],
    detachable: false,
    cssClass: 'whnorm',
  };

  public mode: boolean;
  public url = 'http://localhost:3000';

  wh: System[] = [
    {
      systemID: 31000714,
      constellationID: 21000056,
      regionID: 11000007,
      systemName: 'J163923',
      starId: 40388078,
      security: 'C2',
      trueSec: -1,
      securityStatus: -0.99,
      securityClass: null,
      effect: null,
      nickName: '0',
      statics: [
        {
          typeID: 30679,
          typeName: 'Wormhole E545',
          targetClass: 9,
          lifetime: 960,
          maxMass: 2000000000,
          massRegen: 0,
          maxOnePass: 300000000,
        },
        {
          typeID: 30675,
          typeName: 'Wormhole N062',
          targetClass: 5,
          lifetime: 1440,
          maxMass: 3000000000,
          massRegen: 0,
          maxOnePass: 300000000,
        },
      ],
      connectsTo: ['31002003', '31002516'],
    },
    {
      systemID: 31001912,
      constellationID: 21000235,
      regionID: 11000024,
      systemName: 'J111106',
      starId: 40449772,
      security: 'C5',
      trueSec: -1,
      securityStatus: -0.99,
      securityClass: null,
      effect: 'cataclysmic',
      statics: [
        {
          typeID: 30699,
          typeName: 'Wormhole D364',
          targetClass: 2,
          lifetime: 960,
          maxMass: 1000000000,
          massRegen: 0,
          maxOnePass: 300000000,
        },
      ],
    },
    {
      systemID: 30004583,
      constellationID: 20000668,
      regionID: 10000058,
      systemName: 'IGE-RI',
      starId: 40289745,
      security: '0.0',
      trueSec: 0,
      securityStatus: -0.048554,
      securityClass: 'J',
      effect: null,
      statics: [],
    },
  ];

  getEsiToken = (code: string) =>
    this.http.get<ESIToken>(`${this.url}/token/${code}`).pipe(
      tap(val => {
        console.log(val);
      }),
    )

  getSystemInfo = (system: string): Observable<System[]> =>
    // this.http.get<System>(`${this.url}/entity/system/${system}`)
    of(this.wh)

  createConnection = (systemNode: HTMLElement) => {
    if (!this.mode) {
      return;
    } else if (!this.source) {
      this.source = systemNode;
    } else if (this.source.offsetTop === systemNode.offsetTop) {
      this.source = undefined;
    } else {
      this.generateConnection(this.source.id, systemNode.id);
      this.source = undefined;
    }
  }

  generateConnection = (systemOneId: string, systemTwoId: string) => {
    if (
      this.jsPlumbInstance.select({
        source: [systemOneId, systemTwoId],
        target: [systemOneId, systemTwoId],
        // @ts-ignore
      }).length === 0
    ) {
      this.jsPlumbInstance.connect(
        {
          source: systemOneId,
          target: systemTwoId,
        },
        this.options,
      );
      console.log(`Linking ${systemOneId} and ${systemTwoId}`);
    }
  }
}
