import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { System } from './system.db';
import { Type } from './type.db';

@Entity('systemStatic')
export class SystemStatic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  systemId: number;

  @Column()
  typeId: number;

  @ManyToOne(
    () => System,
    system => system.statics,
  )
  @JoinColumn({
    name: 'systemId',
    referencedColumnName: 'systemId',
  })
  system: System;

  @OneToOne(() => Type, { eager: true })
  @JoinColumn({ name: 'typeId', referencedColumnName: 'typeID' })
  type: Type;
}
