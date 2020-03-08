import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { Faction } from './faction.db';

@Entity('alliance')
export class Alliance {
  @PrimaryColumn()
  allianceId: number;

  @Column()
  allianceName: string;

  @Column()
  ticker: string;

  @Column()
  dateFounded: Date;

  @OneToOne(() => Faction, { eager: true })
  @JoinColumn({ name: 'factionId' })
  faction: Faction;
}
