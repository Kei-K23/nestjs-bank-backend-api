import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AccountEntity } from './account.entity';
import { AccountRequestDto } from './dto/account-request.dto';

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
    const [user] = await this.accountRepository.findBy({ id });
    return user;
  }

  async findByAccountId(accountId: string): Promise<AccountEntity> {
    const [user] = await this.accountRepository.findBy({ accountId });
    return user;
  }

  async create(accountRequestDto: AccountRequestDto): Promise<AccountEntity> {
    return await this.accountRepository.save(accountRequestDto);
  }

  async update(
    id: string,
    accountRequestDto: AccountRequestDto,
  ): Promise<AccountEntity> {
    // Perform the update operation
    await this.accountRepository.update(id, accountRequestDto);

    // Retrieve the updated user
    const updatedUser = await this.accountRepository.findOne({ where: { id } });

    if (!updatedUser) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }

    return updatedUser;
  }

  async delete(id: string) {
    await this.accountRepository.delete(id);
  }
}
