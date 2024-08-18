import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'users' })
export class Item extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  test: string;

  @Column({ type: 'varchar', length: 30 })
  password: string;

  @Column({ type: 'varchar', length: 30 })
  role: string;
}
