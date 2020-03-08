import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('region')
export class Region {
  @PrimaryColumn()
  regionID: number;

  @Column()
  regionName: string;

  @Column()
  factionID: number;
}
