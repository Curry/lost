import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { Category } from './category.db';

@Entity('group')
export class Group {
  @PrimaryColumn()
  groupId: number;

  @Column()
  groupName: string;

  @Column()
  published: number;

  @OneToOne(() => Category, { eager: true })
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
