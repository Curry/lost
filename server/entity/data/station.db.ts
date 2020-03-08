import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { System } from './system.db';
import { Type } from './type.db';
import { Corporation } from './corporation.db';
import { Race } from './race.db';

@Entity('station')
export class Station {
  @PrimaryColumn()
  stationId: number;

  @Column()
  stationName: string;

  @Column()
  services: string;

  @Column()
  systemId: number;

  @OneToOne(() => System)
  @JoinColumn({ name: 'systemId' })
  system: Promise<System>;

  @Column()
  typeId: number;

  @OneToOne(() => Type)
  @JoinColumn({ name: 'typeId' })
  type: Type;

  @Column()
  corporationId: number;

  @OneToOne(() => Corporation)
  @JoinColumn({ name: 'corporationId' })
  corporation: Promise<Corporation>;

  @Column()
  raceId: number;

  @OneToOne(() => Race)
  @JoinColumn({ name: 'raceId'} )
  race: Promise<Race>;
}
