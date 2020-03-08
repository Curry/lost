import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryColumn()
  categoryId: number;

  @Column()
  categoryName: string;

  @Column()
  published: number;
}
