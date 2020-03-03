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

export type Effect = 'Magnetar' | 'Black Hole' | 'Red Giant' | 'Pulsar' | 'Wolf-Rayet' | 'Cataclysmic Variable';

export class Static {
  typeID: number;
  typeName: string;
  targetClass: Class;
  targetLifetime: number;
  targetMass: number;
  targetRegen: number;
  targetOneThrough: number;
}

export class System {
  regionID: number;
  constellationID: number;
  solarSystemID: number;
  solarSystemName: string;
  security: number;
  class: number;
  statics: Static[];
}
