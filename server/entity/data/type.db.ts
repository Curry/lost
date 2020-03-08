import { Entity, Column, PrimaryColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { TypeAttribute } from './typeAttribute.db';
import { Group } from './group.db';

@Entity('type')
export class Type {
  @PrimaryColumn()
  typeID: number;

  @Column()
  typeName: string;

  @Column()
  description: string;

  @OneToMany(
    () => TypeAttribute,
    typeAttribute => typeAttribute.type,
    {
      eager: true,
    },
  )
  @JoinColumn({ name: 'typeID' })
  typeAttributes: TypeAttribute[];

  @OneToOne(() => Group, { eager: true })
  @JoinColumn({ name: 'groupId' })
  group: Group;
}
