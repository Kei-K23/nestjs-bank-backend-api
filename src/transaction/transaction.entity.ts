import { AccountEntity } from '../account/account.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'transactions' })
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  type: string;

  @Column({ type: 'decimal', nullable: false })
  amount: number;

  @Column({ type: 'varchar', length: 255, default: 'SUCCESS' })
  status: string;

  @OneToOne(() => AccountEntity, (account) => account.id)
  @JoinColumn()
  account: AccountEntity;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
