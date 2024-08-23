import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { TransactionRequestDto } from './dto/transaction-request.dto';

@Injectable()
export class TransactionService {
  private transactionRepository: Repository<TransactionEntity>;
  constructor(private dataSource: DataSource) {
    this.transactionRepository =
      this.dataSource.getRepository(TransactionEntity);
  }

  async findAll(): Promise<TransactionEntity[]> {
    return await this.transactionRepository.find();
  }

  async findById(id: string): Promise<TransactionEntity> {
    const [account] = await this.transactionRepository.findBy({ id });
    return account;
  }

  async create(
    transactionRequestDto: TransactionRequestDto,
  ): Promise<TransactionEntity> {
    return await this.transactionRepository.save(transactionRequestDto);
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
