import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class WithdrawTransactionDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
