import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { Roles } from '../auth/role.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { AccountEntity } from './account.entity';
import { AccountRequestDto } from './dto/account-request.dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN')
  @Get()
  async findAll(): Promise<AccountEntity[]> {
    return this.accountService.findAll();
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN')
  @Get(':id')
  async findById(@Param('id') id: string): Promise<AccountEntity> {
    return this.accountService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN')
  @Post()
  @HttpCode(201)
  async create(
    @Body() accountRequestDto: AccountRequestDto,
  ): Promise<AccountEntity> {
    return this.accountService.create(accountRequestDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN')
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() accountRequestDto: AccountRequestDto,
  ): Promise<AccountEntity> {
    return this.accountService.update(id, accountRequestDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN')
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    this.accountService.delete(id);
  }
}
