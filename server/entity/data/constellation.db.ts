import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('constellations')
export class Constellation {
  @PrimaryColumn()
  constellationID: number;

  @Column()
  regionID: number;

  @Column()
  constellationName: string;

  @Column()
  factionID: number;
}
