import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('faction')
export class Faction {
  @PrimaryColumn()
  factionId: number;

  @Column()
  factionName: string;

  @Column()
  description: string;

  @Column()
  sizeFactor: number;

  @Column()
  stationCount: number;

  @Column()
  stationSystemCount: number;
}
