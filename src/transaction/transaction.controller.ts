import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { TransactionEntity } from './transaction.entity';
import { TransactionRequestDto } from './dto/transaction-request.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN')
  @Get()
  async findAll(): Promise<TransactionEntity[]> {
    return this.transactionService.findAll();
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN')
  @Post('transaction-by-admin')
  async transactionByAdmin(
    @Body() transactionRequestDto: TransactionRequestDto,
  ): Promise<TransactionEntity> {
    return this.transactionService.transactionByAdmin(transactionRequestDto);
  }
}
