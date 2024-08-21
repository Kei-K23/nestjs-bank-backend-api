import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class AccountRequestDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  type: string;

  @IsNotEmpty()
  @IsNumber()
  balance: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  userId: string;
}
