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
  targetClass: Class;
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
}
