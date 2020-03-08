import { Entity, Column, OneToMany, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { SystemStatic } from './systemStatic.db';
import { Effect } from '../models/system';
import { Star } from './star.db';

@Entity('system')
export class System {
  @PrimaryColumn()
  systemId: number;

  @Column()
  constellationId: number;

  @Column()
  starId: number;

  @Column()
  regionId: number;

  @Column()
  systemName: string;

  @Column()
  security: string;

  @Column()
  trueSec: number;

  @Column()
  securityStatus: number;

  @Column()
  securityClass: string;

  @Column()
  effect: Effect;

  @OneToMany(
    () => SystemStatic,
    systemStatic => systemStatic.system,
    { eager: true },
  )
  statics: SystemStatic[];

  @OneToOne(() => Star)
  @JoinColumn({ name: 'starId' })
  star: Promise<Star>;
}
