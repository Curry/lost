import { System } from '../data/system.db';
import { SystemStatic } from '../data/systemStatic.db';
import { Star } from '../data/star.db';

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

export type Effect =
  | 'magnetar'
  | 'cataclysmic'
  | 'redGiant'
  | 'pulsar'
  | 'wolfRayet'
  | 'blackHole';

export class Static {
  typeID: number;
  typeName: string;
  targetClass: Class;
  lifetime: number;
  maxMass: number;
  massRegen: number;
  maxOnePass: number;

  constructor(systemStatic: SystemStatic) {
    this.typeID = systemStatic.typeId;
    this.typeName = systemStatic.type.typeName;
    const attributes = systemStatic.type.typeAttributes;
    this.targetClass = attributes.find(
      val => val.attributeID === 1381,
    ).valueFloat;
    this.lifetime = attributes.find(
      val => val.attributeID === 1382,
    ).valueFloat;
    this.maxMass = attributes.find(
      val => val.attributeID === 1383,
    ).valueFloat;
    this.massRegen = attributes.find(
      val => val.attributeID === 1384,
    ).valueFloat;
    this.maxOnePass = attributes.find(
      val => val.attributeID === 1385,
    ).valueFloat;
  }
}

export class SystemModel {
  regionID: number;
  constellationID: number;
  systemID: number;
  systemName: string;
  starId: number;
  security: string;
  trueSec: number
  securityStatus: number;
  securityClass: string;
  effect: Effect;
  star: Star;
  statics: Static[];

  constructor(system: System) {
    this.systemID = system.systemId;
    this.constellationID = system.constellationId;
    this.regionID = system.regionId;
    this.systemName = system.systemName;
    this.starId = system.starId;
    this.security = system.security;
    this.trueSec = system.trueSec;
    this.securityStatus = system.securityStatus;
    this.securityClass = system.securityClass;
    this.effect = system.effect;
    this.statics = system.statics.map(systemStatic => new Static(systemStatic));
  }
}
