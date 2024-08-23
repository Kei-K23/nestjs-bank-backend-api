import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AccountEntity } from './account.entity';
import { AccountRequestDto } from './dto/account-request.dto';
import { createId } from '@paralleldrive/cuid2';

@Injectable()
export class AccountService {
  private accountRepository: Repository<AccountEntity>;
  constructor(private dataSource: DataSource) {
    this.accountRepository = this.dataSource.getRepository(AccountEntity);
  }

  async findAll(): Promise<AccountEntity[]> {
    return await this.accountRepository.find();
  }

  async findById(id: string): Promise<AccountEntity> {
    const [account] = await this.accountRepository.findBy({ id });
    return account;
  }

  async findByAccountId(accountId: string): Promise<AccountEntity> {
    const [account] = await this.accountRepository.findBy({ accountId });
    return account;
  }

  async create(accountRequestDto: AccountRequestDto): Promise<AccountEntity> {
    return await this.accountRepository.save(
      this.accountRepository.create({
        accountId: createId(),
        ...accountRequestDto,
      }),
    );
  }

  async update(
    id: string,
    accountRequestDto: AccountRequestDto,
  ): Promise<AccountEntity> {
    // Perform the update operation
    await this.accountRepository.update(id, accountRequestDto);

    // Retrieve the updated user
    const updatedAccount = await this.accountRepository.findOne({
      where: { id },
    });

    if (!updatedAccount) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }

    return updatedAccount;
  }

  async delete(id: string) {
    await this.accountRepository.delete(id);
  }
}
