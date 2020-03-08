import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Type } from './type.db';

@Entity('star')
export class Star {
  @PrimaryGeneratedColumn()
  starId: number;

  @Column()
  starName: string;

  @Column()
  age: number;

  @Column()
  radius: number;

  @Column()
  temperature: number;

  @Column()
  luminosity: number;

  @Column()
  spectralClass: string;

  @ManyToOne(() => Type, { eager: true })
  @JoinColumn({ name: 'typeId' })
  type: Type;

}
