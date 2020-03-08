import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('attributeType')
export class AttributeType {
  @PrimaryColumn()
  attributeID: number;

  @Column()
  attributeName: string;

  @Column()
  description: string;
}
