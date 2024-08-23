import { forwardRef, Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [forwardRef(() => UsersModule)],
})
export class AccountModule {}
