import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AccountEntity } from './account.entity';
import { AccountRequestDto } from './dto/account-request.dto';
import { createId } from '@paralleldrive/cuid2';
import { UserEntity } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AccountService {
  private accountRepository: Repository<AccountEntity>;
  private userRepository: Repository<UserEntity>;
  constructor(
    private dataSource: DataSource,
    private userService: UsersService,
  ) {
    this.accountRepository = this.dataSource.getRepository(AccountEntity);
    this.userRepository = this.dataSource.getRepository(UserEntity);
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
    const [existingAccount] = await this.accountRepository.find({
      where: {
        user: {
          id: accountRequestDto.userId,
        },
      },
    });

    const [user] = await this.userRepository.find({
      where: {
        id: accountRequestDto.userId,
      },
    });

    if (!user) {
      throw new Error('User is not exist');
    }

    if (user.role === 'ADMIN') {
      throw new Error('Admin user cannot create account');
    }

    if (existingAccount) {
      throw new Error(`Account already created for the user`);
    }

    const account = this.accountRepository.create({
      accountId: createId(),
      ...accountRequestDto,
    });
    account.user = user;

    const createdAccount = await this.accountRepository.save(account);

    // Remove password from user before returning the account
    if (createdAccount.user) {
      delete createdAccount.user.password;
    }
    return createdAccount;
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
