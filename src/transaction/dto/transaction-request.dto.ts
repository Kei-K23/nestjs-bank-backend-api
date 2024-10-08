import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class TransactionRequestDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  type: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  accountId: string;
}
