import { UserEntity } from '../users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'accounts' })
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  accountId: string;

  @Column({ type: 'varchar', length: 255 })
  type: string;

  @Column({ type: 'decimal', nullable: false })
  balance: number;

  @Column({ type: 'varchar', length: 255, default: 'PENDING' })
  status: string;

  @Column({ type: 'boolean', default: false })
  isSoftDeleted: boolean;

  @OneToOne(() => UserEntity, (user) => user.account)
  @JoinColumn()
  user: UserEntity;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
