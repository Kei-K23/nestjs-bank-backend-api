import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AccountEntity } from './account/account.entity';
import { UserEntity } from './users/user.entity';
import { getDataSourceToken } from '@nestjs/typeorm';
import * as argon2 from 'argon2';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const dataSource = app.get(getDataSourceToken());
  const userRepository = dataSource.getRepository(UserEntity);
  const accountRepository = dataSource.getRepository(AccountEntity);

  // Create Users
  const user1 = userRepository.create({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: await argon2.hash('securepassword'),
    role: 'ADMIN',
  });

  const user2 = userRepository.create({
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    password: await argon2.hash('securepassword'),
    role: 'USER',
  });

  // Create Accounts
  const account1 = accountRepository.create({
    accountId: '123456789',
    type: 'Checking',
    balance: 1000,
    status: 'ACTIVE',
    user: user1,
  });

  const account2 = accountRepository.create({
    accountId: '987654321',
    type: 'Savings',
    balance: 5000,
    status: 'ACTIVE',
    user: user2,
  });

  // Assign Accounts to Users
  user1.account = account1;
  user2.account = account2;

  // Save the entities in the correct order
  await userRepository.save(user1);
  await accountRepository.save(account1);
  await userRepository.save(user2);
  await accountRepository.save(account2);

  await app.close();
}

bootstrap();
