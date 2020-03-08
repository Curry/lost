import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { Faction } from './faction.db';

@Entity('race')
export class Race {
  @PrimaryColumn()
  raceId: number;

  @Column()
  raceName: string;

  @Column()
  description: string;

  @OneToOne(() => Faction)
  @JoinColumn({ name: 'factionId' })
  faction: Promise<Faction>;
}
