import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Type } from './type.db';
import { AttributeType } from './attributeType.db';

@Entity('typeAttribute')
export class TypeAttribute {
  @PrimaryColumn()
  typeID: number;

  @PrimaryColumn()
  attributeID: number;

  @Column()
  valueFloat: number;

  @Column()
  valueInt: number;

  @ManyToOne(
    () => Type,
    type => type.typeAttributes,
  )
  @JoinColumn({ name: 'typeID' })
  type: Type;

  @OneToOne(() => AttributeType, {
    eager: true,
  })
  @JoinColumn({ name: 'attributeID' })
  attributeType: AttributeType;
}
