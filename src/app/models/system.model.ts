export enum Class {
  C1 = 1,
  C2,
  C3,
  C4,
  C5,
  C6,
  HIGH,
  LOW,
  NULL,
  THERA = 12,
  SHATTERED,
}

// export type Effect = 'Magnetar' | 'Black Hole' | 'Red Giant' | 'Pulsar' | 'Wolf-Rayet' | 'Cataclysmic Variable';

export class Static {
  typeID: number;
  typeName: string;
  targetClass: number;
  lifetime: number;
  maxMass: number;
  massRegen: number;
  maxOnePass: number;
}

export class System {
  regionID: number;
  constellationID: number;
  systemID: number;
  systemName: string;
  effect: string;
  security: string;
  securityClass: string;
  securityStatus: number;
  trueSec: number;
  starId: number;
  statics: Static[];
  nickName?: string;
  connectsTo?: string[];
}

export class SystemModel {
  regionID: number;
  constellationID: number;
  systemID: number;
  systemName: string;
  starId: number;
  security: string;
  trueSec: number;
  securityStatus: number;
  securityClass: string;
  effect: string;
  statics: Static[];
}

export class ConnectionNode {
  system: SystemModel;
  children?: ConnectionNode[];
}

export class ConnectionModel {
  id: number;
  mapId: number;
  created: Date;
  updated: Date;
  systemId: number;
  linkedSystemId: number;
  system: SystemModel;
  linkedSystem: SystemModel;
}

export class MapModel {
  mapId: number;
  created: Date;
  updated: Date;
  connection: ConnectionNode;
}
