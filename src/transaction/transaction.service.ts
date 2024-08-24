import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { TransactionRequestDto } from './dto/transaction-request.dto';
import { AccountEntity } from '../account/account.entity';
import { TransactionType } from '../enums/transaction';
import { AccountStatusType } from '../enums/account';

@Injectable()
export class TransactionService {
  private transactionRepository: Repository<TransactionEntity>;
  private accountRepository: Repository<AccountEntity>;
  constructor(private dataSource: DataSource) {
    this.transactionRepository =
      this.dataSource.getRepository(TransactionEntity);
    this.accountRepository = this.dataSource.getRepository(AccountEntity);
  }

  async findAll(): Promise<TransactionEntity[]> {
    return await this.transactionRepository.find();
  }

  async findById(id: string): Promise<TransactionEntity> {
    const [account] = await this.transactionRepository.findBy({ id });
    return account;
  }

  async transactionByAdmin(
    transactionRequestDto: TransactionRequestDto,
  ): Promise<TransactionEntity> {
    if (
      transactionRequestDto.type === TransactionType.DEPOSIT ||
      transactionRequestDto.type === TransactionType.WITHDRAWAL
    ) {
      const [account] = await this.accountRepository.find({
        where: {
          id: transactionRequestDto.accountId,
        },
      });

      if (!account) {
        throw new Error('Cannot make transaction. Account does not exist.');
      }

      if (account.isSoftDeleted) {
        throw new Error('Cannot make transaction. Account is deleted.');
      }

      if (account.status === AccountStatusType.PENDING) {
        throw new Error('Cannot make transaction. Account is not activated.');
      }

      if (account.isLocked) {
        throw new Error('Cannot make transaction. Account is locked.');
      }

      if (transactionRequestDto.type === TransactionType.WITHDRAWAL) {
        if (account.balance <= transactionRequestDto.amount) {
          throw new Error('No enough balance to make transaction');
        }
        await this.accountRepository.update(account.id, {
          balance: +account.balance - +transactionRequestDto.amount,
        });
      }

      if (transactionRequestDto.type === TransactionType.DEPOSIT) {
        await this.accountRepository.update(account.id, {
          balance: +account.balance + +transactionRequestDto.amount,
        });
      }

      const newTransaction = this.transactionRepository.create({
        type: transactionRequestDto.type,
        account,
        amount: transactionRequestDto.amount,
      });

      return await this.transactionRepository.save(newTransaction);
    } else {
      throw new Error('Invalid transaction type');
    }
  }

  async update(
    id: string,
    transactionRequestDto: TransactionRequestDto,
  ): Promise<TransactionEntity> {
    // Perform the update operation
    await this.transactionRepository.update(id, transactionRequestDto);

    // Retrieve the updated user
    const updatedTransaction = await this.transactionRepository.findOne({
      where: { id },
    });

    if (!updatedTransaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return updatedTransaction;
  }

  async delete(id: string) {
    await this.transactionRepository.delete(id);
  }
}
