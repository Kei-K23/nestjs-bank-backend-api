import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { AccountModule } from '../account/account.module';

@Module({
  providers: [TransactionService],
  controllers: [TransactionController],
  imports: [AccountModule],
})
export class TransactionModule {}
