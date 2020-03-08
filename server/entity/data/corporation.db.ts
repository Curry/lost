import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { Alliance } from './alliance.db';
import { Faction } from './faction.db';

@Entity('corporation')
export class Corporation {
  @PrimaryColumn()
  corporationId: number;

  @Column()
  corporationName: string;

  @Column()
  ticker: number;

  @Column()
  dateFounded: Date;

  @Column()
  memberCount: number;

  @Column()
  isNPC: number;

  @OneToOne(() => Alliance, { eager: true })
  @JoinColumn({ name: 'allianceId' })
  alliance: Alliance;

  @OneToOne(() => Faction, { eager: true })
  @JoinColumn({ name: 'factionId' })
  faction: Faction;
}
