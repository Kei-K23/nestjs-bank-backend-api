import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { TransactionEntity } from './transaction.entity';
import { TransactionRequestDto } from './dto/transaction-request.dto';
import { AccountEntity } from '../account/account.entity';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN')
  @Get()
  async findAll(): Promise<TransactionEntity[]> {
    return this.transactionService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('transaction-by-accountId/:accountId')
  async getAllTransactionsByAccountId(
    @Param('accountId') accountId: string,
  ): Promise<AccountEntity> {
    return this.transactionService.getAllTransactionsByAccountId(accountId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('from/:senderAccountId/to/:receiverAccountId/amount/:amount')
  async transactionBetweenAccounts(
    @Param('senderAccountId') senderAccountId: string,
    @Param('receiverAccountId') receiverAccountId: string,
    @Param('amount') amount: number,
  ) {
    return this.transactionService.transactionBetweenAccounts(
      senderAccountId,
      receiverAccountId,
      amount,
    );
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
